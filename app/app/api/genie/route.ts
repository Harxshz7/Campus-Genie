import { NextResponse } from 'next/server';
import {
  GOLDEN_PATH_RESPONSE,
  PRIYA_PM_RESPONSE,
  DATA_SCIENTIST_RESPONSE,
  WHATIF_5HRS_RESPONSE,
} from '@/lib/fixtures';

const MAX_POLL_RETRIES = 25;
const POLL_INTERVAL_MS = 1500;

/**
 * Helper to recursively/comprehensively extract final text answer from Databricks Genie payload.
 */
function extractGenieText(data: any): string {
  if (!data) return '';

  // 1. Check direct top-level content / text
  if (typeof data.content === 'string' && data.content.trim().length > 0) {
    return data.content.trim();
  }
  if (typeof data.text === 'string' && data.text.trim().length > 0) {
    return data.text.trim();
  }

  // 2. Check nested message object
  if (data.message && typeof data.message === 'object') {
    const nestedText = extractGenieText(data.message);
    if (nestedText) return nestedText;
  }

  // 3. Process attachments array (where Genie text responses & reasoning traces usually reside)
  const attachments = data.attachments || (data.message && data.message.attachments);
  if (Array.isArray(attachments) && attachments.length > 0) {
    const textParts: string[] = [];

    for (const att of attachments) {
      if (!att) continue;

      if (typeof att.text === 'string' && att.text.trim().length > 0) {
        textParts.push(att.text.trim());
      } else if (att.text && typeof att.text.content === 'string' && att.text.content.trim().length > 0) {
        textParts.push(att.text.content.trim());
      } else if (typeof att.content === 'string' && att.content.trim().length > 0) {
        textParts.push(att.content.trim());
      } else if (att.query && typeof att.query.description === 'string' && att.query.description.trim().length > 0) {
        textParts.push(att.query.description.trim());
      }
    }

    if (textParts.length > 0) {
      // Deduplicate parts while preserving order
      const uniqueParts = Array.from(new Set(textParts));
      return uniqueParts.join('\n\n');
    }
  }

  // 4. Query result description fallback
  if (data.query_result && typeof data.query_result.description === 'string' && data.query_result.description.trim().length > 0) {
    return data.query_result.description.trim();
  }

  return '';
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message: string = body.message || '';
    const conversationId: string | undefined = body.conversationId;

    const host = process.env.DATABRICKS_HOST?.replace(/\/$/, '');
    const token = process.env.DATABRICKS_TOKEN?.trim();
    const spaceId = process.env.GENIE_SPACE_ID?.trim();

    // Check if Databricks Genie credentials exist
    if (host && token && spaceId && message.trim().length > 0) {
      try {
        let activeConvId: string | null =
          conversationId && !conversationId.startsWith('genie-') ? conversationId : null;
        let messageId: string | null = null;
        let initialStatus: string | null = null;
        let rawContent: string | null = null;

        // Try continuing an existing conversation if valid activeConvId exists
        if (activeConvId) {
          try {
            const msgEndpoint = `${host}/api/2.0/genie/spaces/${spaceId}/conversations/${activeConvId}/messages`;
            const msgRes = await fetch(msgEndpoint, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ content: message }),
            });

            if (msgRes.ok) {
              const data = await msgRes.json();
              messageId = data.message_id || data.id || (data.message && (data.message.message_id || data.message.id));
              initialStatus = data.status || (data.message && data.message.status);
              rawContent = extractGenieText(data);
            } else {
              // Reset activeConvId to start a new conversation if existing one is invalid/expired
              activeConvId = null;
            }
          } catch (err) {
            console.warn('Failed to send message to existing conversation, starting new one:', err);
            activeConvId = null;
          }
        }

        // Start a new conversation if no active message was created
        if (!messageId || !activeConvId) {
          const startEndpoint = `${host}/api/2.0/genie/spaces/${spaceId}/start-conversation`;
          const startRes = await fetch(startEndpoint, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
          });

          if (startRes.ok) {
            const data = await startRes.json();
            activeConvId =
              data.conversation_id ||
              data.id ||
              (data.conversation && (data.conversation.conversation_id || data.conversation.id));
            messageId =
              data.message_id ||
              data.id ||
              (data.message && (data.message.message_id || data.message.id));
            initialStatus = data.status || (data.message && data.message.status);
            rawContent = extractGenieText(data);
          } else {
            const errText = await startRes.text();
            console.warn(`Databricks start-conversation failed with status ${startRes.status}: ${errText}`);
          }
        }

        // Poll conversation message until it is COMPLETED or reaches a terminal status
        if (activeConvId && messageId) {
          let currentStatus = (initialStatus || '').toUpperCase();
          let retries = 0;
          const terminalStatuses = ['COMPLETED', 'FAILED', 'CANCELLED'];

          while (retries < MAX_POLL_RETRIES && !terminalStatuses.includes(currentStatus)) {
            await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
            retries++;

            try {
              const pollEndpoint = `${host}/api/2.0/genie/spaces/${spaceId}/conversations/${activeConvId}/messages/${messageId}`;
              const pollRes = await fetch(pollEndpoint, {
                headers: { Authorization: `Bearer ${token}` },
              });

              if (pollRes.ok) {
                const pollData = await pollRes.json();
                const statusVal = pollData.status || (pollData.message && pollData.message.status);
                if (statusVal) {
                  currentStatus = String(statusVal).toUpperCase();
                }

                const extracted = extractGenieText(pollData);
                if (extracted) {
                  rawContent = extracted;
                }
              } else {
                console.warn(`Poll request returned status ${pollRes.status}`);
              }
            } catch (pollErr) {
              console.warn('Error while polling Databricks Genie message status:', pollErr);
            }
          }
        }

        // If real Databricks Genie query succeeded and yielded answer content
        if (rawContent && rawContent.trim().length > 0) {
          const lower = message.toLowerCase();
          let baseFixture = GOLDEN_PATH_RESPONSE;

          if (lower.includes('priya') || lower.includes('product manager') || lower.includes('pm')) {
            baseFixture = PRIYA_PM_RESPONSE;
          } else if (lower.includes('data scientist') || lower.includes('data science')) {
            baseFixture = DATA_SCIENTIST_RESPONSE;
          } else if (lower.includes('what if') || lower.includes('5 hour') || lower.includes('5 hrs') || lower.includes('time')) {
            baseFixture = WHATIF_5HRS_RESPONSE;
          }

          return NextResponse.json({
            query: message,
            explanation: rawContent,
            steps: baseFixture.steps,
            placementTarget: baseFixture.placementTarget,
            conversationId: activeConvId || 'genie-conv-1',
            source: 'genie',
          });
        }
      } catch (err) {
        console.warn('Real Databricks Genie query error, using fixture fallback:', err);
      }
    }

    // Dynamic Intent Matcher for Fixture Fallback Mode
    const lower = (message || '').toLowerCase();
    let fixtureRes = GOLDEN_PATH_RESPONSE;

    if (lower.includes('priya') || lower.includes('product manager') || lower.includes('pm') || lower.includes('html')) {
      fixtureRes = PRIYA_PM_RESPONSE;
    } else if (lower.includes('data scientist') || lower.includes('data science')) {
      fixtureRes = DATA_SCIENTIST_RESPONSE;
    } else if (lower.includes('5 hour') || lower.includes('5 hrs') || lower.includes('time') || lower.includes('what if')) {
      fixtureRes = WHATIF_5HRS_RESPONSE;
    }

    // Simulated short latency for realism in fixture mode
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json({
      ...fixtureRes,
      query: message,
      conversationId: conversationId || 'genie-session-fixture',
      source: 'fixture',
    });
  } catch (error) {
    console.error('Unhandled API error in Genie route:', error);
    return NextResponse.json(
      {
        query: '',
        explanation: 'An unexpected error occurred while processing your request.',
        steps: GOLDEN_PATH_RESPONSE.steps,
        placementTarget: GOLDEN_PATH_RESPONSE.placementTarget,
        conversationId: 'genie-session-fixture',
        source: 'fixture',
        error: String(error),
      },
      { status: 200 }
    );
  }
}

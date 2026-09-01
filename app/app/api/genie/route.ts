import { NextResponse } from 'next/server';
import { GOLDEN_PATH_RESPONSE, WHATIF_5HRS_RESPONSE } from '@/lib/fixtures';

const MAX_POLL_RETRIES = 15;
const POLL_INTERVAL_MS = 1500;

export async function POST(req: Request) {
  try {
    const { message, conversationId } = await req.json();

    const host = process.env.DATABRICKS_HOST?.replace(/\/$/, '');
    const token = process.env.DATABRICKS_TOKEN;
    const spaceId = process.env.GENIE_SPACE_ID;

    // Check if Databricks Genie credentials exist
    if (host && token && spaceId) {
      try {
        let activeConvId = conversationId;
        let messageId: string | null = null;
        let initialStatus: string | null = null;
        let rawContent: string | null = null;

        if (activeConvId) {
          // Continue existing conversation
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
            messageId = data.message_id || data.id;
            initialStatus = data.status;
            rawContent = data.content || data.text;
          }
        }

        if (!messageId) {
          // Start new conversation
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
            activeConvId = data.conversation_id || data.id;
            messageId = data.message_id || (data.message && data.message.id);
            initialStatus = data.status || (data.message && data.message.status);
            rawContent = data.content || (data.message && data.message.content);
          }
        }

        // Poll message status if executing / querying
        if (activeConvId && messageId && initialStatus !== 'COMPLETED') {
          let currentStatus = initialStatus;
          let retries = 0;

          while (
            retries < MAX_POLL_RETRIES &&
            currentStatus !== 'COMPLETED' &&
            currentStatus !== 'FAILED' &&
            currentStatus !== 'CANCELLED'
          ) {
            await new Promise((res) => setTimeout(res, POLL_INTERVAL_MS));
            retries++;

            const pollEndpoint = `${host}/api/2.0/genie/spaces/${spaceId}/conversations/${activeConvId}/messages/${messageId}`;
            const pollRes = await fetch(pollEndpoint, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (pollRes.ok) {
              const pollData = await pollRes.json();
              currentStatus = pollData.status || currentStatus;
              if (pollData.content || pollData.text) {
                rawContent = pollData.content || pollData.text;
              } else if (pollData.attachments && pollData.attachments.length > 0) {
                rawContent = pollData.attachments.map((a: any) => a.text || a.content).join('\n');
              }
            }
          }
        }

        // If real Genie query succeeded and produced answer
        if (rawContent && rawContent.trim().length > 0) {
          const lower = message.toLowerCase();
          const isWhatIf = lower.includes('what if') || lower.includes('5 hour') || lower.includes('time');
          const baseFixture = isWhatIf ? WHATIF_5HRS_RESPONSE : GOLDEN_PATH_RESPONSE;

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
        console.warn('Real Databricks Genie query error, using fixture mode:', err);
      }
    }

    // Dual Mode: High-quality fixture response when credentials fail or are missing
    const lower = (message || '').toLowerCase();
    const isWhatIf =
      lower.includes('5 hour') ||
      lower.includes('5 hrs') ||
      lower.includes('time') ||
      lower.includes('what if');

    const fixtureRes = isWhatIf ? WHATIF_5HRS_RESPONSE : GOLDEN_PATH_RESPONSE;

    // Simulate natural AI thinking delay for high-perceived quality
    await new Promise((resolve) => setTimeout(resolve, 450));

    return NextResponse.json({
      ...fixtureRes,
      query: message,
      conversationId: conversationId || 'genie-session-fixture',
      source: 'fixture',
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to process Genie query',
        details: String(error),
        source: 'fixture',
      },
      { status: 500 }
    );
  }
}

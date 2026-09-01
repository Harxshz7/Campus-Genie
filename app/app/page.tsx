'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { QueryInterface } from '@/components/QueryInterface';
import { WhatIfPanel } from '@/components/WhatIfPanel';
import { StakeholderSection } from '@/components/StakeholderSection';
import { Footer } from '@/components/Footer';
import { GOLDEN_PATH_RESPONSE, WHATIF_5HRS_RESPONSE } from '@/lib/fixtures';
import { GenieResponse } from '@/lib/types';

export default function Home() {
  const [viewState, setViewState] = useState<'landing' | 'chat'>('landing');
  const [currentResponse, setCurrentResponse] = useState<GenieResponse | null>(null);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunQuery = async (queryText: string, isWhatIf: boolean = false): Promise<GenieResponse> => {
    setIsLoading(true);
    // Switch to chat view if still on landing
    if (viewState === 'landing') {
      setViewState('chat');
    }

    try {
      const res = await fetch('/api/genie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          conversationId: conversationId,
        }),
      });

      const data: GenieResponse = await res.json();

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      if (data && data.steps) {
        setCurrentResponse(data);
        return data;
      }

      const fallback = isWhatIf ? WHATIF_5HRS_RESPONSE : GOLDEN_PATH_RESPONSE;
      setCurrentResponse(fallback);
      return fallback;
    } catch (err) {
      console.error('Query error:', err);
      const fallback = isWhatIf ? WHATIF_5HRS_RESPONSE : GOLDEN_PATH_RESPONSE;
      setCurrentResponse(fallback);
      return fallback;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      {/* Header with Back to Home button when in chat view */}
      <Header
        viewState={viewState}
        onBackToLanding={() => {
          setViewState('landing');
        }}
      />

      <main className="flex-1 px-4 lg:px-8 pb-12">
        {/* STATE 1: LANDING PAGE VIEW */}
        {viewState === 'landing' ? (
          <div className="space-y-12">
            <Hero onStartChat={() => setViewState('chat')} />
            <StakeholderSection />
          </div>
        ) : (
          /* STATE 2: FOCUSED GENIE CHAT EXPERIENCE */
          <div className="space-y-10 max-w-4xl mx-auto pt-6">
            <QueryInterface
              onRunQuery={handleRunQuery}
              response={currentResponse}
              isLoading={isLoading}
            />

            {/* What-If Re-Planning Panel (Only shown AFTER first answer is generated) */}
            {currentResponse && (
              <WhatIfPanel
                onRunWhatIf={(constraint) => handleRunQuery(constraint, true)}
                isLoading={isLoading}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

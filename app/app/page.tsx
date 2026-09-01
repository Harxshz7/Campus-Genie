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
  const [currentResponse, setCurrentResponse] = useState<GenieResponse>(GOLDEN_PATH_RESPONSE);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunQuery = async (queryText: string, isWhatIf: boolean = false): Promise<GenieResponse> => {
    setIsLoading(true);
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

  const handleScrollToQuery = () => {
    const el = document.getElementById('query-interface');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 lg:px-8 space-y-12 pb-12">
        {/* 1. Hero Section */}
        <Hero onScrollToQuery={handleScrollToQuery} />

        {/* 2. Main Query Interface & Opportunity Path Cards */}
        <QueryInterface
          onRunQuery={handleRunQuery}
          initialResponse={currentResponse}
          isLoading={isLoading}
        />

        {/* 3. What-If Re-Planning Section */}
        <WhatIfPanel
          onRunWhatIf={(constraint) => handleRunQuery(constraint, true)}
          isLoading={isLoading}
        />

        {/* 4. Stakeholder Value Section */}
        <StakeholderSection />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}

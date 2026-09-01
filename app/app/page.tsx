"use strict";
"use client";

import React, { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QueryInterface } from "@/components/QueryInterface";
import { OpportunityPath } from "@/components/OpportunityPath";
import { ReasoningInspector } from "@/components/ReasoningInspector";
import { WhatIfPanel } from "@/components/WhatIfPanel";
import { StakeholderSection } from "@/components/StakeholderSection";
import { Footer } from "@/components/Footer";
import { GOLDEN_RESPONSE, getFixtureForQuery } from "@/lib/fixtures";
import { GenieResponse } from "@/lib/types";

export default function Home() {
  const [activeResponse, setActiveResponse] = useState<GenieResponse>(GOLDEN_RESPONSE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeQuery, setActiveQuery] = useState<string>(GOLDEN_RESPONSE.query);

  const pathSectionRef = useRef<HTMLDivElement>(null);
  const querySectionRef = useRef<HTMLDivElement>(null);

  const handleRunQuery = async (queryText: string, isWhatIf: boolean = false) => {
    setIsLoading(true);
    setActiveQuery(queryText);

    try {
      // Call our API proxy
      const res = await fetch("/api/genie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryText, isWhatIf }),
      });

      if (res.ok) {
        const data: GenieResponse = await res.json();
        setActiveResponse(data);
      } else {
        // Fallback directly to fixture logic
        setActiveResponse(getFixtureForQuery(queryText));
      }
    } catch (err) {
      console.warn("Using local fixture fallback due to network error:", err);
      setActiveResponse(getFixtureForQuery(queryText));
    } finally {
      setIsLoading(false);
      // Smooth scroll down to synthesized path
      setTimeout(() => {
        pathSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleSelectGolden = () => {
    handleRunQuery(GOLDEN_RESPONSE.query, false);
  };

  const handleExploreClick = () => {
    querySectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-white flex flex-col justify-between selection:bg-black selection:text-white">
      <Header />

      <Hero
        onExploreClick={handleExploreClick}
        onSelectGolden={handleSelectGolden}
      />

      <div ref={querySectionRef}>
        <QueryInterface
          onQuerySubmit={(q) => handleRunQuery(q, false)}
          isLoading={isLoading}
          activeQuery={activeQuery}
        />
      </div>

      <div ref={pathSectionRef}>
        <OpportunityPath response={activeResponse} />
      </div>

      <WhatIfPanel
        onWhatIfSubmit={(constraint) => handleRunQuery(constraint, true)}
        isLoading={isLoading}
      />

      <ReasoningInspector reasoning={activeResponse.reasoning} />

      <StakeholderSection
        onSelectQuery={(q) => handleRunQuery(q, false)}
      />

      <Footer />
    </main>
  );
}

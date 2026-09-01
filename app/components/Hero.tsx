"use strict";
"use client";

import React from "react";
import { ArrowDown, CornerDownRight, Sparkles } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
  onSelectGolden: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onSelectGolden }) => {
  return (
    <section className="relative w-full bg-background bg-grid-subtle border-b-4 border-pure-black py-16 sm:py-24 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top metadata tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
          <span className="border-2 border-pure-black bg-pure-black text-pure-white px-3 py-1 font-bold uppercase tracking-wider">
            Problem: Campus Data Silos
          </span>
          <span className="border-2 border-pure-black bg-pure-white text-pure-black px-3 py-1 font-semibold uppercase tracking-wider">
            Solution: Multi-Hop Opportunity Graph
          </span>
          <span className="border-2 border-pure-black bg-pure-white text-pure-black px-3 py-1 font-semibold uppercase tracking-wider hidden sm:inline-block">
            Engine: Databricks Genie
          </span>
        </div>

        {/* Dramatic Oversized Serif Headline with 8xl/9xl Scale */}
        <div className="mb-10">
          <h2 className="font-headline text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.88] uppercase text-pure-black">
            RADICAL
            <br />
            <span className="italic font-normal">CLARITY.</span>
          </h2>
          <p className="font-headline text-2xl sm:text-3xl md:text-4xl text-pure-black mt-6 max-w-4xl font-normal leading-snug">
            Stop searching disconnected campus lists. Let Databricks Genie reason across your skills to build a sequenced, explainable roadmap.
          </p>
        </div>

        {/* Problem Paradox Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 border-4 border-pure-black bg-pure-white p-6 sm:p-8">
          <div className="border-b-2 md:border-b-0 md:border-r-2 border-pure-black pb-6 md:pb-0 md:pr-6">
            <div className="font-mono text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
              [ 01 / THE SILO TRAP ]
            </div>
            <h3 className="font-headline text-xl sm:text-2xl font-bold mb-2 text-pure-black">
              Fragmented Data
            </h3>
            <p className="font-body text-sm sm:text-base text-foreground leading-relaxed">
              Clubs, research labs, workshops, and placement portals exist in total isolation. No portal shows how a sophomore project connects to an 18 LPA placement.
            </p>
          </div>

          <div className="border-b-2 md:border-b-0 md:border-r-2 border-pure-black pb-6 md:pb-0 md:pr-6">
            <div className="font-mono text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
              [ 02 / THE UNIVERSAL KEY ]
            </div>
            <h3 className="font-headline text-xl sm:text-2xl font-bold mb-2 text-pure-black">
              Skills as Connectors
            </h3>
            <p className="font-body text-sm sm:text-base text-foreground leading-relaxed">
              Every entity either <strong className="underline decoration-2">requires</strong> or <strong className="underline decoration-2">teaches</strong> skills at calibrated proficiency levels (1–5), forming a traversable Opportunity Graph.
            </p>
          </div>

          <div>
            <div className="font-mono text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
              [ 03 / THE REASONING ENGINE ]
            </div>
            <h3 className="font-headline text-xl sm:text-2xl font-bold mb-2 text-pure-black">
              Genie Multi-Hop
            </h3>
            <p className="font-body text-sm sm:text-base text-foreground leading-relaxed">
              Genie doesn't merely keyword-search. It joins 16 Unity Catalog tables to synthesize prerequisites, time budgets, and dynamic what-if re-planning.
            </p>
          </div>
        </div>

        {/* CTA Buttons and Golden Prompt Trigger */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={onSelectGolden}
            className="px-8 py-4 bg-pure-black text-pure-white font-mono text-sm font-bold uppercase tracking-widest border-4 border-pure-black hover-invert-dark flex items-center justify-center gap-3 duration-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-pure-black focus-visible:outline-offset-2"
          >
            <span>Run Golden Demo (Arjun Mehta)</span>
            <CornerDownRight className="w-4 h-4" strokeWidth={1.5} />
          </button>

          <button
            onClick={onExploreClick}
            className="px-8 py-4 bg-pure-white text-pure-black font-mono text-sm font-bold uppercase tracking-widest border-4 border-pure-black hover-invert flex items-center justify-center gap-3 duration-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-pure-black focus-visible:outline-offset-2"
          >
            <span>Ask Custom Question</span>
            <ArrowDown className="w-4 h-4" strokeWidth={1.5} />
          </button>

          <div className="sm:ml-auto flex items-center gap-4 text-muted-foreground font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-pure-black inline-block"></span>
              <span>100% Deterministic SQL Graph</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-pure-black inline-block"></span>
              <span>Zero Accent Colors</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

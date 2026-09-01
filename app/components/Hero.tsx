"use strict";
"use client";

import React from "react";
import { ArrowDown, Sparkles, Compass, Lightbulb, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
  onSelectGolden: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onSelectGolden }) => {
  return (
    <section className="relative w-full bg-paper bg-paper-grain border-b-[2.5px] border-ink py-12 sm:py-16 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Top handwritten tags */}
        <div className="flex flex-wrap items-center gap-2 mb-6 font-hand text-sm">
          <span className="border-2 border-ink bg-sketch-red text-white px-3 py-1 wobbly-pill font-bold shadow-sketchSm rotate-[-1deg]">
            📌 The Campus Silo Problem
          </span>
          <span className="border-2 border-ink bg-paper-yellow text-ink px-3 py-1 wobbly-pill font-bold shadow-sketchSm rotate-[1.5deg]">
            ✨ The Opportunity Graph
          </span>
          <span className="border-2 border-ink bg-paper-green text-ink px-3 py-1 wobbly-pill font-bold shadow-sketchSm hidden sm:inline-block rotate-[-0.5deg]">
            🧠 Multi-Hop Genie Intelligence
          </span>
        </div>

        {/* Handwritten Headline */}
        <div className="mb-8 relative">
          <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] text-ink">
            Find Your Way Out of the{" "}
            <span className="relative inline-block text-sketch-red">
              Campus Maze.
              {/* Hand-drawn squiggly underline under maze */}
              <svg
                className="absolute -bottom-2.5 left-0 w-full h-3.5 text-sketch-red overflow-visible"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8C25 2 50 12 75 6C100 0 125 10 150 5C175 0 195 9 198 7"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="font-body text-xl sm:text-2xl text-ink-light mt-6 max-w-3xl leading-snug">
            Don't get lost in disconnected club lists, workshop flyers, and research boards. Tell Databricks Genie what you know and where you want to go — and get a step-by-step roadmap tailored to you.
          </p>
        </div>

        {/* 3 Sketched Sticky Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 relative">
          {/* Sticky Note 1: Fragmented Silos */}
          <div className="relative border-[2.5px] border-ink bg-paper-pink p-6 shadow-sketch wobbly-card rotate-[-1.5deg] hover:rotate-0 transition-transform duration-snappy">
            {/* Washi tape strip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 tape-strip rotate-[2deg]"></div>
            <div className="font-headline text-lg font-bold text-ink mb-1 flex items-center gap-2">
              <span>01. The Silo Trap</span>
            </div>
            <p className="font-body text-base text-ink-light leading-relaxed">
              Clubs, research labs, workshops, and placement drives exist in separate silos. No portal shows how a sophomore project unlocks an 18 LPA dream job.
            </p>
          </div>

          {/* Sticky Note 2: Skills as Connector */}
          <div className="relative border-[2.5px] border-ink bg-paper-yellow p-6 shadow-sketch wobbly-card-alt rotate-[1deg] hover:rotate-0 transition-transform duration-snappy">
            {/* Red thumbtack */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 thumbtack"></div>
            <div className="font-headline text-lg font-bold text-ink mb-1 flex items-center gap-2">
              <span>02. Skills Connect All</span>
            </div>
            <p className="font-body text-base text-ink-light leading-relaxed">
              Every campus project either <strong className="wavy-underline">requires</strong> or <strong className="wavy-underline">teaches</strong> skills at levels 1–5. Connected together, they form a learnable Opportunity Graph.
            </p>
          </div>

          {/* Sticky Note 3: Genie Reasoning */}
          <div className="relative border-[2.5px] border-ink bg-paper-green p-6 shadow-sketch wobbly-card rotate-[-0.8deg] hover:rotate-0 transition-transform duration-snappy">
            {/* Washi tape strip blue */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 tape-strip-blue rotate-[-3deg]"></div>
            <div className="font-headline text-lg font-bold text-ink mb-1 flex items-center gap-2">
              <span>03. Genie Reasons</span>
            </div>
            <p className="font-body text-base text-ink-light leading-relaxed">
              Genie doesn't just search keywords. It traverses 16 Unity Catalog tables to sequence your prerequisites, hours/week, and what-if changes.
            </p>
          </div>
        </div>

        {/* CTA Area with Hand-Drawn SVG Arrow */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 relative pt-4">
          <button
            onClick={onSelectGolden}
            className="btn-sketch-primary px-8 py-4 font-headline text-lg font-bold wobbly-btn flex items-center justify-center gap-2 text-center"
          >
            <span>Try Golden Demo: Arjun Mehta (AI Engineer)</span>
            <Sparkles className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <button
            onClick={onExploreClick}
            className="btn-sketch-secondary px-8 py-4 font-headline text-lg font-bold wobbly-btn flex items-center justify-center gap-2 text-center"
          >
            <span>Ask Custom Question</span>
            <ArrowDown className="w-5 h-5" strokeWidth={2.5} />
          </button>

          {/* Hand-drawn dashed curve arrow pointing down on desktop */}
          <div className="hidden lg:block absolute -top-12 right-6 pointer-events-none">
            <div className="font-hand text-sm text-sketch-blue rotate-[8deg] mb-1 font-bold">
              Try asking anything! ✍️
            </div>
            <svg
              className="w-20 h-16 text-sketch-blue"
              viewBox="0 0 80 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 5C35 10 65 25 55 50"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
              <path
                d="M48 45L55 51L61 43"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

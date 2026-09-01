"use strict";
"use client";

import React from "react";
import { Sparkles, Compass, Lightbulb } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-paper/95 backdrop-blur-sm border-b-[2.5px] border-ink">
      {/* Top hand-drawn micro-banner */}
      <div className="bg-paper-yellow border-b-2 border-ink px-4 py-1.5 flex justify-between items-center text-sm font-hand">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-sketch-red border border-ink animate-bounce"></span>
          <span className="font-bold tracking-wide">✨ Databricks Genie Space: Connected & Reasoning</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs">
          <span>Catalog: <strong className="underline decoration-wavy decoration-sketch-blue">campus_genie</strong></span>
          <span>Schema: <strong className="underline decoration-wavy decoration-sketch-red">opportunity_graph</strong></span>
          <span className="bg-paper-light px-2 py-0.5 border border-ink rounded-full">16 Tables</span>
        </div>
        <div className="text-xs text-ink-muted">
          ✏️ Hand-Drawn Edition
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-paper-yellowDark border-2 border-ink shadow-sketchSm flex items-center justify-center font-headline text-2xl font-bold wobbly-badge rotate-[-2deg]">
            ✦
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight leading-none text-ink">
                Campus Opportunity Radar
              </h1>
              <span className="bg-sketch-red text-white text-[11px] font-hand px-2 py-0.5 wobbly-pill rotate-[1deg] font-bold">
                Genie AI
              </span>
            </div>
            <p className="text-sm text-ink-muted leading-none mt-1">
              Your personalized campus opportunity roadmap — sketched by Databricks Genie
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-2 font-hand text-base w-full sm:w-auto justify-between sm:justify-end pt-1 sm:pt-0">
          <a
            href="#query-section"
            className="px-3.5 py-1.5 border-2 border-ink bg-white text-ink shadow-sketchSm hover:bg-paper-yellow wobbly-btn font-bold transition-all text-sm"
          >
            Ask Genie
          </a>
          <a
            href="#reasoning-section"
            className="px-3.5 py-1.5 border-2 border-ink bg-white text-ink shadow-sketchSm hover:bg-paper-green wobbly-btn font-bold transition-all text-sm"
          >
            Graph Trace
          </a>
          <a
            href="#stakeholders-section"
            className="px-3.5 py-1.5 border-2 border-ink bg-paper-yellowDark text-ink shadow-sketchSm hover:bg-paper-yellow wobbly-btn font-bold transition-all text-sm"
          >
            Pinboard
          </a>
        </nav>
      </div>
    </header>
  );
};

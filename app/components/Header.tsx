"use strict";
"use client";

import React from "react";
import { Terminal, Database, Sparkles, Compass } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b-4 border-pure-black">
      {/* Top micro-banner */}
      <div className="bg-pure-black text-pure-white px-4 py-1.5 flex justify-between items-center text-xs font-mono tracking-wider">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-pure-white animate-pulse"></span>
          <span>DATABRICKS GENIE SPACE : ACTIVE</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>CATALOG: <strong className="underline decoration-1">campus_genie</strong></span>
          <span>SCHEMA: <strong className="underline decoration-1">opportunity_graph</strong></span>
          <span>TABLES: <strong>16</strong></span>
        </div>
        <div className="font-mono text-[11px] text-mono-400">
          v1.0.0 MONOCHROME
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pure-black text-pure-white flex items-center justify-center font-headline text-2xl font-bold border-2 border-pure-black">
            ✦
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline text-2xl sm:text-3xl font-black tracking-tight leading-none text-pure-black">
                CAMPUS RADAR
              </h1>
              <span className="bg-pure-black text-pure-white text-[10px] font-mono px-1.5 py-0.5 uppercase tracking-widest font-semibold">
                Genie Powered
              </span>
            </div>
            <p className="font-mono text-xs text-muted-foreground tracking-wide mt-0.5">
              Turn Fragmented Campus Data into Sequenced Career Trajectories
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-2 sm:gap-4 font-mono text-xs w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-mono-200">
          <a
            href="#query-section"
            className="px-3.5 py-2 border-2 border-pure-black bg-pure-white text-pure-black hover-invert uppercase font-bold tracking-wider duration-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-pure-black focus-visible:outline-offset-2"
          >
            Launch Query
          </a>
          <a
            href="#reasoning-section"
            className="px-3.5 py-2 border-2 border-pure-black bg-pure-white text-pure-black hover-invert uppercase font-bold tracking-wider duration-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-pure-black focus-visible:outline-offset-2"
          >
            Reasoning Graph
          </a>
          <a
            href="#stakeholders-section"
            className="px-3.5 py-2 border-2 border-pure-black bg-pure-black text-pure-white hover-invert-dark uppercase font-bold tracking-wider duration-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-pure-white focus-visible:outline-offset-2"
          >
            Stakeholders
          </a>
        </nav>
      </div>
    </header>
  );
};

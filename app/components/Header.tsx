"use strict";
"use client";

import React from "react";
import { Terminal, Database, Sparkles, Compass } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-4 border-black">
      {/* Top micro-banner */}
      <div className="bg-black text-white px-4 py-1.5 flex justify-between items-center text-xs font-mono tracking-wider">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-white animate-pulse"></span>
          <span>DATABRICKS GENIE SPACE : ACTIVE</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>CATALOG: <strong className="underline">campus_genie</strong></span>
          <span>SCHEMA: <strong className="underline">opportunity_graph</strong></span>
          <span>TABLES: <strong>16</strong></span>
        </div>
        <div className="font-mono text-[11px] text-mono-mid">
          v1.0.0 MONOCHROME
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-serif text-2xl font-bold border-2 border-black">
            ✦
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-black tracking-tight leading-none">
                CAMPUS RADAR
              </h1>
              <span className="bg-black text-white text-[10px] font-mono px-1.5 py-0.5 uppercase tracking-widest font-semibold">
                Genie Powered
              </span>
            </div>
            <p className="font-mono text-xs text-mono-mid tracking-wide mt-0.5">
              Turn Fragmented Campus Data into Sequenced Career Trajectories
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-2 sm:gap-4 font-mono text-xs w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-mono-light">
          <a
            href="#query-section"
            className="px-3 py-2 border-2 border-black bg-white text-black hover-invert uppercase font-bold tracking-wider"
          >
            Launch Query
          </a>
          <a
            href="#reasoning-section"
            className="px-3 py-2 border-2 border-black bg-white text-black hover-invert uppercase font-bold tracking-wider"
          >
            Reasoning Graph
          </a>
          <a
            href="#stakeholders-section"
            className="px-3 py-2 border-2 border-black bg-black text-white hover-invert-dark uppercase font-bold tracking-wider"
          >
            Stakeholders
          </a>
        </nav>
      </div>
    </header>
  );
};

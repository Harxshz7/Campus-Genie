"use strict";
"use client";

import React from "react";
import { ArrowUp, Github, Database, Terminal } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-white border-t-4 border-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-black inline-block"></span>
              <span className="font-serif text-2xl font-black tracking-tight">
                CAMPUS OPPORTUNITY RADAR
              </span>
            </div>
            <p className="font-body text-sm text-mono-dark mt-1 max-w-md">
              A high-precision intelligence layer turning fragmented university datasets into explainable, sequenced career trajectories.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
            <div className="border border-black px-3 py-2 bg-mono-light font-bold">
              DATABRICKS GENIE HACKATHON
            </div>
            <div className="border border-black px-3 py-2 bg-mono-light font-bold">
              UNITY CATALOG GRAPH
            </div>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 border-2 border-black bg-black text-white hover-invert-dark uppercase font-bold flex items-center gap-2"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4px Horizontal Rule */}
        <div className="w-full h-1 bg-black my-6"></div>

        {/* Bottom copyright & attribution */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs text-mono-mid">
          <div>
            © 2026 Campus Opportunity Radar. All rights reserved. Open-source architecture.
          </div>
          <div className="flex items-center gap-6">
            <span>Deterministic SQL Reasoning</span>
            <span>•</span>
            <span>Minimalist Monochrome Design</span>
            <span>•</span>
            <span>Zero Border Radius</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

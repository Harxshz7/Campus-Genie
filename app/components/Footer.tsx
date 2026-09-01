"use strict";
"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-background border-t-4 border-pure-black py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-4 h-4 bg-pure-black inline-block"></span>
              <span className="font-headline text-2xl sm:text-3xl font-black tracking-tight text-pure-black">
                CAMPUS OPPORTUNITY RADAR
              </span>
            </div>
            <p className="font-body text-sm sm:text-base text-foreground mt-2 max-w-md">
              A high-precision intelligence layer turning fragmented university datasets into explainable, sequenced career trajectories.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
            <div className="border border-pure-black px-3.5 py-2 bg-mono-100 font-bold">
              DATABRICKS GENIE HACKATHON
            </div>
            <div className="border border-pure-black px-3.5 py-2 bg-mono-100 font-bold">
              UNITY CATALOG GRAPH
            </div>
            <button
              onClick={scrollToTop}
              className="px-4 py-2.5 border-2 border-pure-black bg-pure-black text-pure-white hover-invert-dark uppercase font-bold flex items-center gap-2 duration-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-pure-black focus-visible:outline-offset-2"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* 4px Horizontal Rule */}
        <div className="w-full h-1 bg-pure-black my-8"></div>

        {/* Bottom copyright & attribution */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs text-muted-foreground">
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

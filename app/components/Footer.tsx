"use strict";
"use client";

import React from "react";
import { ArrowUp, Sparkles, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-paper bg-paper-grain border-t-[2.5px] border-ink py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-paper-yellowDark border-2 border-ink wobbly-badge flex items-center justify-center font-headline text-sm font-bold">
                ✦
              </span>
              <span className="font-headline text-2xl font-bold tracking-tight text-ink">
                Campus Opportunity Radar
              </span>
            </div>
            <p className="font-body text-base text-ink-light mt-1 max-w-md">
              A playful, high-precision intelligence layer turning fragmented university datasets into explainable, sequenced career trajectories.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-hand text-sm">
            <span className="border border-ink px-3 py-1 bg-paper-yellow wobbly-pill font-bold shadow-sketchSm">
              Databricks Genie Hackathon 2026
            </span>
            <span className="border border-ink px-3 py-1 bg-paper-green wobbly-pill font-bold shadow-sketchSm">
              Unity Catalog
            </span>
            <button
              onClick={scrollToTop}
              className="btn-sketch-primary px-3.5 py-1.5 font-headline text-sm font-bold wobbly-btn flex items-center gap-1.5"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Squiggly divider line */}
        <div className="w-full my-6 flex justify-center text-ink/40">
          <svg className="w-full h-3" viewBox="0 0 1000 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 6 Q 25 0, 50 6 T 100 6 T 150 6 T 200 6 T 250 6 T 300 6 T 350 6 T 400 6 T 450 6 T 500 6 T 550 6 T 600 6 T 650 6 T 700 6 T 750 6 T 800 6 T 850 6 T 900 6 T 950 6 T 1000 6"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 font-hand text-sm text-ink-muted">
          <div>
            © 2026 Campus Opportunity Radar. Open-source architecture.
          </div>
          <div className="flex items-center gap-4">
            <a href="#query-section" className="wavy-underline text-ink font-bold hover:text-sketch-red">
              Ask a Question
            </a>
            <span>•</span>
            <a href="#reasoning-section" className="wavy-underline-blue text-ink font-bold hover:text-sketch-blue">
              View Graph Trace
            </a>
            <span>•</span>
            <a href="#stakeholders-section" className="wavy-underline text-ink font-bold hover:text-sketch-red">
              Stakeholder Pinboard
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

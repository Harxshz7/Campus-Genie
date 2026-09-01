"use strict";
"use client";

import React, { useState } from "react";
import { GitBranch, CornerDownRight, Clock, Code, Target, ArrowRight } from "lucide-react";

interface WhatIfPanelProps {
  onWhatIfSubmit: (constraintQuery: string) => void;
  isLoading: boolean;
}

export const WhatIfPanel: React.FC<WhatIfPanelProps> = ({ onWhatIfSubmit, isLoading }) => {
  const [customConstraint, setCustomConstraint] = useState("");

  const presets = [
    {
      icon: Clock,
      title: "Limit to 5 Hours / Wk",
      query: "What if Arjun only has 5 hours per week available?",
      desc: "Filters out heavy 8h research labs, substitutes lightweight cohorts and seminars.",
    },
    {
      icon: Code,
      title: "Already Knows Python",
      query: "If Arjun already knew Python at an intermediate level, how would his opportunity path to AI Engineer change?",
      desc: "Bypasses beginner syntax projects, compresses roadmap by 6 weeks.",
    },
    {
      icon: Target,
      title: "Switch to Data Scientist",
      query: "What if Arjun wanted to become a Data Scientist instead of an AI Engineer?",
      desc: "Reroutes graph through statistics, SQL analytics, and predictive modeling labs.",
    },
  ];

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customConstraint.trim() || isLoading) return;
    onWhatIfSubmit(customConstraint.trim());
  };

  return (
    <section id="whatif-section" className="w-full bg-mono-50 border-b-4 border-pure-black py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-pure-black" strokeWidth={1.5} />
              <span>[ REAL-TIME RE-PLANNING ENGINE ]</span>
            </div>
            <h3 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-pure-black mt-2">
              "What If?" Constraint Testing
            </h3>
            <p className="font-body text-base text-foreground mt-2 max-w-3xl">
              Real student journeys encounter sudden schedule constraints or skill shifts. Test how Genie re-reasons across the graph when variables change.
            </p>
          </div>

          <div className="font-mono text-xs border-2 border-pure-black bg-pure-white px-3.5 py-2 font-bold">
            GRAPH RE-CALCULATION : 100MS
          </div>
        </div>

        {/* Preset What-If Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {presets.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="border-4 border-pure-black bg-pure-white p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 border-2 border-pure-black bg-pure-black text-pure-white flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-headline text-xl sm:text-2xl font-bold mb-2.5 text-pure-black">
                    {p.title}
                  </h4>
                  <p className="font-body text-sm text-foreground mb-6 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <button
                  onClick={() => onWhatIfSubmit(p.query)}
                  disabled={isLoading}
                  className="w-full py-3.5 border-2 border-pure-black bg-pure-white text-pure-black font-mono text-xs font-bold uppercase tracking-wider hover-invert flex items-center justify-center gap-2 mt-auto duration-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-pure-black focus-visible:outline-offset-2 disabled:opacity-50"
                >
                  <span>Apply Scenario</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom What-If Input Box */}
        <form onSubmit={handleSubmitCustom} className="border-4 border-pure-black bg-pure-white p-6 sm:p-8">
          <div className="flex flex-col gap-4">
            <label
              htmlFor="whatif-custom"
              className="font-mono text-xs font-bold uppercase tracking-widest text-pure-black flex justify-between"
            >
              <span>Custom Follow-Up Constraint</span>
              <span className="text-muted-foreground">Dynamic Re-Planning</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="whatif-custom"
                type="text"
                value={customConstraint}
                onChange={(e) => setCustomConstraint(e.target.value)}
                placeholder="e.g. What if I can only work on weekends? or What if I already built a web scraper?"
                className="flex-1 p-4 font-headline text-base sm:text-lg bg-mono-50 border-2 border-pure-black focus:bg-pure-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-pure-black"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider bg-pure-black text-pure-white border-2 border-pure-black hover-invert-dark flex items-center justify-center gap-2.5 duration-100 transition-colors disabled:opacity-50 whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-pure-black focus-visible:outline-offset-2"
              >
                <span>Re-Plan Graph</span>
                <CornerDownRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

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
    <section id="whatif-section" className="w-full bg-mono-offwhite border-b-4 border-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-mono-mid flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-black" />
              <span>[ REAL-TIME RE-PLANNING ENGINE ]</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-black text-black mt-1">
              "What If?" Constraint Testing
            </h3>
            <p className="font-body text-base text-mono-dark mt-1 max-w-3xl">
              Real student journeys encounter sudden schedule constraints or skill shifts. Test how Genie re-reasons across the graph when variables change.
            </p>
          </div>

          <div className="font-mono text-xs border-2 border-black bg-white px-3 py-1.5 font-bold">
            GRAPH RE-CALCULATION : 100MS
          </div>
        </div>

        {/* Preset What-If Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {presets.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="border-4 border-black bg-white p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 border-2 border-black bg-black text-white flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-xl font-bold mb-2">{p.title}</h4>
                  <p className="font-body text-sm text-mono-dark mb-4">{p.desc}</p>
                </div>

                <button
                  onClick={() => onWhatIfSubmit(p.query)}
                  disabled={isLoading}
                  className="w-full py-3 border-2 border-black bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover-invert flex items-center justify-center gap-2 mt-auto"
                >
                  <span>Apply Scenario</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom What-If Input Box */}
        <form onSubmit={handleSubmitCustom} className="border-4 border-black bg-white p-6">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="whatif-custom"
              className="font-mono text-xs font-bold uppercase tracking-widest text-black flex justify-between"
            >
              <span>Custom Follow-Up Constraint</span>
              <span className="text-mono-mid">Dynamic Re-Planning</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="whatif-custom"
                type="text"
                value={customConstraint}
                onChange={(e) => setCustomConstraint(e.target.value)}
                placeholder="e.g. What if I can only work on weekends? or What if I already built a web scraper?"
                className="flex-1 p-4 font-serif text-base bg-mono-offwhite border-2 border-black focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider bg-black text-white border-2 border-black hover-invert-dark flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
              >
                <span>Re-Plan Graph</span>
                <CornerDownRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

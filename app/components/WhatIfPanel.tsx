"use strict";
"use client";

import React, { useState } from "react";
import { GitBranch, Clock, Code, Target, CornerDownRight, Sparkles } from "lucide-react";

interface WhatIfPanelProps {
  onWhatIfSubmit: (constraintQuery: string) => void;
  isLoading: boolean;
}

export const WhatIfPanel: React.FC<WhatIfPanelProps> = ({ onWhatIfSubmit, isLoading }) => {
  const [customConstraint, setCustomConstraint] = useState("");

  const presets = [
    {
      icon: Clock,
      title: "Only 5 Hours / Week",
      query: "What if Arjun only has 5 hours per week available?",
      desc: "Scribbles out heavy 8h research labs and swaps in lightweight cohorts and seminars.",
      strikethroughText: "Skip 8h Lab",
      newText: "2h Seminar",
      bg: "bg-paper-pink",
      rot: "rotate-[-1.5deg]",
    },
    {
      icon: Code,
      title: "Already Knows Python",
      query: "If Arjun already knew Python at an intermediate level, how would his opportunity path to AI Engineer change?",
      desc: "Skips basic syntax projects and fast-tracks the roadmap by 6 whole weeks.",
      strikethroughText: "Skip Backend API",
      newText: "Fast-Track",
      bg: "bg-paper-yellow",
      rot: "rotate-[1deg]",
    },
    {
      icon: Target,
      title: "Switch to Data Scientist",
      query: "What if Arjun wanted to become a Data Scientist instead of an AI Engineer?",
      desc: "Reroutes graph through statistics, SQL analytics, and predictive modeling labs.",
      strikethroughText: "Drop NLP",
      newText: "Add Analytics",
      bg: "bg-paper-green",
      rot: "rotate-[-0.8deg]",
    },
  ];

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customConstraint.trim() || isLoading) return;
    onWhatIfSubmit(customConstraint.trim());
  };

  return (
    <section id="whatif-section" className="w-full bg-paper bg-paper-grain border-b-[2.5px] border-ink py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="font-hand text-sm font-bold text-sketch-red flex items-center gap-1.5 uppercase tracking-wide">
              <GitBranch className="w-4 h-4" strokeWidth={2.5} />
              <span>[ Real-Time Re-Planning Engine ]</span>
            </div>
            <h3 className="font-headline text-3xl sm:text-4xl font-bold text-ink mt-1">
              "What If?" Constraint Lab 🧪
            </h3>
            <p className="font-body text-lg text-ink-light mt-1 max-w-2xl">
              Student schedules change, new skills get picked up, and career interests shift. Watch Genie automatically scribble out outdated steps and redraw your path!
            </p>
          </div>

          <div className="font-hand text-sm border-2 border-ink bg-paper-yellow px-3.5 py-1.5 wobbly-badge font-bold shadow-sketchSm">
            ⚡ Instant Graph Recalculation
          </div>
        </div>

        {/* Preset What-If Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {presets.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className={`border-[2.5px] border-ink ${p.bg} p-6 shadow-sketch wobbly-card flex flex-col justify-between transition-all duration-snappy ${p.rot} hover:rotate-0 hover:shadow-sketchLg`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 border-2 border-ink bg-white rounded-full flex items-center justify-center shadow-sketchSm">
                      <Icon className="w-5 h-5 text-sketch-blue" strokeWidth={2.5} />
                    </div>
                    {/* Scribbled-out visual metaphor badge */}
                    <div className="font-hand text-xs">
                      <span className="scribble-out font-bold text-ink-muted mr-1">{p.strikethroughText}</span>
                      <span className="bg-sketch-red text-white px-2 py-0.5 wobbly-pill font-bold">→ {p.newText}</span>
                    </div>
                  </div>

                  <h4 className="font-headline text-xl font-bold mb-2 text-ink">
                    {p.title}
                  </h4>
                  <p className="font-body text-base text-ink-light mb-6 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <button
                  onClick={() => onWhatIfSubmit(p.query)}
                  disabled={isLoading}
                  className="btn-sketch-secondary w-full py-2.5 font-headline text-base font-bold wobbly-btn flex items-center justify-center gap-1.5 mt-auto"
                >
                  <span>Apply Scenario</span>
                  <Sparkles className="w-4 h-4 text-sketch-red" strokeWidth={2.5} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom What-If Input Form */}
        <form onSubmit={handleSubmitCustom} className="border-[2.5px] border-ink bg-white p-6 sm:p-8 shadow-sketch wobbly-card relative">
          <div className="absolute -top-3 right-12 w-28 h-6 tape-strip-blue rotate-[2deg]"></div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="whatif-custom"
              className="font-headline text-lg font-bold text-ink flex justify-between"
            >
              <span>Or type a custom constraint or question:</span>
              <span className="font-hand text-sm text-sketch-blue font-bold">Follow-up re-plan</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="whatif-custom"
                type="text"
                value={customConstraint}
                onChange={(e) => setCustomConstraint(e.target.value)}
                placeholder="e.g. What if I can only work on weekends? or What if I already built an open source tool?"
                className="flex-1 p-4 font-body text-lg bg-paper-card border-2 border-ink wobbly-input focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="btn-sketch-primary px-8 py-3.5 font-headline text-lg font-bold wobbly-btn flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
              >
                <span>Re-Plan Roadmap</span>
                <CornerDownRight className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

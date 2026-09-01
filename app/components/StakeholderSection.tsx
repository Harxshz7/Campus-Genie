"use strict";
"use client";

import React from "react";
import { STAKEHOLDER_CARDS } from "@/lib/fixtures";
import { Users, ArrowUpRight, Pin } from "lucide-react";

interface StakeholderSectionProps {
  onSelectQuery: (query: string) => void;
}

export const StakeholderSection: React.FC<StakeholderSectionProps> = ({ onSelectQuery }) => {
  const cardThemes = [
    { bg: "bg-paper-yellow", rot: "rotate-[-1.5deg]" },
    { bg: "bg-paper-pink", rot: "rotate-[1.2deg]" },
    { bg: "bg-paper-green", rot: "rotate-[-1deg]" },
    { bg: "bg-paper-blue", rot: "rotate-[1.5deg]" },
  ];

  return (
    <section
      id="stakeholders-section"
      className="w-full bg-paper bg-paper-grain border-b-[2.5px] border-ink py-16 sm:py-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b-2 border-ink/40 pb-6">
          <div>
            <div className="font-hand text-sm font-bold text-sketch-blue flex items-center gap-1.5 uppercase tracking-wide">
              <Users className="w-4 h-4" strokeWidth={2.5} />
              <span>[ Campus Pinboard ]</span>
            </div>
            <h3 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-ink mt-1">
              One Graph. Every Campus Stakeholder 📌
            </h3>
            <p className="font-body text-lg sm:text-xl text-ink-light mt-1 max-w-2xl leading-relaxed">
              Campus Opportunity Radar isn't just for students. The same graph powers automated lab recruiting, placement tracking, and curricular gap insights.
            </p>
          </div>

          <div className="font-hand text-sm border-2 border-ink bg-paper-yellowDark px-3.5 py-1.5 wobbly-badge font-bold shadow-sketchSm">
            Multi-Stakeholder Pinboard
          </div>
        </div>

        {/* Stakeholder 4-Grid Pinboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STAKEHOLDER_CARDS.map((card, idx) => {
            const theme = cardThemes[idx % cardThemes.length];

            return (
              <div
                key={idx}
                className={`border-[2.5px] border-ink ${theme.bg} p-6 sm:p-8 shadow-sketchLg wobbly-card flex flex-col justify-between transition-all duration-snappy ${theme.rot} hover:rotate-0 hover:shadow-sketchXl relative`}
              >
                {/* Red Thumbtack on top center of card */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 thumbtack"></div>

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-headline text-sm font-bold bg-white text-ink border-2 border-ink px-3 py-0.5 wobbly-pill shadow-sketchSm">
                      {card.role}
                    </span>
                    <span className="font-hand text-xs text-ink-muted bg-white/70 border border-ink px-2 py-0.5 rounded-full">
                      {card.valueMetric}
                    </span>
                  </div>

                  <h4 className="font-headline text-2xl font-bold text-ink mb-2">
                    {card.title}
                  </h4>

                  <p className="font-body text-base text-ink-light leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-ink/30 font-hand text-sm">
                  <div className="text-sketch-red uppercase text-xs mb-2 font-bold flex items-center gap-1">
                    <span>💡 Try This Question:</span>
                  </div>
                  <button
                    onClick={() => onSelectQuery(card.exampleQuery)}
                    className="btn-sketch-secondary w-full text-left p-3 font-body text-base flex items-center justify-between group text-ink font-bold"
                  >
                    <span className="italic line-clamp-1">
                      "{card.exampleQuery}"
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-sketch-blue flex-shrink-0 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sketched Quote Sticky Note */}
        <div className="mt-14 border-[2.5px] border-ink p-8 bg-paper-yellow shadow-sketchLg wobbly-card text-center rotate-[-0.5deg] relative">
          <div className="absolute -top-3 left-12 w-32 h-6 tape-strip rotate-[-2deg]"></div>
          <blockquote className="font-headline text-2xl sm:text-3xl italic text-ink max-w-3xl mx-auto leading-relaxed">
            "When campus opportunities are connected through a unified skill graph, mentors stop giving generic advice and students stop wandering in the dark."
          </blockquote>
          <div className="font-hand text-base text-ink-muted mt-4 font-bold">
            — Databricks Genie Hackathon 2026 Core Thesis 🎓
          </div>
        </div>
      </div>
    </section>
  );
};

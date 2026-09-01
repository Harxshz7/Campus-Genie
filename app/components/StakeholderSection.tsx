"use strict";
"use client";

import React from "react";
import { STAKEHOLDER_CARDS } from "@/lib/fixtures";
import { Users, GraduationCap, Building2, Compass, ArrowUpRight } from "lucide-react";

interface StakeholderSectionProps {
  onSelectQuery: (query: string) => void;
}

export const StakeholderSection: React.FC<StakeholderSectionProps> = ({ onSelectQuery }) => {
  return (
    <section
      id="stakeholders-section"
      className="w-full bg-black text-white bg-grid-subtle-inverted border-b-4 border-black py-16 sm:py-24 dark-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b-2 border-white pb-6">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-mono-mid flex items-center gap-2">
              <Users className="w-4 h-4 text-white" />
              <span>[ MULTI-STAKEHOLDER ECOSYSTEM ]</span>
            </div>
            <h3 className="font-serif text-4xl sm:text-5xl font-black text-white mt-2">
              One Graph. Every Campus Stakeholder.
            </h3>
            <p className="font-body text-base sm:text-lg text-mono-light mt-2 max-w-3xl">
              Campus Opportunity Radar is not just a student assistant. The same Unity Catalog Opportunity Graph powers automated research recruiting, placement pipeline visibility, and curricular planning.
            </p>
          </div>

          <div className="font-mono text-xs border-2 border-white px-4 py-2 uppercase font-bold tracking-wider">
            Enterprise Value
          </div>
        </div>

        {/* Stakeholder 4-Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STAKEHOLDER_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="border-4 border-white bg-mono-darker p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-xs font-bold bg-white text-black px-2.5 py-1 uppercase tracking-widest">
                    {card.role}
                  </span>
                  <span className="font-mono text-xs text-mono-mid border border-mono-dark px-2 py-0.5">
                    {card.valueMetric}
                  </span>
                </div>

                <h4 className="font-serif text-2xl font-bold text-white mb-3">
                  {card.title}
                </h4>

                <p className="font-body text-sm sm:text-base text-mono-light leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-mono-dark font-mono text-xs">
                <div className="text-mono-mid uppercase text-[11px] mb-2 font-bold">
                  Sample Multi-Table Query:
                </div>
                <button
                  onClick={() => onSelectQuery(card.exampleQuery)}
                  className="w-full text-left p-3 border border-mono-dark bg-black hover:border-white transition-colors flex items-center justify-between group"
                >
                  <span className="italic text-mono-light group-hover:text-white line-clamp-1">
                    "{card.exampleQuery}"
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white flex-shrink-0 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Inverted Callout Quote */}
        <div className="mt-12 border-2 border-white p-8 bg-black text-center">
          <blockquote className="font-serif text-2xl sm:text-3xl italic text-white max-w-4xl mx-auto leading-relaxed">
            "When campus opportunities are connected through a unified skill graph, mentors stop giving generic advice and students stop wandering in the dark."
          </blockquote>
          <div className="font-mono text-xs text-mono-mid uppercase tracking-widest mt-4">
            — Databricks Genie Hackathon 2026 Core Thesis
          </div>
        </div>
      </div>
    </section>
  );
};

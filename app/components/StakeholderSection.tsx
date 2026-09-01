"use strict";
"use client";

import React from "react";
import { STAKEHOLDER_CARDS } from "@/lib/fixtures";
import { Users, ArrowUpRight } from "lucide-react";

interface StakeholderSectionProps {
  onSelectQuery: (query: string) => void;
}

export const StakeholderSection: React.FC<StakeholderSectionProps> = ({ onSelectQuery }) => {
  return (
    <section
      id="stakeholders-section"
      className="w-full bg-pure-black text-pure-white bg-grid-inverted border-b-4 border-pure-black py-20 sm:py-28 dark-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b-2 border-pure-white pb-8">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-mono-400 flex items-center gap-2">
              <Users className="w-4 h-4 text-pure-white" strokeWidth={1.5} />
              <span>[ MULTI-STAKEHOLDER ECOSYSTEM ]</span>
            </div>
            <h3 className="font-headline text-4xl sm:text-5xl font-black text-pure-white mt-2">
              One Graph. Every Campus Stakeholder.
            </h3>
            <p className="font-body text-base sm:text-lg text-mono-200 mt-2 max-w-3xl leading-relaxed">
              Campus Opportunity Radar is not just a student assistant. The same Unity Catalog Opportunity Graph powers automated research recruiting, placement pipeline visibility, and curricular planning.
            </p>
          </div>

          <div className="font-mono text-xs border-2 border-pure-white px-4 py-2 uppercase font-bold tracking-wider">
            Enterprise Value
          </div>
        </div>

        {/* Stakeholder 4-Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STAKEHOLDER_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="border-4 border-pure-white bg-mono-900 p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs font-bold bg-pure-white text-pure-black px-3 py-1 uppercase tracking-widest">
                    {card.role}
                  </span>
                  <span className="font-mono text-xs text-mono-400 border border-mono-700 px-2.5 py-1">
                    {card.valueMetric}
                  </span>
                </div>

                <h4 className="font-headline text-2xl sm:text-3xl font-bold text-pure-white mb-3">
                  {card.title}
                </h4>

                <p className="font-body text-sm sm:text-base text-mono-200 leading-relaxed mb-8">
                  {card.description}
                </p>
              </div>

              <div className="pt-6 border-t border-mono-700 font-mono text-xs">
                <div className="text-mono-400 uppercase text-[11px] mb-2.5 font-bold">
                  Sample Multi-Table Query:
                </div>
                <button
                  onClick={() => onSelectQuery(card.exampleQuery)}
                  className="w-full text-left p-3.5 border border-mono-700 bg-pure-black hover:border-pure-white duration-100 transition-colors flex items-center justify-between group focus-visible:outline focus-visible:outline-2 focus-visible:outline-pure-white focus-visible:outline-offset-2"
                >
                  <span className="italic text-mono-200 group-hover:text-pure-white line-clamp-1">
                    "{card.exampleQuery}"
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-pure-white flex-shrink-0 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Inverted Callout Quote */}
        <div className="mt-14 border-2 border-pure-white p-8 sm:p-12 bg-pure-black text-center">
          <blockquote className="font-headline text-2xl sm:text-3xl md:text-4xl italic text-pure-white max-w-4xl mx-auto leading-relaxed">
            "When campus opportunities are connected through a unified skill graph, mentors stop giving generic advice and students stop wandering in the dark."
          </blockquote>
          <div className="font-mono text-xs text-mono-400 uppercase tracking-widest mt-6">
            — Databricks Genie Hackathon 2026 Core Thesis
          </div>
        </div>
      </div>
    </section>
  );
};

"use strict";
"use client";

import React, { useState } from "react";
import { Terminal, Code, Cpu, ChevronDown, ChevronUp, AlertCircle, FileText } from "lucide-react";
import { GenieReasoning } from "@/lib/types";

interface ReasoningInspectorProps {
  reasoning: GenieReasoning;
}

export const ReasoningInspector: React.FC<ReasoningInspectorProps> = ({ reasoning }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section id="reasoning-section" className="w-full bg-paper bg-paper-grain border-b-[2.5px] border-ink py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Toggle Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <div className="font-hand text-sm font-bold text-sketch-blue flex items-center gap-1.5 uppercase tracking-wide">
              <Cpu className="w-4 h-4" strokeWidth={2.5} />
              <span>[ Behind the Scenes ]</span>
            </div>
            <h3 className="font-headline text-3xl font-bold text-ink mt-1">
              Genie Multi-Hop Graph Reasoning Log 🔬
            </h3>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn-sketch-secondary px-4 py-2 font-headline text-base font-bold wobbly-btn flex items-center gap-2"
          >
            <span>{isOpen ? "Hide Blueprint" : "Show Blueprint"}</span>
            {isOpen ? <ChevronUp className="w-4 h-4" strokeWidth={2.5} /> : <ChevronDown className="w-4 h-4" strokeWidth={2.5} />}
          </button>
        </div>

        {isOpen && (
          <div className="border-[2.5px] border-ink bg-paper-card p-6 sm:p-8 shadow-sketchLg wobbly-card space-y-6 relative">
            {/* Top washi tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-40 h-6 tape-strip-blue rotate-[-1deg]"></div>

            {/* Top Grid: Skill Gaps and Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b-2 border-ink/30">
              <div className="border-2 border-ink bg-paper-pink p-4 font-hand wobbly-card shadow-sketchSm">
                <div className="text-sketch-red text-xs uppercase font-bold mb-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" strokeWidth={2.5} />
                  <span>Detected Skill Gaps</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {reasoning.skillGaps.map((gap, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 border border-ink text-xs font-bold bg-white text-ink rounded-full"
                    >
                      {gap}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-2 border-ink bg-paper-yellow p-4 font-hand wobbly-card shadow-sketchSm">
                <div className="text-ink-muted text-xs uppercase font-bold mb-1">
                  Graph Traversal Depth
                </div>
                <div className="font-headline text-2xl font-bold text-ink mt-1">
                  6 Hops Across 8 Tables
                </div>
                <div className="text-xs text-ink-light mt-1">
                  students → skills → project/club/event/research → placements
                </div>
              </div>

              <div className="border-2 border-ink bg-paper-green p-4 font-hand wobbly-card shadow-sketchSm">
                <div className="text-ink-muted text-xs uppercase font-bold mb-1">
                  Graph Match Confidence
                </div>
                <div className="font-headline text-2xl font-bold text-ink mt-1">
                  {reasoning.confidenceScore}% Deterministic
                </div>
                <div className="text-xs text-ink-light mt-1">
                  Zero hallucinated prerequisites
                </div>
              </div>
            </div>

            {/* Step-by-Step Chain of Thought */}
            <div className="font-body text-base space-y-2">
              <div className="font-headline text-lg font-bold text-ink mb-2 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-sketch-blue" strokeWidth={2.5} />
                <span>Genie's Step-by-Step Thought Process:</span>
              </div>
              <div className="bg-white border-2 border-ink p-5 space-y-2 wobbly-card shadow-sketchSm">
                {reasoning.reasoningSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-ink">
                    <span className="font-headline font-bold text-sketch-red text-sm mt-0.5">[{idx + 1}]</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Generated SQL Query in Notebook Box */}
            {reasoning.sqlTrace && (
              <div className="font-body text-base">
                <div className="font-headline text-lg font-bold text-ink mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-sketch-blue" strokeWidth={2.5} />
                  <span>Synthesized Unity Catalog SQL:</span>
                </div>
                <pre className="bg-paper-yellow/50 border-2 border-ink p-5 text-ink overflow-x-auto text-sm leading-relaxed wobbly-card shadow-sketchSm font-mono">
                  <code>{reasoning.sqlTrace}</code>
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

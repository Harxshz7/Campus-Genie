"use strict";
"use client";

import React, { useState } from "react";
import { Terminal, Code, Cpu, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { GenieReasoning } from "@/lib/types";

interface ReasoningInspectorProps {
  reasoning: GenieReasoning;
}

export const ReasoningInspector: React.FC<ReasoningInspectorProps> = ({ reasoning }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section id="reasoning-section" className="w-full bg-background border-b-4 border-pure-black py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toggle Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Cpu className="w-4 h-4 text-pure-black" strokeWidth={1.5} />
              <span>[ INTELLIGENCE LAYER INSPECTION ]</span>
            </div>
            <h3 className="font-headline text-3xl sm:text-4xl font-black text-pure-black mt-2">
              Multi-Hop Graph Reasoning Trace
            </h3>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2.5 border-2 border-pure-black font-mono text-xs font-bold uppercase tracking-wider bg-pure-white text-pure-black hover-invert flex items-center gap-2 duration-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-pure-black focus-visible:outline-offset-2"
          >
            <span>{isOpen ? "Collapse Trace" : "Expand Trace"}</span>
            {isOpen ? <ChevronUp className="w-4 h-4" strokeWidth={1.5} /> : <ChevronDown className="w-4 h-4" strokeWidth={1.5} />}
          </button>
        </div>

        {isOpen && (
          <div className="border-4 border-pure-black bg-mono-900 text-pure-white p-6 sm:p-8 space-y-6">
            {/* Top Grid: Skill Gaps and Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-mono-700">
              <div className="border border-mono-700 bg-pure-black p-5 font-mono">
                <div className="text-mono-400 text-xs uppercase font-bold mb-1.5 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
                  <span>Identified Skill Gaps</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {reasoning.skillGaps.map((gap, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 border border-pure-white text-xs font-bold bg-mono-900 text-pure-white"
                    >
                      {gap}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-mono-700 bg-pure-black p-5 font-mono">
                <div className="text-mono-400 text-xs uppercase font-bold mb-1.5">
                  Graph Traversal Depth
                </div>
                <div className="font-headline text-3xl font-bold text-pure-white mt-1">
                  6 Hops Across 8 Tables
                </div>
                <div className="text-[11px] text-mono-400 mt-1.5">
                  students → student_skills → skills → project/club/event/research_skills → placements
                </div>
              </div>

              <div className="border border-mono-700 bg-pure-black p-5 font-mono">
                <div className="text-mono-400 text-xs uppercase font-bold mb-1.5">
                  Graph Match Confidence
                </div>
                <div className="font-headline text-3xl font-bold text-pure-white mt-1">
                  {reasoning.confidenceScore}% Deterministic
                </div>
                <div className="text-[11px] text-mono-400 mt-1.5">
                  Zero hallucinated prerequisites
                </div>
              </div>
            </div>

            {/* Step-by-Step Chain of Thought */}
            <div className="font-mono text-xs space-y-2">
              <div className="text-mono-400 uppercase font-bold tracking-wider mb-2 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-pure-white" strokeWidth={1.5} />
                <span>Genie Graph Traversal Log:</span>
              </div>
              <div className="bg-pure-black border border-mono-700 p-5 space-y-2.5 text-mono-200">
                {reasoning.reasoningSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="text-pure-white font-bold">[STEP {idx + 1}]</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Generated SQL Query */}
            {reasoning.sqlTrace && (
              <div className="font-mono text-xs">
                <div className="text-mono-400 uppercase font-bold tracking-wider mb-2 flex items-center gap-2">
                  <Code className="w-4 h-4 text-pure-white" strokeWidth={1.5} />
                  <span>Synthesized Unity Catalog SQL:</span>
                </div>
                <pre className="bg-pure-black border border-mono-700 p-5 text-pure-white overflow-x-auto text-[11px] leading-relaxed">
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

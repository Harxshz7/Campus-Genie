"use strict";
"use client";

import React, { useState } from "react";
import { Terminal, Code, Cpu, ChevronDown, ChevronUp, AlertCircle, Check } from "lucide-react";
import { GenieReasoning } from "@/lib/types";

interface ReasoningInspectorProps {
  reasoning: GenieReasoning;
}

export const ReasoningInspector: React.FC<ReasoningInspectorProps> = ({ reasoning }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section id="reasoning-section" className="w-full bg-white border-b-4 border-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toggle Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-mono-mid flex items-center gap-2">
              <Cpu className="w-4 h-4 text-black" />
              <span>[ INTELLIGENCE LAYER INSPECTION ]</span>
            </div>
            <h3 className="font-serif text-3xl font-black text-black mt-1">
              Multi-Hop Graph Reasoning Trace
            </h3>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 border-2 border-black font-mono text-xs font-bold uppercase tracking-wider bg-white text-black hover-invert flex items-center gap-2"
          >
            <span>{isOpen ? "Collapse Trace" : "Expand Trace"}</span>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {isOpen && (
          <div className="border-4 border-black bg-mono-darker text-white p-6 space-y-6">
            {/* Top Grid: Skill Gaps and Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-mono-dark">
              <div className="border border-mono-dark bg-black p-4 font-mono">
                <div className="text-mono-mid text-xs uppercase font-bold mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Identified Skill Gaps</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {reasoning.skillGaps.map((gap, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 border border-white text-xs font-bold bg-mono-darker text-white"
                    >
                      {gap}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-mono-dark bg-black p-4 font-mono">
                <div className="text-mono-mid text-xs uppercase font-bold mb-1">
                  Graph Traversal Depth
                </div>
                <div className="font-serif text-3xl font-bold text-white mt-1">
                  6 Hops Across 8 Tables
                </div>
                <div className="text-[11px] text-mono-mid mt-1">
                  students → student_skills → skills → project/club/event/research_skills → placements
                </div>
              </div>

              <div className="border border-mono-dark bg-black p-4 font-mono">
                <div className="text-mono-mid text-xs uppercase font-bold mb-1">
                  Graph Match Confidence
                </div>
                <div className="font-serif text-3xl font-bold text-white mt-1">
                  {reasoning.confidenceScore}% Deterministic
                </div>
                <div className="text-[11px] text-mono-mid mt-1">
                  Zero hallucinated prerequisites
                </div>
              </div>
            </div>

            {/* Step-by-Step Chain of Thought */}
            <div className="font-mono text-xs space-y-2">
              <div className="text-mono-mid uppercase font-bold tracking-wider mb-2 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-white" />
                <span>Genie Graph Traversal Log:</span>
              </div>
              <div className="bg-black border border-mono-dark p-4 space-y-2 text-mono-light">
                {reasoning.reasoningSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-white font-bold">[STEP {idx + 1}]</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Generated SQL Query */}
            {reasoning.sqlTrace && (
              <div className="font-mono text-xs">
                <div className="text-mono-mid uppercase font-bold tracking-wider mb-2 flex items-center gap-2">
                  <Code className="w-4 h-4 text-white" />
                  <span>Synthesized Unity Catalog SQL:</span>
                </div>
                <pre className="bg-black border border-mono-dark p-4 text-white overflow-x-auto text-[11px] leading-relaxed">
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

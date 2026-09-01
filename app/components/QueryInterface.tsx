"use strict";
"use client";

import React, { useState } from "react";
import { Send, Sparkles, RefreshCw, ArrowRight, PenTool } from "lucide-react";
import { SAMPLE_PRESETS } from "@/lib/fixtures";
import { WhatIfPreset } from "@/lib/types";

interface QueryInterfaceProps {
  onQuerySubmit: (query: string) => void;
  isLoading: boolean;
  activeQuery: string;
}

export const QueryInterface: React.FC<QueryInterfaceProps> = ({
  onQuerySubmit,
  isLoading,
  activeQuery,
}) => {
  const [inputVal, setInputVal] = useState(
    activeQuery ||
      "I'm Arjun Mehta, a 2nd-year CSE student. I know Java and SQL at an intermediate level. My goal is to become an AI Engineer. What campus opportunities should I pursue and in what order to reach my goal?"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;
    onQuerySubmit(inputVal.trim());
  };

  const handleSelectPreset = (preset: WhatIfPreset) => {
    setInputVal(preset.query);
    onQuerySubmit(preset.query);
  };

  return (
    <section id="query-section" className="w-full bg-paper bg-paper-grain border-b-[2.5px] border-ink py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="font-hand text-sm font-bold text-sketch-blue flex items-center gap-1.5 uppercase tracking-wide">
              <PenTool className="w-4 h-4" strokeWidth={2.5} />
              <span>[ Student Query Console ]</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-ink mt-1">
              Tell Genie What You Know & Where You Want to Go 📝
            </h2>
            <p className="font-body text-lg text-ink-light mt-1 max-w-2xl">
              Type your year, department, current skills, dream career goal, and available hours/week. Genie writes and executes the multi-hop SQL plan for you.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-hand">
            <span className="px-3 py-1 bg-paper-yellowDark border-2 border-ink wobbly-badge font-bold shadow-sketchSm">
              ⚡ 16 Tables Ready
            </span>
          </div>
        </div>

        {/* Preset Selector Chips */}
        <div className="mb-8">
          <div className="font-headline text-base font-bold text-ink mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sketch-red" strokeWidth={2.5} />
            <span>Click a Sample Persona or Scenario to Test:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SAMPLE_PRESETS.map((preset, idx) => {
              const isSelected = inputVal === preset.query;
              const rotations = ["rotate-[-1deg]", "rotate-[1deg]", "rotate-[-0.5deg]", "rotate-[1.5deg]", "rotate-[-1.5deg]", "rotate-[0.5deg]"];
              const bgColors = ["bg-paper-yellow", "bg-paper-green", "bg-paper-pink", "bg-paper-blue", "bg-white", "bg-paper-card"];
              const currentRot = rotations[idx % rotations.length];
              const currentBg = bgColors[idx % bgColors.length];

              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3.5 text-left border-2 border-ink wobbly-card transition-all duration-snappy shadow-sketchSm hover:shadow-sketch hover:translate-x-[-1px] hover:translate-y-[-1px] ${currentRot} ${
                    isSelected
                      ? "bg-sketch-blue text-white"
                      : `${currentBg} text-ink`
                  }`}
                >
                  <div className="font-headline font-bold text-sm flex items-center justify-between">
                    <span>{preset.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-80" strokeWidth={2.5} />
                  </div>
                  <div className={`font-body text-sm mt-1 line-clamp-1 ${isSelected ? "text-paper-light" : "text-ink-light"}`}>
                    {preset.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Form with Wobbly Paper Styling */}
        <form onSubmit={handleSubmit} className="border-[2.5px] border-ink bg-white p-6 sm:p-8 shadow-sketchLg wobbly-card relative">
          {/* Top washi tape accent */}
          <div className="absolute -top-3 left-12 w-32 h-6 tape-strip rotate-[-1deg]"></div>

          <div className="flex flex-col gap-4">
            <label
              htmlFor="genie-prompt"
              className="font-headline text-lg font-bold text-ink flex justify-between items-center"
            >
              <span>Write your prompt here:</span>
              <span className="font-hand text-sm text-sketch-blue font-bold">Natural language query</span>
            </label>

            <div className="relative">
              <textarea
                id="genie-prompt"
                rows={3}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="e.g. I am a 2nd year CSE student who knows Java and SQL. I want to become an AI Engineer. What opportunities should I pursue and in what order?"
                className="w-full p-4 font-body text-xl text-ink bg-paper-card border-2 border-ink wobbly-input focus:bg-white focus:outline-none resize-y transition-colors leading-relaxed"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-2">
              <div className="flex flex-wrap items-center gap-2 font-hand text-sm text-ink-light">
                <span className="font-bold text-ink">💡 Tip:</span>
                <span className="border border-ink px-2.5 py-0.5 bg-paper-yellow wobbly-pill">Mention current skills</span>
                <span className="border border-ink px-2.5 py-0.5 bg-paper-green wobbly-pill">State target role</span>
                <span className="border border-ink px-2.5 py-0.5 bg-paper-pink wobbly-pill">Optional: hours/wk</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setInputVal("")}
                  className="btn-sketch-secondary px-4 py-2.5 font-headline text-base font-bold wobbly-btn"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-sketch-primary px-8 py-3 font-headline text-lg font-bold wobbly-btn flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" strokeWidth={2.5} />
                      <span>Genie Reasoning...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Path</span>
                      <Send className="w-5 h-5" strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

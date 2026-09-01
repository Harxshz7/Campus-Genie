"use strict";
"use client";

import React, { useState } from "react";
import { Send, Sparkles, RefreshCw, ArrowRight } from "lucide-react";
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
    <section id="query-section" className="w-full bg-background border-b-4 border-pure-black py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <span>[ QUERY CONSOLE ]</span>
              <span>•</span>
              <span>GENIE NL-TO-GRAPH INTERFACE</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-pure-black mt-2">
              Describe Your Profile & Goal
            </h2>
            <p className="font-body text-base text-foreground mt-2 max-w-2xl">
              Type your year, current competencies, target company/role, and weekly hour constraints. Genie reasons across 16 tables to synthesize your plan.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 bg-pure-black text-pure-white font-bold">SQL SYNTHESIS READY</span>
            <span className="px-3 py-1.5 border-2 border-pure-black text-pure-black">16 TABLES LOADED</span>
          </div>
        </div>

        {/* Preset Selector Chips */}
        <div className="mb-8">
          <div className="font-mono text-xs font-bold uppercase tracking-wider mb-3 text-pure-black flex items-center gap-2">
            <Sparkles className="w-4 h-4" strokeWidth={1.5} />
            <span>Select Benchmark Persona / Scenario:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SAMPLE_PRESETS.map((preset) => {
              const isSelected = inputVal === preset.query;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-4 text-left border-2 font-mono text-xs duration-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-pure-black focus-visible:outline-offset-2 ${
                    isSelected
                      ? "bg-pure-black text-pure-white border-pure-black"
                      : "bg-pure-white text-pure-black border-pure-black hover-invert"
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>{preset.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-70" strokeWidth={1.5} />
                  </div>
                  <div className={`text-[11px] mt-1.5 line-clamp-1 ${isSelected ? "text-mono-200" : "text-muted-foreground"}`}>
                    {preset.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="border-4 border-pure-black bg-pure-white p-6 sm:p-8">
          <div className="flex flex-col gap-4">
            <label
              htmlFor="genie-prompt"
              className="font-mono text-xs font-bold uppercase tracking-widest text-pure-black flex justify-between items-center"
            >
              <span>Student Prompt / Question</span>
              <span className="text-muted-foreground">Natural Language Prompt</span>
            </label>

            <div className="relative">
              <textarea
                id="genie-prompt"
                rows={3}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="e.g. I am a 2nd year CSE student who knows Java and SQL. I want to become an AI Engineer. What should I do next?"
                className="w-full p-4 font-headline text-lg sm:text-xl text-pure-black bg-mono-50 border-2 border-pure-black focus:bg-pure-white focus:outline-none resize-y focus-visible:outline focus-visible:outline-2 focus-visible:outline-pure-black"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-2">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-foreground">
                <span className="font-bold uppercase">Tips:</span>
                <span className="border border-pure-black px-2.5 py-1 bg-mono-100">Include Current Skills</span>
                <span className="border border-pure-black px-2.5 py-1 bg-mono-100">Include Target Role</span>
                <span className="border border-pure-black px-2.5 py-1 bg-mono-100">Optional: Hours/Week</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setInputVal("")}
                  className="px-4 py-3 font-mono text-xs uppercase border-2 border-pure-black bg-pure-white text-pure-black hover-invert duration-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-pure-black focus-visible:outline-offset-2"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wider bg-pure-black text-pure-white border-2 border-pure-black hover-invert-dark flex items-center justify-center gap-2.5 duration-100 transition-colors disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pure-black focus-visible:outline-offset-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" strokeWidth={1.5} />
                      <span>Reasoning Across Graph...</span>
                    </>
                  ) : (
                    <>
                      <span>Traverse Graph</span>
                      <Send className="w-4 h-4" strokeWidth={1.5} />
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

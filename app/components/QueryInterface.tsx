"use strict";
"use client";

import React, { useState } from "react";
import { Send, Sparkles, RefreshCw, User, HelpCircle, ArrowRight } from "lucide-react";
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
    <section id="query-section" className="w-full bg-white border-b-4 border-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-mono-mid flex items-center gap-2">
              <span>[ QUERY CONSOLE ]</span>
              <span>•</span>
              <span>GENIE NL-TO-GRAPH INTERFACE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-black mt-1">
              Describe Your Profile & Goal
            </h2>
            <p className="font-body text-base text-mono-dark mt-1 max-w-2xl">
              Type your year, current competencies, target company/role, and weekly hour constraints. Genie reasons across 16 tables to synthesize your plan.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 bg-black text-white font-bold">SQL SYNTHESIS READY</span>
            <span className="px-2.5 py-1 border-2 border-black text-black">16 TABLES LOADED</span>
          </div>
        </div>

        {/* Preset Selector Chips */}
        <div className="mb-6">
          <div className="font-mono text-xs font-bold uppercase tracking-wider mb-2 text-black flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Select Benchmark Persona / Scenario:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {SAMPLE_PRESETS.map((preset) => {
              const isSelected = inputVal === preset.query;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3 text-left border-2 font-mono text-xs transition-all ${
                    isSelected
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black hover-invert"
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>{preset.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-70" />
                  </div>
                  <div className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? "text-mono-light" : "text-mono-mid"}`}>
                    {preset.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="border-4 border-black bg-white p-4 sm:p-6">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="genie-prompt"
              className="font-mono text-xs font-bold uppercase tracking-widest text-black flex justify-between items-center"
            >
              <span>Student Prompt / Question</span>
              <span className="text-mono-mid">Natural Language Prompt</span>
            </label>

            <div className="relative">
              <textarea
                id="genie-prompt"
                rows={3}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="e.g. I am a 2nd year CSE student who knows Java and SQL. I want to become an AI Engineer. What should I do next?"
                className="w-full p-4 font-serif text-lg text-black bg-mono-offwhite border-2 border-black focus:bg-white focus:outline-none resize-y"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-2">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-mono-dark">
                <span className="font-bold uppercase">Tips:</span>
                <span className="border border-black px-2 py-0.5 bg-mono-light">Include Current Skills</span>
                <span className="border border-black px-2 py-0.5 bg-mono-light">Include Target Role</span>
                <span className="border border-black px-2 py-0.5 bg-mono-light">Optional: Hours/Week</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setInputVal("")}
                  className="px-4 py-3 font-mono text-xs uppercase border-2 border-black bg-white text-black hover-invert"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider bg-black text-white border-2 border-black hover-invert-dark flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Reasoning Across Graph...</span>
                    </>
                  ) : (
                    <>
                      <span>Traverse Graph</span>
                      <Send className="w-4 h-4" />
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

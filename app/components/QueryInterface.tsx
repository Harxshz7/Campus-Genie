'use client';

import React, { useState } from 'react';
import { Send, Sparkles, RefreshCw, Zap, Bot, Database, UserCheck, Layers } from 'lucide-react';
import { GenieResponse } from '@/lib/types';
import { OpportunityCard } from './OpportunityCard';

interface QueryInterfaceProps {
  onRunQuery: (query: string, isWhatIf?: boolean) => Promise<GenieResponse>;
  response: GenieResponse | null;
  isLoading: boolean;
}

export function QueryInterface({ onRunQuery, response, isLoading }: QueryInterfaceProps) {
  const [inputQuery, setInputQuery] = useState('');

  const goldenQuestion = "I'm Arjun Mehta, a 2nd-year CSE student. I know Java and SQL. I want to become an AI Engineer. What campus opportunities should I pursue and in what order?";

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const queryToRun = inputQuery.trim() || goldenQuestion;
    const isWhatIf = queryToRun.toLowerCase().includes('what if') || queryToRun.toLowerCase().includes('hour');
    await onRunQuery(queryToRun, isWhatIf);
  };

  const handlePresetClick = async (presetText: string, isWhatIf: boolean = false) => {
    setInputQuery(presetText);
    await onRunQuery(presetText, isWhatIf);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 px-4 sm:px-6" id="query-interface">
      {/* Student Profile Ribbon */}
      <div className="bg-[#fef3c7] border-3 border-[#2d2d2d] wobbly-md sketch-shadow p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-white border-2 border-[#2d2d2d] rounded-full flex items-center justify-center font-heading font-bold text-xl text-[#2d2d2d] shadow-sm shrink-0">
            AM
          </div>
          <div>
            <div className="font-heading font-bold text-xl text-[#2d2d2d] flex items-center gap-2.5">
              <span>Arjun Mehta</span>
              <span className="text-xs px-2.5 py-0.5 bg-white border border-[#2d2d2d] rounded-full font-sans font-semibold">
                GPA 8.5
              </span>
            </div>
            <p className="text-sm font-hand text-[#2d2d2d]/85">
              Year 2 CSE Student • Current Skills: <strong>Java (L3)</strong>, <strong>SQL (L3)</strong>, Git (L2), Linux (L2)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold bg-white px-4 py-2 border-2 border-[#2d2d2d] wobbly-pill sketch-shadow-sm">
          <span className="text-[#ff4d4d]">Target Placement:</span>
          <span className="text-[#2d2d2d]">AI Engineer (TechCorp • ₹18 LPA)</span>
        </div>
      </div>

      {/* Query Form Input Section */}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            rows={3}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={`e.g. "${goldenQuestion}"`}
            disabled={isLoading}
            className="w-full p-5 text-xl font-hand bg-white border-3 border-[#2d2d2d] wobbly-md sketch-shadow text-[#2d2d2d] placeholder-[#2d2d2d]/40 focus:border-[#2d5da1] focus:ring-0 resize-none shadow-inner leading-relaxed"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="sketch-btn absolute bottom-5 right-5 px-7 py-3 bg-[#2d5da1] text-white font-heading font-bold text-lg border-2 border-[#2d2d2d] wobbly-sm sketch-shadow-sm hover:bg-[#234b82] flex items-center gap-2.5 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" strokeWidth={2.5} />
            )}
            <span>{isLoading ? 'Reasoning...' : 'Ask Genie'}</span>
          </button>
        </div>

        {/* Quick Shortcut Chips */}
        <div className="flex flex-wrap gap-2.5 items-center text-xs sm:text-sm font-bold pt-1">
          <span className="text-[#2d2d2d]/75 font-hand flex items-center gap-1.5 mr-1">
            <Zap className="h-4 w-4 text-[#ff4d4d]" strokeWidth={2.5} /> Quick Demo Queries:
          </span>

          <button
            type="button"
            onClick={() => handlePresetClick(goldenQuestion, false)}
            className="px-3.5 py-1.5 bg-white hover:bg-[#fef3c7] border-2 border-[#2d2d2d] wobbly-pill transition-colors cursor-pointer sketch-shadow-sm"
          >
            ⭐ Golden Path: AI Engineer
          </button>

          <button
            type="button"
            onClick={() => handlePresetClick("Priya Sharma is a 2nd-year CSE student who knows HTML/CSS and JavaScript. She wants to become a Product Manager. What is her best opportunity path?", false)}
            className="px-3.5 py-1.5 bg-[#fce7f3] hover:bg-[#fbcfe8] text-[#2d2d2d] border-2 border-[#2d2d2d] wobbly-pill transition-colors cursor-pointer sketch-shadow-sm"
          >
            👩‍💻 Priya Sharma → Product Manager
          </button>

          <button
            type="button"
            onClick={() => handlePresetClick("What if Arjun only has 5 hours per week available?", true)}
            className="px-3.5 py-1.5 bg-[#e0f2fe] hover:bg-[#bae6fd] text-[#2d5da1] border-2 border-[#2d2d2d] wobbly-pill transition-colors cursor-pointer sketch-shadow-sm"
          >
            ⏱️ What if 5 hrs/week constraint?
          </button>
        </div>
      </form>

      {/* LOADING STATE — Shown during reasoning trace polling */}
      {isLoading && (
        <div className="p-8 bg-[#e0f2fe]/60 border-3 border-[#2d2d2d] wobbly-md sketch-shadow text-center space-y-4 animate-pulse">
          <div className="h-14 w-14 bg-white border-2 border-[#2d2d2d] wobbly-sm flex items-center justify-center text-[#2d5da1] mx-auto">
            <RefreshCw className="h-7 w-7 animate-spin" strokeWidth={2.5} />
          </div>
          <h4 className="font-heading font-bold text-2xl text-[#2d2d2d]">
            Databricks Genie is Reasoning Across 16 Catalog Tables... 🧠
          </h4>
          <p className="text-base font-hand text-[#2d2d2d]/80 max-w-lg mx-auto">
            Polling message execution status • Evaluating prerequisites • Multi-hop skill mapping
          </p>
        </div>
      )}

      {/* EMPTY STATE — Shown clean on load before user asks any question */}
      {!response && !isLoading && (
        <div className="p-10 bg-[#fdfbf7] border-3 border-dashed border-[#2d2d2d]/40 wobbly-md text-center space-y-4">
          <div className="h-14 w-14 bg-[#fef3c7] border-2 border-[#2d2d2d] wobbly-sm flex items-center justify-center text-[#ff4d4d] mx-auto rotate-2 shadow-sm">
            <Bot className="h-7 w-7" strokeWidth={2.5} />
          </div>
          <h4 className="font-heading font-bold text-3xl text-[#2d2d2d]">
            Ready to Discover Your Opportunity Path! 🎯
          </h4>
          <p className="text-base font-hand text-[#2d2d2d]/80 max-w-xl mx-auto leading-relaxed">
            Click the <strong className="bg-[#fef3c7] px-1.5 py-0.5 border-b border-[#2d2d2d]">"⭐ Golden Path: AI Engineer"</strong> chip above or type any goal in the box to initiate multi-hop Databricks Genie reasoning across 16 connected tables!
          </p>
        </div>
      )}

      {/* Genie Response Section — Shown only after question is asked */}
      {response && !isLoading && (
        <div className="space-y-8 pt-4 border-t-3 border-[#2d2d2d]/20">
          {/* Explanation Banner */}
          <div className="p-6 md:p-8 bg-white border-3 border-[#2d2d2d] wobbly-md sketch-shadow space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b-2 border-[#2d2d2d]/10">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-[#ff4d4d]" strokeWidth={2.5} />
                <span className="font-heading font-bold text-xl md:text-2xl text-[#2d2d2d]">
                  Genie Intelligence Reasoning Trace
                </span>
                
                {/* PROMINENT DATABRICKS REAL GENIE / FIXTURE BADGE */}
                <span
                  className={`text-xs font-bold px-3.5 py-1.5 border-2 border-[#2d2d2d] wobbly-pill sketch-shadow-sm flex items-center gap-1.5 ${
                    response.source === 'genie'
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-purple-100 text-purple-900'
                  }`}
                >
                  {response.source === 'genie' ? (
                    <>
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                      <span>✨ Real Genie (Databricks Live)</span>
                    </>
                  ) : (
                    <>
                      <Database className="h-3.5 w-3.5 text-purple-700" strokeWidth={2.5} />
                      <span>🎯 Graph Intelligence Mode</span>
                    </>
                  )}
                </span>
              </div>

              {response.placementTarget && (
                <span className="text-xs font-bold px-3.5 py-1.5 bg-[#dcfce7] border-2 border-[#2d2d2d] wobbly-pill text-emerald-900">
                  🎯 Goal Target: {response.placementTarget.company} ({response.placementTarget.role} • ₹{response.placementTarget.packageLpa} LPA)
                </span>
              )}
            </div>

            <p className="text-lg md:text-xl font-hand text-[#2d2d2d]/90 leading-relaxed whitespace-pre-line">
              {response.explanation}
            </p>
          </div>

          {/* Opportunity Path Cards Grid */}
          {response.steps && response.steps.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#2d2d2d] flex items-center gap-3">
                  <span>🗺️ Sequenced Opportunity Path</span>
                  <span className="text-xs font-hand font-bold px-3 py-1 bg-[#fce7f3] border-2 border-[#2d2d2d] wobbly-pill">
                    {response.steps.length} Steps Generated
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {response.steps.map((step, idx) => (
                  <OpportunityCard key={idx} step={step} index={idx} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

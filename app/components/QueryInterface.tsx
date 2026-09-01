'use client';

import React, { useState } from 'react';
import { Send, Sparkles, User, RefreshCw, Zap, HelpCircle } from 'lucide-react';
import { GenieResponse } from '@/lib/types';
import { OpportunityCard } from './OpportunityCard';

interface QueryInterfaceProps {
  onRunQuery: (query: string, isWhatIf?: boolean) => Promise<GenieResponse>;
  initialResponse: GenieResponse;
  isLoading: boolean;
}

export function QueryInterface({ onRunQuery, initialResponse, isLoading }: QueryInterfaceProps) {
  const [inputQuery, setInputQuery] = useState('');
  const [response, setResponse] = useState<GenieResponse>(initialResponse);

  const goldenQuestion = "I'm Arjun Mehta, a 2nd-year CSE student. I know Java and SQL. I want to become an AI Engineer. What campus opportunities should I pursue and in what order?";

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const queryToRun = inputQuery.trim() || goldenQuestion;
    const isWhatIf = queryToRun.toLowerCase().includes('what if') || queryToRun.toLowerCase().includes('hour');
    const newRes = await onRunQuery(queryToRun, isWhatIf);
    setResponse(newRes);
  };

  const handlePresetClick = async (presetText: string, isWhatIf: boolean = false) => {
    setInputQuery(presetText);
    const newRes = await onRunQuery(presetText, isWhatIf);
    setResponse(newRes);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8" id="query-interface">
      {/* Student Context Ribbon */}
      <div className="bg-[#fef3c7] border-2 border-[#2d2d2d] wobbly-md sketch-shadow p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-white border-2 border-[#2d2d2d] rounded-full flex items-center justify-center font-heading font-bold text-lg text-[#2d2d2d]">
            AM
          </div>
          <div>
            <div className="font-heading font-bold text-lg text-[#2d2d2d] flex items-center gap-2">
              Arjun Mehta
              <span className="text-xs px-2 py-0.5 bg-white border border-[#2d2d2d] rounded-full font-sans">
                GPA 8.5
              </span>
            </div>
            <p className="text-xs font-hand text-[#2d2d2d]/80">
              Year 2 CSE Student • Current Skills: <strong>Java (L3)</strong>, <strong>SQL (L3)</strong>, Git (L2), Linux (L2)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold bg-white px-3 py-1.5 border-2 border-[#2d2d2d] wobbly-pill">
          <span className="text-[#ff4d4d]">Target Goal:</span>
          <span className="text-[#2d2d2d]">AI Engineer (TechCorp ₹18 LPA)</span>
        </div>
      </div>

      {/* Query Form Input */}
      <form onSubmit={handleFormSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            rows={3}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={`e.g. "${goldenQuestion}"`}
            disabled={isLoading}
            className="w-full p-4 text-lg font-hand bg-white border-3 border-[#2d2d2d] wobbly-md sketch-shadow text-[#2d2d2d] placeholder-[#2d2d2d]/40 focus:border-[#2d5da1] focus:ring-0 resize-none shadow-inner"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="sketch-btn absolute bottom-4 right-4 px-6 py-2.5 bg-[#2d5da1] text-white font-heading font-bold text-base border-2 border-[#2d2d2d] wobbly-sm sketch-shadow-sm hover:bg-[#234b82] flex items-center gap-2 cursor-pointer disabled:opacity-50"
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
        <div className="flex flex-wrap gap-2 items-center text-xs font-bold">
          <span className="text-[#2d2d2d]/70 font-hand flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-[#ff4d4d]" strokeWidth={2.5} /> Quick Golden Queries:
          </span>

          <button
            type="button"
            onClick={() => handlePresetClick(goldenQuestion, false)}
            className="px-3 py-1 bg-white hover:bg-[#fef3c7] border-2 border-[#2d2d2d] wobbly-pill transition-colors cursor-pointer"
          >
            ⭐ Golden Path: AI Engineer
          </button>

          <button
            type="button"
            onClick={() => handlePresetClick("What if Arjun only has 5 hours per week available?", true)}
            className="px-3 py-1 bg-[#e0f2fe] hover:bg-[#bae6fd] text-[#2d5da1] border-2 border-[#2d2d2d] wobbly-pill transition-colors cursor-pointer"
          >
            ⏱️ What if 5 hrs/week constraint?
          </button>
        </div>
      </form>

      {/* Genie Response Section */}
      <div className="space-y-6 pt-4">
        {/* Explanation Banner */}
        <div className="p-5 bg-white border-3 border-[#2d2d2d] wobbly-md sketch-shadow space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-base font-heading font-bold text-[#2d2d2d]">
              <Sparkles className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.5} />
              <span>Genie Intelligence Reasoning Trace</span>
            </div>
            {response.placementTarget && (
              <span className="text-xs font-bold px-3 py-1 bg-[#dcfce7] border-2 border-[#2d2d2d] wobbly-pill text-emerald-800">
                🎯 Goal Target: {response.placementTarget.company} ({response.placementTarget.role} • ₹{response.placementTarget.packageLpa} LPA)
              </span>
            )}
          </div>
          <p className="text-base font-hand text-[#2d2d2d]/90 leading-relaxed">
            {response.explanation}
          </p>
        </div>

        {/* Opportunity Path Sticky Note Cards Grid */}
        <div className="space-y-6">
          <h3 className="font-heading font-bold text-2xl text-[#2d2d2d] flex items-center gap-2">
            <span>🗺️ Sequenced Opportunity Path</span>
            <span className="text-xs font-hand font-normal px-2.5 py-0.5 bg-[#fce7f3] border border-[#2d2d2d] rounded-full">
              {response.steps.length} Steps Found
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {response.steps.map((step, idx) => (
              <OpportunityCard key={idx} step={step} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

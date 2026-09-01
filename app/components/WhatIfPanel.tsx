'use client';

import React, { useState } from 'react';
import { RefreshCw, Sparkles, Send } from 'lucide-react';
import { GenieResponse } from '@/lib/types';

interface WhatIfPanelProps {
  onRunWhatIf: (constraintText: string) => Promise<GenieResponse>;
  isLoading: boolean;
}

export function WhatIfPanel({ onRunWhatIf, isLoading }: WhatIfPanelProps) {
  const [customConstraint, setCustomConstraint] = useState('');

  const presetWhatIfs = [
    { label: '⏱️ Only 5 Hours / Week', text: 'What if Arjun only has 5 hours per week available?' },
    { label: '⚡ Already Knows Python (L3)', text: 'If Arjun already knows Python at Level 3, how does his path change?' },
    { label: '🎯 Switch Goal to Data Scientist', text: 'What if Arjun wanted to become a Data Scientist instead of AI Engineer?' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customConstraint.trim()) return;
    onRunWhatIf(customConstraint);
  };

  return (
    <section className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <div className="p-7 bg-[#e0f2fe] border-3 border-[#2d2d2d] wobbly-md sketch-shadow space-y-5 relative">
        {/* Tape Accent */}
        <div className="absolute -top-3.5 left-10 w-28 h-6 bg-white/80 border border-[#2d2d2d]/30 -rotate-2" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 bg-white border-2 border-[#2d2d2d] wobbly-sm flex items-center justify-center text-[#2d5da1] shrink-0">
              <RefreshCw className="h-6 w-6" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#2d2d2d]">
                🔄 "What If?" Re-Planning Engine
              </h3>
              <p className="text-sm font-hand text-[#2d2d2d]/80">
                New constraints re-plan the path instantly! Watch modified steps get <span className="scribble-strikethrough font-bold text-[#ff4d4d]">scribbled out</span> and rewritten.
              </p>
            </div>
          </div>
        </div>

        {/* Preset What-If Chips */}
        <div className="flex flex-wrap gap-3">
          {presetWhatIfs.map((preset, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => onRunWhatIf(preset.text)}
              className="sketch-btn px-4 py-2 bg-white hover:bg-[#fef3c7] text-[#2d2d2d] font-bold text-xs sm:text-sm border-2 border-[#2d2d2d] wobbly-pill cursor-pointer disabled:opacity-50 flex items-center gap-2 sketch-shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-[#ff4d4d]" strokeWidth={2.5} />
              <span>{preset.label}</span>
            </button>
          ))}
        </div>

        {/* Custom Constraint Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
          <input
            type="text"
            value={customConstraint}
            onChange={(e) => setCustomConstraint(e.target.value)}
            placeholder="Type custom constraint (e.g. 'What if I only have 8 hours per week?')..."
            disabled={isLoading}
            className="flex-1 px-5 py-3 bg-white border-2 border-[#2d2d2d] wobbly-sm text-base font-hand text-[#2d2d2d] placeholder-[#2d2d2d]/50 focus:border-[#2d5da1] focus:ring-0 shadow-inner"
          />
          <button
            type="submit"
            disabled={!customConstraint.trim() || isLoading}
            className="sketch-btn px-6 py-3 bg-[#ff4d4d] text-white font-heading font-bold text-base border-2 border-[#2d2d2d] wobbly-sm sketch-shadow-sm hover:bg-[#ff3333] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
          >
            <Send className="h-4 w-4" strokeWidth={2.5} />
            <span>Re-Plan Path</span>
          </button>
        </form>
      </div>
    </section>
  );
}

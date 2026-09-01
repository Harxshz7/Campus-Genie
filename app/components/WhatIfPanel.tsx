'use client';

import React, { useState } from 'react';
import { RefreshCw, Clock, Zap, ShieldAlert, Sparkles } from 'lucide-react';
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
    <section className="max-w-4xl mx-auto py-8">
      <div className="p-6 bg-[#e0f2fe] border-3 border-[#2d2d2d] wobbly-md sketch-shadow space-y-4 relative">
        {/* Tape Accent */}
        <div className="absolute -top-3 left-10 w-24 h-5 bg-white/80 border border-[#2d2d2d]/30 -rotate-2" />

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-white border-2 border-[#2d2d2d] wobbly-sm flex items-center justify-center text-[#2d5da1]">
            <RefreshCw className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-2xl text-[#2d2d2d]">
              🔄 "What If?" Re-Planning Engine
            </h3>
            <p className="text-sm font-hand text-[#2d2d2d]/80">
              New constraints re-plan the path instantly! Watch modified steps get <span className="scribble-strikethrough font-bold text-[#ff4d4d]">scribbled out</span> and rewritten.
            </p>
          </div>
        </div>

        {/* Preset What-If Chips */}
        <div className="flex flex-wrap gap-3">
          {presetWhatIfs.map((preset, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => onRunWhatIf(preset.text)}
              className="sketch-btn px-4 py-2 bg-white hover:bg-[#fef3c7] text-[#2d2d2d] font-bold text-xs border-2 border-[#2d2d2d] wobbly-pill cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#ff4d4d]" strokeWidth={2.5} />
              <span>{preset.label}</span>
            </button>
          ))}
        </div>

        {/* Custom Constraint Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
          <input
            type="text"
            value={customConstraint}
            onChange={(e) => setCustomConstraint(e.target.value)}
            placeholder="Type custom constraint (e.g. 'What if I only have 8 hours?')..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-white border-2 border-[#2d2d2d] wobbly-sm text-sm font-hand text-[#2d2d2d] placeholder-[#2d2d2d]/50 focus:border-[#2d5da1] focus:ring-0"
          />
          <button
            type="submit"
            disabled={!customConstraint.trim() || isLoading}
            className="sketch-btn px-5 py-2.5 bg-[#ff4d4d] text-white font-heading font-bold text-sm border-2 border-[#2d2d2d] wobbly-sm sketch-shadow-sm hover:bg-[#ff3333] cursor-pointer disabled:opacity-50"
          >
            Re-Plan Path
          </button>
        </form>
      </div>
    </section>
  );
}

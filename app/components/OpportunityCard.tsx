'use client';

import React from 'react';
import { Clock, Unlock, CheckCircle2, AlertCircle, ArrowRight, Bookmark } from 'lucide-react';
import { OpportunityStep } from '@/lib/types';

interface OpportunityCardProps {
  step: OpportunityStep;
  index: number;
}

export function OpportunityCard({ step, index }: OpportunityCardProps) {
  // Sticky Note Background Colors
  const bgColors: Record<string, string> = {
    yellow: 'bg-[#fef3c7]',
    cyan: 'bg-[#e0f2fe]',
    pink: 'bg-[#fce7f3]',
    mint: 'bg-[#dcfce7]',
  };

  const noteColorClass = bgColors[step.noteColor || 'yellow'] || bgColors.yellow;

  // Slight random rotation for hand-drawn index card feel
  const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2'];
  const rotationClass = rotations[index % rotations.length];

  return (
    <div className={`relative p-6 border-2 border-[#2d2d2d] wobbly-md sketch-shadow transition-transform hover:-translate-y-1 ${noteColorClass} ${rotationClass}`}>
      {/* Top Tape Decoration */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/70 border border-[#2d2d2d]/30 rotate-2 shadow-xs" />

      {/* Thumbtack Icon in Top Right */}
      <div className="absolute top-3 right-3 text-[#ff4d4d]">
        <Bookmark className="h-5 w-5 fill-[#ff4d4d]" strokeWidth={2.5} />
      </div>

      {/* Card Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="font-heading font-bold text-sm px-3 py-0.5 bg-white border-2 border-[#2d2d2d] wobbly-pill sketch-shadow-sm text-[#2d2d2d]">
          Step {step.stepNumber}
        </span>
        <span className="font-bold text-xs px-2.5 py-0.5 bg-[#2d2d2d] text-white rounded-md uppercase tracking-wider">
          {step.type}
        </span>
        {step.isModified && (
          <span className="font-bold text-xs px-2.5 py-0.5 bg-[#ff4d4d] text-white border border-[#2d2d2d] rounded-md animate-pulse">
            ✏️ Re-Planned Step
          </span>
        )}
      </div>

      {/* Title with Scribble-out if modified */}
      <div className="mb-3">
        {step.isModified && step.originalTitle && (
          <div className="mb-1 text-xs text-[#ff4d4d] font-bold">
            <span className="scribble-strikethrough font-mono">{step.originalTitle}</span>
          </div>
        )}
        <h3 className="font-heading font-bold text-2xl text-[#2d2d2d]">
          {step.title}
        </h3>
      </div>

      {/* Card Details */}
      <div className="space-y-2 text-sm text-[#2d2d2d]/90 font-hand">
        {/* Why it fits */}
        <div className="flex items-start gap-2 bg-white/60 p-2.5 rounded-lg border border-[#2d2d2d]/20">
          <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" strokeWidth={2.5} />
          <div>
            <strong className="font-bold text-[#2d2d2d]">Why this fits: </strong>
            <span>{step.whyFits}</span>
          </div>
        </div>

        {/* Prerequisites & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-center gap-2 bg-white/60 p-2 rounded-lg border border-[#2d2d2d]/20">
            <AlertCircle className="h-4 w-4 text-[#2d5da1] shrink-0" strokeWidth={2.5} />
            <span className="truncate">
              <strong>Prereqs: </strong>{step.prerequisites}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/60 p-2 rounded-lg border border-[#2d2d2d]/20">
            <Clock className="h-4 w-4 text-[#ff4d4d] shrink-0" strokeWidth={2.5} />
            <span>
              <strong>Commitment: </strong>{step.weeklyHours > 0 ? `${step.weeklyHours} hrs/wk` : 'Flexible'}
            </span>
          </div>
        </div>

        {/* What it unlocks */}
        <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border-2 border-[#2d2d2d]/30 font-bold">
          <Unlock className="h-4 w-4 text-[#2d5da1] shrink-0 mt-0.5" strokeWidth={2.5} />
          <div>
            <span className="text-[#2d5da1]">What it Unlocks: </span>
            <span>{step.unlocks}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

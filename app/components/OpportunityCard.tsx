'use client';

import React from 'react';
import { Clock, Unlock, CheckCircle2, AlertCircle, Bookmark, MapPin, GraduationCap, Trophy, Code2 } from 'lucide-react';
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

  // Slight rotation for hand-drawn index card feel
  const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2'];
  const rotationClass = rotations[index % rotations.length];

  return (
    <div className={`relative p-7 border-3 border-[#2d2d2d] wobbly-md sketch-shadow transition-all duration-200 hover:-translate-y-1.5 flex flex-col justify-between ${noteColorClass} ${rotationClass}`}>
      {/* Top Tape Decoration */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/90 border border-[#2d2d2d]/40 rotate-2 shadow-xs pointer-events-none" />

      {/* Thumbtack Icon in Top Right */}
      <div className="absolute top-4 right-4 text-[#ff4d4d]">
        <Bookmark className="h-5 w-5 fill-[#ff4d4d]" strokeWidth={2.5} />
      </div>

      <div className="space-y-4">
        {/* Card Header Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-heading font-bold text-sm px-3.5 py-1 bg-white border-2 border-[#2d2d2d] wobbly-pill sketch-shadow-sm text-[#111111]">
            Step {step.stepNumber}
          </span>
          <span className="font-sans font-bold text-xs px-3 py-1 bg-[#111111] text-white rounded-md uppercase tracking-wider">
            {step.type}
          </span>
          {step.isModified && (
            <span className="font-sans font-bold text-xs px-2.5 py-1 bg-[#ff4d4d] text-white border border-[#2d2d2d] rounded-md animate-pulse">
              ✏️ Re-Planned
            </span>
          )}
        </div>

        {/* Title */}
        <div>
          {step.isModified && step.originalTitle && (
            <div className="mb-1 text-xs text-[#ff4d4d] font-bold">
              <span className="scribble-strikethrough font-mono">{step.originalTitle}</span>
            </div>
          )}
          <h3 className="font-heading font-bold text-2xl text-[#111111] leading-snug tracking-tight">
            {step.title}
          </h3>
        </div>

        {/* Extended Metadata Ribbon (Mentor, Location, Reward) */}
        <div className="space-y-2 text-xs font-sans font-medium text-[#111111]">
          {step.mentorOrSupervisor && (
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#2d2d2d]/40 shadow-xs">
              <GraduationCap className="h-4 w-4 text-[#2d5da1] shrink-0" strokeWidth={2.5} />
              <span className="text-[#111111]"><strong className="font-bold">Mentor/Supervisor: </strong>{step.mentorOrSupervisor}</span>
            </div>
          )}

          {step.locationOrDept && (
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#2d2d2d]/40 shadow-xs">
              <MapPin className="h-4 w-4 text-[#ff4d4d] shrink-0" strokeWidth={2.5} />
              <span className="text-[#111111]"><strong className="font-bold">Location/Dept: </strong>{step.locationOrDept}</span>
            </div>
          )}

          {step.stipendOrPackage && (
            <div className="flex items-center gap-2 bg-[#dcfce7] text-emerald-950 px-3 py-1.5 rounded-lg border-2 border-[#2d2d2d]/40 font-bold shadow-xs">
              <Trophy className="h-4 w-4 text-emerald-700 shrink-0" strokeWidth={2.5} />
              <span><strong>Reward/Package: </strong>{step.stipendOrPackage}</span>
            </div>
          )}
        </div>

        {/* Card Core Details */}
        <div className="space-y-3 text-sm font-sans text-[#111111]">
          {/* Why it fits */}
          <div className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-[#2d2d2d]/40 shadow-xs leading-relaxed">
            <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" strokeWidth={2.5} />
            <div>
              <strong className="font-bold text-[#111111]">Why this fits: </strong>
              <span className="text-[#2d2d2d]">{step.whyFits}</span>
            </div>
          </div>

          {/* Prerequisites & Commitment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-[#2d2d2d]/40 shadow-xs">
              <AlertCircle className="h-4 w-4 text-[#2d5da1] shrink-0" strokeWidth={2.5} />
              <span className="truncate text-xs text-[#111111]">
                <strong className="font-bold">Prereqs: </strong>{step.prerequisites}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-[#2d2d2d]/40 shadow-xs">
              <Clock className="h-4 w-4 text-[#ff4d4d] shrink-0" strokeWidth={2.5} />
              <span className="text-xs text-[#111111]">
                <strong className="font-bold">Time: </strong>{step.weeklyHours > 0 ? `${step.weeklyHours} hrs/wk` : 'Flexible'}
              </span>
            </div>
          </div>

          {/* Tech Stack Pills */}
          {step.techStack && step.techStack.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="text-xs font-bold text-[#111111] flex items-center gap-1 font-sans">
                <Code2 className="h-4 w-4 text-[#2d5da1]" strokeWidth={2.5} />
                <span>Technologies & Skills Taught:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {step.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-sans font-bold px-2.5 py-1 bg-white border-2 border-[#2d2d2d] rounded-md sketch-shadow-sm text-[#111111]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* What it unlocks (Bottom Anchored) */}
      <div className="mt-5 flex items-start gap-2.5 bg-white p-3.5 rounded-lg border-2 border-[#2d2d2d] font-sans font-bold text-xs sm:text-sm text-[#111111] sketch-shadow-sm">
        <Unlock className="h-4.5 w-4.5 text-[#2d5da1] shrink-0 mt-0.5" strokeWidth={2.5} />
        <div>
          <span className="text-[#2d5da1]">Unlocks: </span>
          <span className="text-[#111111]">{step.unlocks}</span>
        </div>
      </div>
    </div>
  );
}

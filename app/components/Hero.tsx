'use client';

import React from 'react';
import { Sparkles, Compass, ArrowRight } from 'lucide-react';

interface HeroProps {
  onStartChat: () => void;
}

export function Hero({ onStartChat }: HeroProps) {
  return (
    <section className="relative py-12 md:py-16 max-w-4xl mx-auto text-center px-4">
      {/* Decorative Tape on Top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#fef3c7]/80 border border-[#2d2d2d]/20 rotate-1 shadow-sm pointer-events-none" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#fce7f3] border-2 border-[#2d2d2d] wobbly-pill sketch-shadow-sm -rotate-1 mb-4">
        <Compass className="h-4 w-4 text-[#ff4d4d]" strokeWidth={2.5} />
        <span className="text-xs font-bold uppercase tracking-wider text-[#2d2d2d]">
          Databricks Genie Powered Platform
        </span>
      </div>

      {/* Main Handwritten Headline */}
      <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-[#2d2d2d] leading-tight mb-4">
        Stop guessing your campus path. <br className="hidden sm:inline" />
        Let <span className="underline decoration-wavy decoration-[#ff4d4d] underline-offset-8">Genie</span> connect your goals! 🎯
      </h1>

      {/* Problem Statement */}
      <p className="text-lg md:text-xl text-[#2d2d2d]/85 max-w-2xl mx-auto mb-8 leading-relaxed font-hand">
        Campus information is trapped in silos — courses, clubs, research, hackathons, and placements.
        Tell Genie what you know & what you want, and watch it generate a personalized <strong className="bg-[#fef3c7] px-1 border-b-2 border-[#2d2d2d]">Adaptive Opportunity Path</strong> across 16 connected tables!
      </p>

      {/* CTA Button & Hand-Drawn Dashed Arrow */}
      <div className="relative inline-block mt-2">
        <button
          onClick={onStartChat}
          className="sketch-btn px-8 py-4 bg-[#ff4d4d] text-white font-heading font-bold text-2xl border-3 border-[#2d2d2d] wobbly-md sketch-shadow-lg hover:bg-[#ff3333] flex items-center gap-3 mx-auto cursor-pointer"
        >
          <Sparkles className="h-6 w-6" strokeWidth={2.5} />
          <span>Ask Genie Your Goal</span>
          <ArrowRight className="h-6 w-6" strokeWidth={2.5} />
        </button>

        {/* Hand-Drawn Arrow SVG pointing down */}
        <div className="hidden md:block absolute -right-32 top-2 pointer-events-none">
          <svg className="w-28 h-20 text-[#2d5da1]" viewBox="0 0 100 80" fill="none" stroke="currentColor">
            <path
              d="M10,10 Q50,-10 70,40 Q80,60 60,70 M60,70 L75,65 M60,70 L55,55"
              strokeWidth="3"
              strokeDasharray="6,4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-heading text-xs text-[#2d5da1] font-bold block -rotate-6 ml-4">
            Click to Start! 👇
          </span>
        </div>
      </div>
    </section>
  );
}

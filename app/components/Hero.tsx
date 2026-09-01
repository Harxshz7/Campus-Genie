'use client';

import React from 'react';
import { Sparkles, Compass, ArrowRight, Zap, Network, Table } from 'lucide-react';

interface HeroProps {
  onStartChat: () => void;
}

export function Hero({ onStartChat }: HeroProps) {
  return (
    <section className="relative py-14 md:py-20 max-w-6xl mx-auto text-center px-4 sm:px-6">
      {/* Decorative Tape on Top */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-36 h-7 bg-[#fef3c7]/90 border border-[#2d2d2d]/30 rotate-1 shadow-sm pointer-events-none" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#fce7f3] border-2 border-[#2d2d2d] wobbly-pill sketch-shadow-sm -rotate-1 mb-6">
        <Compass className="h-4 w-4 text-[#ff4d4d]" strokeWidth={2.5} />
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2d2d2d]">
          Powered by Databricks Genie & Unity Catalog
        </span>
      </div>

      {/* Main Handwritten Headline */}
      <h1 className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl text-[#2d2d2d] leading-[1.15] mb-6 tracking-tight">
        Stop guessing your campus path. <br className="hidden sm:inline" />
        Let <span className="underline decoration-wavy decoration-[#ff4d4d] underline-offset-8">Genie</span> reason your goals! 🎯
      </h1>

      {/* Subtitle / Problem Statement */}
      <p className="text-xl sm:text-2xl text-[#2d2d2d]/85 max-w-3xl mx-auto mb-10 leading-relaxed font-hand">
        Campus opportunities are trapped in silos — courses, clubs, research, hackathons, and placements.
        Tell Genie what you know & what you want, and watch it reason an <strong className="bg-[#fef3c7] px-1.5 py-0.5 border-b-2 border-[#2d2d2d]">Adaptive Opportunity Path</strong> across 16 connected tables!
      </p>

      {/* CTA Button & Hand-Drawn Arrow */}
      <div className="relative inline-block mb-12">
        <button
          onClick={onStartChat}
          className="sketch-btn px-10 py-5 bg-[#ff4d4d] text-white font-heading font-bold text-2xl md:text-3xl border-3 border-[#2d2d2d] wobbly-md sketch-shadow-lg hover:bg-[#ff3333] flex items-center gap-4 mx-auto cursor-pointer"
        >
          <Sparkles className="h-7 w-7" strokeWidth={2.5} />
          <span>Launch Opportunity Radar</span>
          <ArrowRight className="h-7 w-7" strokeWidth={2.5} />
        </button>

        {/* Hand-Drawn Arrow SVG pointing down */}
        <div className="hidden lg:block absolute -right-36 top-1 pointer-events-none">
          <svg className="w-32 h-24 text-[#2d5da1]" viewBox="0 0 100 80" fill="none" stroke="currentColor">
            <path
              d="M10,10 Q50,-10 70,40 Q80,60 60,70 M60,70 L75,65 M60,70 L55,55"
              strokeWidth="3"
              strokeDasharray="6,4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-heading text-sm text-[#2d5da1] font-bold block -rotate-6 ml-4">
            Click to Start! 👇
          </span>
        </div>
      </div>

      {/* Key Feature Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4">
        <div className="p-4 bg-white border-2 border-[#2d2d2d] wobbly-sm sketch-shadow-sm flex items-center justify-center gap-3">
          <Table className="h-6 w-6 text-[#2d5da1]" strokeWidth={2.5} />
          <div className="text-left">
            <div className="font-heading font-bold text-lg text-[#2d2d2d]">16 Unified Tables</div>
            <div className="text-xs font-hand text-[#2d2d2d]/75">Unity Catalog Managed</div>
          </div>
        </div>

        <div className="p-4 bg-white border-2 border-[#2d2d2d] wobbly-sm sketch-shadow-sm flex items-center justify-center gap-3">
          <Network className="h-6 w-6 text-[#ff4d4d]" strokeWidth={2.5} />
          <div className="text-left">
            <div className="font-heading font-bold text-lg text-[#2d2d2d]">Multi-Hop Graph</div>
            <div className="text-xs font-hand text-[#2d2d2d]/75">Deep Skill Reasoning</div>
          </div>
        </div>

        <div className="p-4 bg-white border-2 border-[#2d2d2d] wobbly-sm sketch-shadow-sm flex items-center justify-center gap-3">
          <Zap className="h-6 w-6 text-amber-500" strokeWidth={2.5} />
          <div className="text-left">
            <div className="font-heading font-bold text-lg text-[#2d2d2d]">What-If Engine</div>
            <div className="text-xs font-hand text-[#2d2d2d]/75">Dynamic Re-Planning</div>
          </div>
        </div>
      </div>
    </section>
  );
}

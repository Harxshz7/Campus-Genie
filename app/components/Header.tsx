'use client';

import React from 'react';
import { Sparkles, Database, ShieldCheck, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  viewState?: 'landing' | 'chat';
  onBackToLanding?: () => void;
}

export function Header({ viewState = 'landing', onBackToLanding }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 px-4 lg:px-8 py-3 bg-[#fdfbf7]/90 backdrop-blur-md border-b-2 border-[#2d2d2d]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          {viewState === 'chat' && onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="sketch-btn px-3 py-1.5 bg-white border-2 border-[#2d2d2d] wobbly-sm text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#fef3c7]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
              <span>Home</span>
            </button>
          )}

          <div className="h-10 w-10 bg-[#fef3c7] border-2 border-[#2d2d2d] wobbly-sm sketch-shadow-sm flex items-center justify-center -rotate-2">
            <Sparkles className="h-6 w-6 text-[#ff4d4d]" strokeWidth={2.5} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl text-[#2d2d2d] tracking-tight">
                Campus Genie
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 bg-[#e0f2fe] border-2 border-[#2d2d2d] wobbly-pill rotate-1 text-[#2d5da1]">
                Opportunity Radar 🎯
              </span>
            </div>
            <p className="text-xs font-hand text-[#2d2d2d]/70 hidden sm:block">
              Databricks Genie Space • Multi-Hop Campus Intelligence
            </p>
          </div>
        </div>

        {/* Right Badges */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-[#2d2d2d] wobbly-sm sketch-shadow-sm">
            <Database className="h-4 w-4 text-[#2d5da1]" strokeWidth={2.5} />
            <span>Catalog: <strong className="text-[#2d5da1]">campus_genie</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#dcfce7] border-2 border-[#2d2d2d] wobbly-sm sketch-shadow-sm rotate-1">
            <ShieldCheck className="h-4 w-4 text-emerald-700" strokeWidth={2.5} />
            <span>16 Tables Connected</span>
          </div>
        </div>
      </div>
    </header>
  );
}

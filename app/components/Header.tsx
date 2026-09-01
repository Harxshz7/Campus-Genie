'use client';

import React from 'react';
import { Sparkles, Database, ShieldCheck, ArrowLeft, Bot } from 'lucide-react';

interface HeaderProps {
  viewState?: 'landing' | 'chat';
  onBackToLanding?: () => void;
}

export function Header({ viewState = 'landing', onBackToLanding }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 px-4 lg:px-10 py-4 bg-[#fdfbf7]/95 backdrop-blur-md border-b-3 border-[#2d2d2d] transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-4">
          {viewState === 'chat' && onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="sketch-btn px-4 py-2 bg-white border-2 border-[#2d2d2d] wobbly-sm text-sm font-bold flex items-center gap-2 cursor-pointer hover:bg-[#fef3c7] shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
              <span>Back Home</span>
            </button>
          )}

          <div className="h-11 w-11 bg-[#fef3c7] border-2 border-[#2d2d2d] wobbly-sm sketch-shadow-sm flex items-center justify-center -rotate-2 shrink-0">
            <Sparkles className="h-6 w-6 text-[#ff4d4d]" strokeWidth={2.5} />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-heading font-bold text-2xl md:text-3xl text-[#2d2d2d] tracking-tight">
                Campus Genie
              </span>
              <span className="text-xs font-bold px-3 py-0.5 bg-[#e0f2fe] border-2 border-[#2d2d2d] wobbly-pill rotate-1 text-[#2d5da1] hidden sm:inline-block">
                Databricks Intelligence 🎯
              </span>
            </div>
            <p className="text-xs font-hand text-[#2d2d2d]/75 hidden md:block">
              Databricks Genie Space • Multi-Hop Opportunity Graph
            </p>
          </div>
        </div>

        {/* Right Badges */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-[#2d2d2d] wobbly-sm sketch-shadow-sm">
            <Database className="h-4 w-4 text-[#2d5da1]" strokeWidth={2.5} />
            <span>Catalog: <strong className="text-[#2d5da1]">campus_genie</strong></span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#dcfce7] border-2 border-[#2d2d2d] wobbly-sm sketch-shadow-sm rotate-1 text-emerald-900">
            <ShieldCheck className="h-4 w-4 text-emerald-700" strokeWidth={2.5} />
            <span>16 Tables Connected</span>
          </div>
        </div>
      </div>
    </header>
  );
}

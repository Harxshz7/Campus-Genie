'use client';

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-[#2d2d2d] bg-[#fef3c7]/60 py-8 px-4 text-center space-y-3 font-hand text-sm text-[#2d2d2d]/80">
      <div className="flex items-center justify-center gap-2 font-heading font-bold text-lg text-[#2d2d2d]">
        <Sparkles className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.5} />
        <span>Campus Genie — Databricks Hackathon Project</span>
      </div>

      <p className="max-w-md mx-auto">
        Built with Databricks Genie Space, Unity Catalog, and Next.js.
        Turning fragmented campus datasets into an Opportunity Graph!
      </p>

      <div className="flex items-center justify-center gap-4 text-xs font-bold pt-2">
        <a
          href="https://github.com/chethanhrx/Campus-Genie"
          target="_blank"
          rel="noopener noreferrer"
          className="wavy-underline text-[#2d5da1] hover:text-[#ff4d4d]"
        >
          GitHub Repository
        </a>
        <span>•</span>
        <a
          href="#query-interface"
          className="wavy-underline text-[#2d5da1] hover:text-[#ff4d4d]"
        >
          Try Golden Prompt
        </a>
      </div>
    </footer>
  );
}

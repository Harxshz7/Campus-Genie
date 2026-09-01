'use client';

import React from 'react';
import { Users, GraduationCap, Briefcase, Award } from 'lucide-react';

export function StakeholderSection() {
  const stakeholders = [
    {
      role: 'Faculty Supervisors',
      icon: GraduationCap,
      color: 'bg-[#fef3c7]',
      quote: '"Which students meet the prerequisites for my NLP research project?"',
      impact: 'Match students to research positions based on verified skill levels.',
      tapeRotate: '-rotate-2',
    },
    {
      role: 'Placement Cell',
      icon: Briefcase,
      color: 'bg-[#e0f2fe]',
      quote: '"Which students are on track for TechCorp AI Engineer roles at ₹18 LPA?"',
      impact: 'Full pipeline visibility into campus skill readiness months before placement season.',
      tapeRotate: 'rotate-2',
    },
    {
      role: 'Club & Event Leads',
      icon: Award,
      color: 'bg-[#fce7f3]',
      quote: '"Who should we recruit for the AI/ML Club workshop?"',
      impact: 'Skill-targeted student recruitment & automatic event prerequisite checks.',
      tapeRotate: '-rotate-1',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-[#2d2d2d] wobbly-pill sketch-shadow-sm text-xs font-bold">
          <Users className="h-4 w-4 text-[#2d5da1]" strokeWidth={2.5} />
          <span>Cross-Functional Intelligence</span>
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#2d2d2d]">
          One Graph. Every Campus Stakeholder. 🏛️
        </h2>
        <p className="text-base sm:text-lg font-hand text-[#2d2d2d]/80 max-w-2xl mx-auto">
          While the student experience is primary, Databricks Genie unlocks cross-functional intelligence for faculty, placement officers, and student leaders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stakeholders.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className={`relative p-7 border-2 border-[#2d2d2d] wobbly-md sketch-shadow space-y-4 ${s.color}`}
            >
              {/* Tape Accent */}
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/90 border border-[#2d2d2d]/30 ${s.tapeRotate}`} />

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white border-2 border-[#2d2d2d] rounded-xl flex items-center justify-center text-[#2d2d2d] shrink-0">
                  <Icon className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <h4 className="font-heading font-bold text-xl text-[#2d2d2d]">{s.role}</h4>
              </div>

              <p className="text-sm font-hand italic text-[#2d2d2d]/90 bg-white/70 p-3 rounded-lg border border-[#2d2d2d]/20 leading-relaxed">
                {s.quote}
              </p>

              <p className="text-sm font-hand text-[#2d2d2d]/85 leading-relaxed">
                {s.impact}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

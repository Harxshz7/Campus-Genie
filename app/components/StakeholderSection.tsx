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
    <section className="max-w-4xl mx-auto py-10 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-[#2d2d2d] wobbly-pill sketch-shadow-sm text-xs font-bold">
          <Users className="h-4 w-4 text-[#2d5da1]" strokeWidth={2.5} />
          <span>Secondary Stakeholder Value</span>
        </div>
        <h2 className="font-heading font-bold text-3xl text-[#2d2d2d]">
          One Graph. Every Campus Stakeholder. 🏛️
        </h2>
        <p className="text-sm font-hand text-[#2d2d2d]/80 max-w-xl mx-auto">
          While the student is primary, Databricks Genie unlocks cross-functional intelligence for faculty, placement officers, and student leaders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stakeholders.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className={`relative p-5 border-2 border-[#2d2d2d] wobbly-md sketch-shadow space-y-3 ${s.color}`}
            >
              {/* Tape Accent */}
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/80 border border-[#2d2d2d]/30 ${s.tapeRotate}`} />

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-white border-2 border-[#2d2d2d] rounded-lg flex items-center justify-center text-[#2d2d2d]">
                  <Icon className="h-4 w-4" strokeWidth={2.5} />
                </div>
                <h4 className="font-heading font-bold text-lg text-[#2d2d2d]">{s.role}</h4>
              </div>

              <p className="text-xs font-hand italic text-[#2d2d2d]/90 bg-white/60 p-2 rounded border border-[#2d2d2d]/20">
                {s.quote}
              </p>

              <p className="text-xs font-hand text-[#2d2d2d]/80">
                {s.impact}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

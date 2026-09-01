"use strict";
"use client";

import React from "react";
import { GenieResponse, OpportunityStep } from "@/lib/types";
import { Clock, CheckCircle2, Unlock, BookOpen, Sparkles, Award } from "lucide-react";

interface OpportunityPathProps {
  response: GenieResponse;
}

export const OpportunityPath: React.FC<OpportunityPathProps> = ({ response }) => {
  const { student, steps, reasoning, isWhatIf, whatIfConstraintApplied } = response;

  const getCardTheme = (type: OpportunityStep["type"], idx: number) => {
    switch (type) {
      case "Project":
        return { bg: "bg-paper-blue", tagBg: "bg-sketch-blue text-white", rot: "rotate-[-1deg]" };
      case "Club":
        return { bg: "bg-paper-yellow", tagBg: "bg-sketch-yellow text-ink", rot: "rotate-[1deg]" };
      case "Workshop":
      case "Bootcamp":
        return { bg: "bg-paper-green", tagBg: "bg-sketch-green text-white", rot: "rotate-[-0.8deg]" };
      case "Research":
        return { bg: "bg-paper-pink", tagBg: "bg-sketch-red text-white", rot: "rotate-[1.2deg]" };
      case "Hackathon":
        return { bg: "bg-paper-card", tagBg: "bg-ink text-white", rot: "rotate-[-1.5deg]" };
      case "Placement":
        return { bg: "bg-paper-yellowDark", tagBg: "bg-sketch-red text-white font-bold", rot: "rotate-[0deg]" };
      default:
        return { bg: "bg-white", tagBg: "bg-ink text-white", rot: "rotate-[0deg]" };
    }
  };

  return (
    <section className="w-full bg-paper bg-paper-grain py-12 sm:py-16 border-b-[2.5px] border-ink">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Summary Note Card */}
        <div className="border-[2.5px] border-ink p-6 sm:p-8 mb-12 bg-paper-yellow shadow-sketchLg wobbly-card relative rotate-[-0.5deg]">
          {/* Top washi tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-6 tape-strip rotate-[1deg]"></div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 font-hand text-sm font-bold text-ink-muted uppercase">
                <span>📋 Personalized Opportunity Roadmap</span>
                {isWhatIf && (
                  <span className="bg-sketch-red text-white px-2 py-0.5 text-xs wobbly-pill font-bold animate-pulse">
                    ✨ What-If Scenario Active
                  </span>
                )}
              </div>
              <h3 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-ink mt-1">
                Target Role: {student.careerGoal} 🎯
              </h3>
              <p className="font-body text-xl text-ink mt-1">
                Sequenced {steps.length}-Step Pathway for <strong className="font-headline font-bold underline decoration-wavy decoration-sketch-blue">{student.name}</strong> (Year {student.year}, {student.department})
              </p>
              {whatIfConstraintApplied && (
                <div className="mt-3 font-hand text-sm bg-sketch-blue text-white px-3 py-1 wobbly-pill inline-block font-bold shadow-sketchSm">
                  Applied Constraint: {whatIfConstraintApplied}
                </div>
              )}
            </div>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto font-hand">
              <div className="border-2 border-ink bg-white p-3 text-center wobbly-card shadow-sketchSm">
                <div className="text-xs text-ink-muted font-bold uppercase">Total Steps</div>
                <div className="font-headline text-2xl font-bold text-ink">{steps.length}</div>
              </div>
              <div className="border-2 border-ink bg-white p-3 text-center wobbly-card shadow-sketchSm">
                <div className="text-xs text-ink-muted font-bold uppercase">Avg Effort</div>
                <div className="font-headline text-2xl font-bold text-ink">{reasoning.totalWeeklyHours}h / wk</div>
              </div>
              <div className="border-2 border-ink bg-white p-3 text-center col-span-2 sm:col-span-1 wobbly-card shadow-sketchSm">
                <div className="text-xs text-ink-muted font-bold uppercase">Timeline</div>
                <div className="font-headline text-2xl font-bold text-ink">~{reasoning.estimatedWeeksToReady} Wks</div>
              </div>
            </div>
          </div>

          {/* Student's Current Skills Badges */}
          <div className="mt-6 pt-5 border-t-2 border-ink/40 flex flex-wrap items-center gap-2 font-hand text-sm">
            <span className="font-bold text-ink">🎒 Starting Skills:</span>
            {student.currentSkills.map((sk) => (
              <span
                key={sk.skill}
                className="px-2.5 py-0.5 bg-white border border-ink text-ink font-bold wobbly-pill shadow-sketchSm"
              >
                {sk.skill} <strong className="text-sketch-blue">[{sk.level}/5]</strong>
              </span>
            ))}
          </div>
        </div>

        {/* Sequenced Pathway List */}
        <div className="space-y-10 relative">
          {steps.map((step, idx) => {
            const isPlacement = step.type === "Placement";
            const theme = getCardTheme(step.type, idx);

            return (
              <div key={step.step} className="relative">
                {/* Hand-drawn squiggly connector between steps */}
                {idx > 0 && (
                  <div className="flex justify-center -mt-6 -mb-4 relative z-0 pointer-events-none">
                    <svg className="w-8 h-10 text-ink" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15 0C8 10 22 20 15 35"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeDasharray="4 3"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10 28L15 36L20 28"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                {/* Index Card / Sticky Note Step */}
                <div
                  className={`border-[2.5px] border-ink ${theme.bg} p-6 sm:p-8 shadow-sketchLg wobbly-card transition-all duration-snappy ${theme.rot} hover:rotate-0 hover:shadow-sketchXl relative z-10`}
                >
                  {/* Decorative Washi Tape or Tack */}
                  {idx % 2 === 0 ? (
                    <div className="absolute -top-3 left-8 w-28 h-6 tape-strip rotate-[1.5deg]"></div>
                  ) : (
                    <div className="absolute -top-2.5 right-8 thumbtack"></div>
                  )}

                  {/* Step Top Bar */}
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-4 pb-3 border-b-2 border-ink/30 font-hand text-base">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-paper-yellowDark border-2 border-ink shadow-sketchSm flex items-center justify-center font-headline text-lg font-bold text-ink">
                        {step.step}
                      </span>
                      <span className="font-headline font-bold text-lg text-ink">
                        {step.durationWeeks || `Step ${step.step}`}
                      </span>
                      <span className={`px-2.5 py-0.5 text-xs font-bold uppercase wobbly-pill border border-ink shadow-sketchSm ${theme.tagBg}`}>
                        {step.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm font-bold text-ink-light">
                      {step.weeklyHours > 0 && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-sketch-blue" strokeWidth={2.5} />
                          <span>{step.weeklyHours}h / week</span>
                        </span>
                      )}
                      {step.organizationOrFaculty && (
                        <span className="hidden sm:inline-block bg-white/70 px-2 py-0.5 border border-ink wobbly-pill">
                          {step.organizationOrFaculty}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Step Body */}
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                    {/* Left: Title & Why Explanation */}
                    <div className="flex-1">
                      <h4 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-ink mb-3">
                        {step.opportunityName}
                      </h4>

                      <div className="p-4 border-2 border-ink bg-white/90 wobbly-card shadow-sketchSm">
                        <div className="font-hand text-xs font-bold text-sketch-red uppercase tracking-wider mb-1 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />
                          <span>Why Genie Picked This:</span>
                        </div>
                        <p className="font-body text-lg text-ink leading-relaxed">
                          {step.why}
                        </p>
                      </div>
                    </div>

                    {/* Right: Prereqs, Skills Gained, Unlocks */}
                    <div className="w-full lg:w-80 space-y-3 font-body text-base">
                      {/* Prerequisites */}
                      <div className="p-3 border-2 border-ink bg-white/90 wobbly-card shadow-sketchSm">
                        <div className="font-headline font-bold text-sm text-ink mb-1 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-sketch-green" strokeWidth={2.5} />
                          <span>Prerequisites Met:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 font-hand text-sm">
                          {step.prerequisites.length > 0 ? (
                            step.prerequisites.map((p, pIdx) => (
                              <span key={pIdx} className="px-2 py-0.5 bg-paper-green border border-ink rounded-full text-ink font-bold">
                                {p}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-ink-muted">Open to all students</span>
                          )}
                        </div>
                      </div>

                      {/* Skills Gained */}
                      <div className="p-3 border-2 border-ink bg-white/90 wobbly-card shadow-sketchSm">
                        <div className="font-headline font-bold text-sm text-ink mb-1 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-sketch-blue" strokeWidth={2.5} />
                          <span>Skills You'll Learn:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 font-hand text-sm">
                          {step.skillsGained.map((sg, sgIdx) => (
                            <span key={sgIdx} className="px-2 py-0.5 bg-paper-yellow border border-ink rounded-full text-ink font-bold">
                              {sg.skill} <strong className="text-sketch-red">[L{sg.level}]</strong>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* What it Unlocks */}
                      <div className="p-3 border-2 border-ink bg-white/90 wobbly-card shadow-sketchSm">
                        <div className="font-headline font-bold text-sm text-ink mb-1 flex items-center gap-1.5">
                          <Unlock className="w-4 h-4 text-sketch-red" strokeWidth={2.5} />
                          <span>What It Unlocks:</span>
                        </div>
                        <p className="text-sm text-ink-light leading-snug">
                          {step.unlocks}
                        </p>
                      </div>

                      {/* Package info if placement */}
                      {step.stipendOrPackage && (
                        <div className="p-3.5 border-2 border-ink bg-paper-yellowDark wobbly-card shadow-sketch font-headline text-center">
                          <div className="text-xs font-bold text-ink uppercase tracking-wider">
                            Offer / Package
                          </div>
                          <div className="text-2xl font-bold text-sketch-red">
                            {step.stipendOrPackage}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* End of Pathway Goal Confirmation */}
        <div className="mt-14 p-8 border-[2.5px] border-ink bg-paper-yellowDark text-ink text-center shadow-sketchLg wobbly-card rotate-[0.5deg]">
          <div className="font-hand text-sm uppercase tracking-widest text-sketch-red font-bold mb-1">
            🎉 Outcome Verified by Databricks Genie
          </div>
          <h4 className="font-headline text-3xl sm:text-4xl font-bold">
            Target Competency Ready: {student.careerGoal}
          </h4>
          <p className="font-body text-xl max-w-2xl mx-auto mt-2 text-ink-light">
            Following this sequenced graph traversal fulfills all required skill levels for recruitment panels and research grants.
          </p>
        </div>
      </div>
    </section>
  );
};

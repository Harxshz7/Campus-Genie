"use strict";
"use client";

import React from "react";
import { GenieResponse, OpportunityStep } from "@/lib/types";
import { Clock, CheckCircle, Unlock, BookOpen } from "lucide-react";

interface OpportunityPathProps {
  response: GenieResponse;
}

export const OpportunityPath: React.FC<OpportunityPathProps> = ({ response }) => {
  const { student, steps, reasoning, isWhatIf, whatIfConstraintApplied } = response;

  const getTypeBadge = (type: OpportunityStep["type"]) => {
    switch (type) {
      case "Project":
        return "bg-pure-white text-pure-black border-2 border-pure-black";
      case "Club":
        return "bg-mono-100 text-pure-black border-2 border-pure-black";
      case "Workshop":
      case "Bootcamp":
        return "bg-mono-900 text-pure-white border-2 border-pure-black";
      case "Research":
        return "bg-pure-black text-pure-white border-2 border-pure-black font-bold";
      case "Hackathon":
        return "bg-pure-white text-pure-black border-2 border-pure-black underline decoration-2";
      case "Placement":
        return "bg-pure-black text-pure-white border-2 border-pure-white font-black tracking-wider";
      default:
        return "bg-pure-white text-pure-black border-2 border-pure-black";
    }
  };

  return (
    <section className="w-full bg-background py-16 sm:py-24 border-b-4 border-pure-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Summary Banner */}
        <div className="border-4 border-pure-black p-6 sm:p-8 mb-12 bg-mono-50">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold text-muted-foreground">
                <span>[ SYNTHESIZED OPPORTUNITY TRAJECTORY ]</span>
                {isWhatIf && (
                  <span className="bg-pure-black text-pure-white px-2 py-0.5 text-[10px] uppercase font-bold">
                    What-If Re-Plan Active
                  </span>
                )}
              </div>
              <h3 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-pure-black mt-2">
                Target: {student.careerGoal}
              </h3>
              <p className="font-body text-base sm:text-lg text-foreground mt-2">
                Personalized {steps.length}-Step Pathway for <strong className="font-headline font-bold">{student.name}</strong> (Year {student.year}, {student.department})
              </p>
              {whatIfConstraintApplied && (
                <div className="mt-3 font-mono text-xs bg-pure-black text-pure-white px-3 py-1.5 inline-block font-semibold">
                  Constraint Applied: {whatIfConstraintApplied}
                </div>
              )}
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto font-mono text-xs">
              <div className="border-2 border-pure-black bg-pure-white p-4 text-center">
                <div className="text-muted-foreground uppercase text-[10px] font-bold">Total Steps</div>
                <div className="font-headline text-3xl font-black">{steps.length}</div>
              </div>
              <div className="border-2 border-pure-black bg-pure-white p-4 text-center">
                <div className="text-muted-foreground uppercase text-[10px] font-bold">Avg Hours / Wk</div>
                <div className="font-headline text-3xl font-black">{reasoning.totalWeeklyHours}h</div>
              </div>
              <div className="border-2 border-pure-black bg-pure-white p-4 text-center col-span-2 sm:col-span-1">
                <div className="text-muted-foreground uppercase text-[10px] font-bold">Estimated Time</div>
                <div className="font-headline text-3xl font-black">~{reasoning.estimatedWeeksToReady} Wks</div>
              </div>
            </div>
          </div>

          {/* Student's Current Skills Tag Cloud */}
          <div className="mt-6 pt-6 border-t-2 border-pure-black flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="font-bold uppercase text-pure-black">Starting Profile Skills:</span>
            {student.currentSkills.map((sk) => (
              <span
                key={sk.skill}
                className="px-2.5 py-1 bg-pure-white border border-pure-black text-pure-black font-medium"
              >
                {sk.skill} <strong className="font-bold">[{sk.level}/5]</strong>
              </span>
            ))}
          </div>
        </div>

        {/* Sequenced Pathway List */}
        <div className="space-y-8 relative">
          {/* Vertical Connecting Rule for Desktop */}
          <div className="hidden md:block absolute left-[39px] top-8 bottom-8 w-1 bg-pure-black z-0"></div>

          {steps.map((step) => {
            const isPlacement = step.type === "Placement";

            return (
              <div
                key={step.step}
                className={`relative z-10 border-4 border-pure-black duration-100 transition-colors ${
                  isPlacement ? "bg-pure-black text-pure-white" : "bg-pure-white text-pure-black"
                }`}
              >
                {/* Step Top Bar */}
                <div
                  className={`px-4 sm:px-6 py-3.5 border-b-2 flex flex-wrap justify-between items-center gap-2 font-mono text-xs ${
                    isPlacement ? "border-pure-white bg-mono-900 text-pure-white" : "border-pure-black bg-mono-100 text-pure-black"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 flex items-center justify-center font-bold text-sm border-2 ${
                        isPlacement ? "bg-pure-white text-pure-black border-pure-white" : "bg-pure-black text-pure-white border-pure-black"
                      }`}
                    >
                      {step.step < 10 ? `0${step.step}` : step.step}
                    </span>
                    <span className="font-bold uppercase tracking-wider">
                      {step.durationWeeks || `Phase ${step.step}`}
                    </span>
                    <span className={`px-2.5 py-0.5 text-[11px] font-bold uppercase ${getTypeBadge(step.type)}`}>
                      {step.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 font-semibold">
                    {step.weeklyHours > 0 && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" strokeWidth={1.5} />
                        <span>{step.weeklyHours} Hours / Week</span>
                      </span>
                    )}
                    {step.organizationOrFaculty && (
                      <span className="hidden sm:inline-block opacity-80">
                        {step.organizationOrFaculty}
                      </span>
                    )}
                  </div>
                </div>

                {/* Step Main Body */}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                    {/* Left: Title and Why Explanation */}
                    <div className="flex-1">
                      <h4 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                        {step.opportunityName}
                      </h4>

                      <div className="space-y-4 font-body text-base">
                        <div
                          className={`p-5 border-2 leading-relaxed ${
                            isPlacement
                              ? "border-pure-white bg-mono-900 text-pure-white"
                              : "border-pure-black bg-mono-50 text-pure-black"
                          }`}
                        >
                          <div className="font-mono text-xs font-bold uppercase tracking-widest mb-1.5 opacity-70">
                            [ WHY THIS OPPORTUNITY ]
                          </div>
                          <p className="text-base sm:text-lg">{step.why}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Prereqs, Skills Gained, Unlocks */}
                    <div className="w-full lg:w-96 space-y-4 font-mono text-xs">
                      {/* Prerequisites */}
                      <div className={`p-4 border-2 ${isPlacement ? "border-pure-white bg-mono-800" : "border-pure-black bg-pure-white"}`}>
                        <div className="font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4" strokeWidth={1.5} />
                          <span>Prerequisites Met:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {step.prerequisites.length > 0 ? (
                            step.prerequisites.map((p, pIdx) => (
                              <span
                                key={pIdx}
                                className={`px-2.5 py-1 border text-[11px] font-medium ${
                                  isPlacement ? "border-pure-white bg-pure-black text-pure-white" : "border-pure-black bg-mono-100 text-pure-black"
                                }`}
                              >
                                {p}
                              </span>
                            ))
                          ) : (
                            <span className="text-[11px] opacity-70">None (Open to All)</span>
                          )}
                        </div>
                      </div>

                      {/* Skills Gained */}
                      <div className={`p-4 border-2 ${isPlacement ? "border-pure-white bg-mono-800" : "border-pure-black bg-pure-white"}`}>
                        <div className="font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                          <span>Skills Acquired / Deepened:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {step.skillsGained.map((sg, sgIdx) => (
                            <span
                              key={sgIdx}
                              className={`px-2.5 py-1 border text-[11px] font-bold ${
                                isPlacement ? "border-pure-white bg-pure-white text-pure-black" : "border-pure-black bg-pure-black text-pure-white"
                              }`}
                            >
                              {sg.skill} [Level {sg.level}]
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* What it Unlocks */}
                      <div className={`p-4 border-2 ${isPlacement ? "border-pure-white bg-mono-800" : "border-pure-black bg-pure-white"}`}>
                        <div className="font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Unlock className="w-4 h-4" strokeWidth={1.5} />
                          <span>What It Unlocks:</span>
                        </div>
                        <p className="font-body text-xs leading-relaxed opacity-90">
                          {step.unlocks}
                        </p>
                      </div>

                      {/* Package info if placement */}
                      {step.stipendOrPackage && (
                        <div className="p-4 border-2 border-pure-white bg-pure-white text-pure-black font-mono">
                          <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                            Compensation / Package
                          </div>
                          <div className="font-headline text-2xl font-black">
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
        <div className="mt-14 p-8 sm:p-10 border-4 border-pure-black bg-pure-black text-pure-white text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-mono-400 mb-2">
            [ OUTCOME VERIFICATION ]
          </div>
          <h4 className="font-headline text-3xl sm:text-4xl font-bold">
            Target Competency Achieved: {student.careerGoal}
          </h4>
          <p className="font-body text-base sm:text-lg max-w-2xl mx-auto mt-3 text-mono-200">
            Following this sequenced graph traversal fulfills 100% of the prerequisite and technical skill requirements required by hiring partners and research labs.
          </p>
        </div>
      </div>
    </section>
  );
};

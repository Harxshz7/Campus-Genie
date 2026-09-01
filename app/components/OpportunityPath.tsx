"use strict";
"use client";

import React from "react";
import { GenieResponse, OpportunityStep } from "@/lib/types";
import { Clock, CheckCircle, Unlock, BookOpen, Briefcase, Award, ArrowDown, UserCheck } from "lucide-react";

interface OpportunityPathProps {
  response: GenieResponse;
}

export const OpportunityPath: React.FC<OpportunityPathProps> = ({ response }) => {
  const { student, steps, reasoning, isWhatIf, whatIfConstraintApplied } = response;

  const getTypeBadge = (type: OpportunityStep["type"]) => {
    switch (type) {
      case "Project":
        return "bg-white text-black border-2 border-black";
      case "Club":
        return "bg-mono-light text-black border-2 border-black";
      case "Workshop":
      case "Bootcamp":
        return "bg-mono-darker text-white border-2 border-black";
      case "Research":
        return "bg-black text-white border-2 border-black font-bold";
      case "Hackathon":
        return "bg-white text-black border-2 border-black underline";
      case "Placement":
        return "bg-black text-white border-2 border-black font-black tracking-wider";
      default:
        return "bg-white text-black border-2 border-black";
    }
  };

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Summary Banner */}
        <div className="border-4 border-black p-6 mb-12 bg-mono-offwhite">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold text-mono-mid">
                <span>[ SYNTHESIZED OPPORTUNITY TRAJECTORY ]</span>
                {isWhatIf && (
                  <span className="bg-black text-white px-2 py-0.5 text-[10px] uppercase font-bold">
                    What-If Re-Plan Active
                  </span>
                )}
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-black text-black mt-1">
                Target: {student.careerGoal}
              </h3>
              <p className="font-body text-base text-black mt-1">
                Personalized {steps.length}-Step Pathway for <strong className="font-serif">{student.name}</strong> (Year {student.year}, {student.department})
              </p>
              {whatIfConstraintApplied && (
                <div className="mt-2 font-mono text-xs bg-black text-white px-3 py-1.5 inline-block font-semibold">
                  Constraint Applied: {whatIfConstraintApplied}
                </div>
              )}
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto font-mono text-xs">
              <div className="border-2 border-black bg-white p-3 text-center">
                <div className="text-mono-mid uppercase text-[10px] font-bold">Total Steps</div>
                <div className="font-serif text-2xl font-black">{steps.length}</div>
              </div>
              <div className="border-2 border-black bg-white p-3 text-center">
                <div className="text-mono-mid uppercase text-[10px] font-bold">Avg Hours / Wk</div>
                <div className="font-serif text-2xl font-black">{reasoning.totalWeeklyHours}h</div>
              </div>
              <div className="border-2 border-black bg-white p-3 text-center col-span-2 sm:col-span-1">
                <div className="text-mono-mid uppercase text-[10px] font-bold">Estimated Time</div>
                <div className="font-serif text-2xl font-black">~{reasoning.estimatedWeeksToReady} Wks</div>
              </div>
            </div>
          </div>

          {/* Student's Current Skills Tag Cloud */}
          <div className="mt-6 pt-6 border-t-2 border-black flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="font-bold uppercase text-black">Starting Profile Skills:</span>
            {student.currentSkills.map((sk) => (
              <span
                key={sk.skill}
                className="px-2.5 py-1 bg-white border border-black text-black font-medium"
              >
                {sk.skill} <strong className="font-bold">[{sk.level}/5]</strong>
              </span>
            ))}
          </div>
        </div>

        {/* Sequenced Pathway List */}
        <div className="space-y-8 relative">
          {/* Vertical Connecting Rule for Desktop */}
          <div className="hidden md:block absolute left-[39px] top-8 bottom-8 w-1 bg-black z-0"></div>

          {steps.map((step, idx) => {
            const isPlacement = step.type === "Placement";

            return (
              <div
                key={step.step}
                className={`relative z-10 border-4 border-black transition-all ${
                  isPlacement ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {/* Step Top Bar */}
                <div
                  className={`px-4 sm:px-6 py-3 border-b-2 flex flex-wrap justify-between items-center gap-2 font-mono text-xs ${
                    isPlacement ? "border-white bg-mono-darker text-white" : "border-black bg-mono-light text-black"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 flex items-center justify-center font-bold text-sm border-2 ${
                        isPlacement ? "bg-white text-black border-white" : "bg-black text-white border-black"
                      }`}
                    >
                      {step.step < 10 ? `0${step.step}` : step.step}
                    </span>
                    <span className="font-bold uppercase tracking-wider">
                      {step.durationWeeks || `Phase ${step.step}`}
                    </span>
                    <span className={`px-2 py-0.5 text-[11px] font-bold uppercase ${getTypeBadge(step.type)}`}>
                      {step.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 font-semibold">
                    {step.weeklyHours > 0 && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
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
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                    {/* Left: Title and Why Explanation */}
                    <div className="flex-1">
                      <h4 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                        {step.opportunityName}
                      </h4>

                      <div className="space-y-3 font-body text-base">
                        <div className={`p-4 border-2 leading-relaxed ${isPlacement ? "border-white bg-mono-darker text-white" : "border-black bg-mono-offwhite text-black"}`}>
                          <div className="font-mono text-xs font-bold uppercase tracking-widest mb-1 opacity-70">
                            [ WHY THIS OPPORTUNITY ]
                          </div>
                          <p>{step.why}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Prereqs, Skills Gained, Unlocks */}
                    <div className="w-full lg:w-96 space-y-4 font-mono text-xs">
                      {/* Prerequisites */}
                      <div className={`p-3 border-2 ${isPlacement ? "border-white bg-mono-dark" : "border-black bg-white"}`}>
                        <div className="font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Prerequisites Met:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {step.prerequisites.length > 0 ? (
                            step.prerequisites.map((p, pIdx) => (
                              <span
                                key={pIdx}
                                className={`px-2 py-0.5 border text-[11px] font-medium ${
                                  isPlacement ? "border-white bg-black text-white" : "border-black bg-mono-light text-black"
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
                      <div className={`p-3 border-2 ${isPlacement ? "border-white bg-mono-dark" : "border-black bg-white"}`}>
                        <div className="font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Skills Acquired / Deepened:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {step.skillsGained.map((sg, sgIdx) => (
                            <span
                              key={sgIdx}
                              className={`px-2 py-0.5 border text-[11px] font-bold ${
                                isPlacement ? "border-white bg-white text-black" : "border-black bg-black text-white"
                              }`}
                            >
                              {sg.skill} [Level {sg.level}]
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* What it Unlocks */}
                      <div className={`p-3 border-2 ${isPlacement ? "border-white bg-mono-dark" : "border-black bg-white"}`}>
                        <div className="font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Unlock className="w-3.5 h-3.5" />
                          <span>What It Unlocks:</span>
                        </div>
                        <p className="font-body text-xs leading-relaxed opacity-90">
                          {step.unlocks}
                        </p>
                      </div>

                      {/* Package info if placement */}
                      {step.stipendOrPackage && (
                        <div className="p-3 border-2 border-white bg-white text-black font-mono">
                          <div className="text-[10px] uppercase font-bold tracking-widest text-mono-mid">
                            Compensation / Package
                          </div>
                          <div className="font-serif text-xl font-black">
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
        <div className="mt-12 p-8 border-4 border-black bg-black text-white text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-mono-mid mb-2">
            [ OUTCOME VERIFICATION ]
          </div>
          <h4 className="font-serif text-3xl sm:text-4xl font-bold">
            Target Competency Achieved: {student.careerGoal}
          </h4>
          <p className="font-body text-base max-w-2xl mx-auto mt-2 text-mono-light">
            Following this sequenced graph traversal fulfills 100% of the prerequisite and technical skill requirements required by hiring partners and research labs.
          </p>
        </div>
      </div>
    </section>
  );
};

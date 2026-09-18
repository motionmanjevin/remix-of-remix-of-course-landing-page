import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import SocialProof from "./SocialProof";
import { EnrollButton } from "@/components/EnrollButton";

const modules = [
  {
    id: 1,
    title: "Foundations of AI Communication",
    duration: "2h 45m",
    summary: "Understand how LLMs think and respond to unlock effective prompting",
    lessons: [
      { title: "How Language Models Process Your Prompts", duration: "18m" },
      { title: "The Anatomy of High-Performing Prompts", duration: "24m" },
      { title: "5 Core Principles That Make Prompts Work", duration: "32m" },
      { title: "Setting Up Your Prompt Testing Environment", duration: "15m" },
      { title: "Module Project: Your First Optimized Prompt", duration: "36m" },
    ],
  },
  {
    id: 2,
    title: "Prompt Patterns That Scale",
    duration: "3h 10m",
    summary: "Master 12 battle-tested templates used by top AI engineers",
    lessons: [
      { title: "The Role-Task-Format Pattern", duration: "28m" },
      { title: "Chain-of-Thought Prompting Deep Dive", duration: "35m" },
      { title: "Few-Shot Learning: Teaching AI by Example", duration: "30m" },
      { title: "Building Reusable Prompt Libraries", duration: "25m" },
      { title: "Module Project: Create Your Personal Template Kit", duration: "42m" },
    ],
  },
  {
    id: 3,
    title: "Context Engineering & Memory",
    duration: "2h 55m",
    summary: "Structure context windows for maximum output quality and coherence",
    lessons: [
      { title: "Understanding Context Windows and Token Limits", duration: "22m" },
      { title: "Chunking Strategies for Long Documents", duration: "28m" },
      { title: "Managing Multi-Turn Conversations", duration: "32m" },
      { title: "Retrieval-Augmented Generation Patterns", duration: "38m" },
      { title: "Module Project: Build a Context-Aware Assistant", duration: "35m" },
    ],
  },
  {
    id: 4,
    title: "Domain-Specific Applications",
    duration: "3h 30m",
    summary: "Apply prompting skills to code generation, writing, and analysis",
    lessons: [
      { title: "Prompts for Code Generation & Debugging", duration: "40m" },
      { title: "Content Writing & Creative Applications", duration: "35m" },
      { title: "Data Analysis & Research Prompts", duration: "32m" },
      { title: "Building AI-Powered Automation Workflows", duration: "38m" },
      { title: "Module Project: Create a Custom GPT Agent", duration: "45m" },
    ],
  },
  {
    id: 5,
    title: "Advanced Techniques & Edge Cases",
    duration: "2h 40m",
    summary: "Debug underperforming prompts and implement safety guardrails",
    lessons: [
      { title: "Systematic Prompt Debugging Framework", duration: "28m" },
      { title: "Handling Ambiguous Inputs Gracefully", duration: "25m" },
      { title: "Reducing Hallucinations & Improving Accuracy", duration: "32m" },
      { title: "Implementing Safety Patterns & Guardrails", duration: "30m" },
      { title: "Module Project: Audit & Optimize Real Prompts", duration: "25m" },
    ],
  },
  {
    id: 6,
    title: "Capstone & Career Integration",
    duration: "4h 00m",
    summary: "Complete a portfolio project and position yourself for AI-fluent roles",
    lessons: [
      { title: "Choosing Your Capstone Project", duration: "20m" },
      { title: "Building a Production-Ready AI Solution", duration: "90m" },
      { title: "Documenting & Presenting Your Work", duration: "35m" },
      { title: "Positioning Yourself as AI-Fluent", duration: "25m" },
      { title: "Certification Exam & Alumni Network Access", duration: "30m" },
    ],
  },
];

interface AccordionButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const AccordionButton = ({ isOpen, onClick }: AccordionButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-9 h-9 rounded-lg flex items-center justify-center",
      "bg-primary/10 border border-primary/30",
      "shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]",
      "transition-all duration-200 ease-out",
      "hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] hover:-translate-y-0.5",
      "active:translate-y-0 active:shadow-[0_1px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]",
      "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
    )}
    aria-expanded={isOpen}
    aria-label={isOpen ? "Collapse module" : "Expand module"}
  >
    {isOpen ? (
      <X className="w-4 h-4 text-primary transition-transform duration-200" />
    ) : (
      <Plus className="w-4 h-4 text-primary transition-transform duration-200" />
    )}
  </button>
);

const CourseStructureSection = () => {
  const [openModuleId, setOpenModuleId] = useState<number | null>(null);

  const toggleModule = (id: number) => {
    setOpenModuleId(openModuleId === id ? null : id);
  };

  return (
    <section id="curriculum" className="py-16 sm:py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Left Column - Title & Description */}
          <div className="lg:sticky lg:top-32 lg:self-start space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Course <span className="text-primary font-lora">structure</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Six comprehensive modules designed to take you from prompt basics 
                to production-ready AI engineering. Each lesson builds on the last, 
                with hands-on projects that reinforce your learning.
              </p>
            </div>

            {/* Social Proof */}
            <SocialProof />

            {/* CTA Button */}
            <EnrollButton size="lg" fullWidthMobile />
          </div>

          {/* Right Column - Accordion */}
          <div className="space-y-3">
            {modules.map((module) => {
              const isOpen = openModuleId === module.id;
              
              return (
                <div
                  key={module.id}
                  className={cn(
                    "group relative bg-card border border-border rounded-2xl overflow-hidden",
                    "transition-all duration-300 ease-out",
                    "hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]",
                    "active:translate-y-0 active:shadow-[0_4px_15px_rgba(0,0,0,0.25)]",
                    isOpen && "border-primary/30"
                  )}
                >
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 z-10">
                    <div className="absolute inset-[-100%] bg-[linear-gradient(90deg,transparent_0%,transparent_40%,hsl(var(--primary)/0.12)_50%,transparent_60%,transparent_100%)] animate-shimmer" />
                  </div>
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className={cn(
                      "w-full p-4 sm:p-5 flex items-start gap-3 sm:gap-4 text-left",
                      "transition-colors duration-200",
                      "hover:bg-secondary/30 active:bg-secondary/40",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset",
                      "touch-manipulation"
                    )}
                    aria-expanded={isOpen}
                    aria-controls={`module-content-${module.id}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          Module {module.id}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {module.duration}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
                        {module.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {module.summary}
                      </p>
                    </div>
                    <div 
                      className="flex-shrink-0 mt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <AccordionButton isOpen={isOpen} onClick={() => toggleModule(module.id)} />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <div
                    id={`module-content-${module.id}`}
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5">
                        <div className="border-t border-border pt-4">
                          <ul className="space-y-3">
                            {module.lessons.map((lesson, index) => (
                              <li
                                key={index}
                                className="flex items-center justify-between gap-4 py-2"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs text-muted-foreground flex-shrink-0">
                                    {index + 1}
                                  </span>
                                  <span className="text-sm text-foreground truncate">
                                    {lesson.title}
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground flex-shrink-0">
                                  {lesson.duration}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseStructureSection;

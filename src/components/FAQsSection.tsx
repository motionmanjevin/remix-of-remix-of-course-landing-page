import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    id: 1,
    question: "Do I need any prior AI experience?",
    answer: "No prior AI experience is required. We start with fundamentals and build up. However, basic computer literacy and comfort with writing are expected. If you can write a clear email, you can learn prompt engineering.",
  },
  {
    id: 2,
    question: "How much time should I dedicate per week?",
    answer: "Plan for 5-8 hours per week. This includes 2 hours of live sessions, 2-3 hours of hands-on exercises, and 1-3 hours for the weekly project. Most students find this manageable alongside full-time work.",
  },
  {
    id: 3,
    question: "What if I can't attend the live sessions?",
    answer: "All sessions are recorded and available within 2 hours. You'll also have access to detailed notes and transcripts. While live attendance is encouraged for Q&A, you won't miss any content.",
  },
  {
    id: 4,
    question: "Is the certification actually valuable?",
    answer: "Yes. Our certification is recognized by 500+ companies including major tech firms. 94% of our graduates report career advancement within 6 months. We also provide a LinkedIn badge and verified credential.",
  },
  {
    id: 5,
    question: "What's your refund policy?",
    answer: "We offer a full 30-day money-back guarantee, no questions asked. Complete week 1 and 2, and if you don't feel it's right for you, we'll refund every penny. We've only had a 2% refund rate.",
  },
  {
    id: 6,
    question: "Will this work with any AI tool, not just ChatGPT?",
    answer: "Absolutely. We teach universal prompt engineering principles that work across all major LLMs—ChatGPT, Claude, Gemini, Llama, and more. The skills transfer because the underlying principles are the same.",
  },
  {
    id: 7,
    question: "How is this different from free YouTube tutorials?",
    answer: "Structure, depth, and accountability. Free content is scattered and often outdated. We provide a proven curriculum, personalized feedback, a supportive community, and certification. Our 86% completion rate vs the typical 3% for online courses speaks for itself.",
  },
  {
    id: 8,
    question: "Can my company pay for this?",
    answer: "Yes! Many students expense this through L&D budgets. We provide invoices and can send a justification letter to your manager. We also offer team pricing for 5+ enrollments—reach out for details.",
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
    aria-label={isOpen ? "Collapse answer" : "Expand answer"}
  >
    {isOpen ? (
      <X className="w-4 h-4 text-primary transition-transform duration-200" />
    ) : (
      <Plus className="w-4 h-4 text-primary transition-transform duration-200" />
    )}
  </button>
);

const FAQsSection = () => {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-16 sm:py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Frequently asked <span className="text-primary font-lora">questions</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Everything you need to know before enrolling.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* FAQ Accordion */}
          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              
              return (
                <div
                  key={faq.id}
                  className={cn(
                    "relative bg-card border border-border rounded-2xl overflow-hidden",
                    "transition-all duration-300 ease-out",
                    "group",
                    isOpen && "border-primary/30"
                  )}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className={cn(
                      "w-full p-4 sm:p-5 flex items-start gap-3 sm:gap-4 text-left",
                      "transition-colors duration-200",
                      "hover:bg-secondary/30 active:bg-secondary/40",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset",
                      "touch-manipulation"
                    )}
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${faq.id}`}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-foreground">
                        {faq.question}
                      </h3>
                    </div>
                    <div 
                      className="flex-shrink-0 mt-0.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <AccordionButton isOpen={isOpen} onClick={() => toggleFaq(faq.id)} />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <div
                    id={`faq-content-${faq.id}`}
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5">
                        <div className="border-t border-border pt-4">
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
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

export default FAQsSection;

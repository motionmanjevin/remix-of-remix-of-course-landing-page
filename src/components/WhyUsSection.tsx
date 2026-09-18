import instructorRachel from "@/assets/instructor-rachel.jpg";
import instructorAlex from "@/assets/instructor-alex.jpg";
import BentoGrid from "./BentoGrid";
const instructors = [{
  name: "Dr. Rachel Kim",
  role: "Lead Instructor",
  credentials: "Former AI Research Lead at OpenAI. Stanford PhD. Published 40+ papers on NLP.",
  avatar: instructorRachel
}, {
  name: "Alex Chen",
  role: "Technical Director",
  credentials: "Built AI products used by 10M+ users. Ex-Google, Ex-Anthropic. 15 years in ML.",
  avatar: instructorAlex
}];
const WhyUsSection = () => {
  return <section id="why-us" className="py-16 sm:py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Why choose <span className="text-primary font-lora">PromptMaster</span>?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            We've trained 2,000+ professionals. Here's what makes us different.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mb-20">
          <BentoGrid />
        </div>

        {/* Instructors */}
        
      </div>
    </section>;
};
export default WhyUsSection;
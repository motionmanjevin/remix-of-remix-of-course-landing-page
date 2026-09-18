import { Star, Play, Twitter, Linkedin, Instagram } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { useState } from "react";
import testimonialAvatar1 from "@/assets/testimonial-avatar-1.jpg";
import testimonialAvatar2 from "@/assets/testimonial-avatar-2.jpg";
import testimonialAvatar3 from "@/assets/testimonial-avatar-3.jpg";
import testimonialAvatar4 from "@/assets/testimonial-avatar-4.jpg";
import testimonialAvatar5 from "@/assets/testimonial-avatar-5.jpg";
import testimonialAvatar6 from "@/assets/testimonial-avatar-6.jpg";
import instructorImage from "@/assets/instructor-alex.jpg";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at Stripe",
    quote: "I went from struggling with AI tools to getting promoted because of my prompt skills. The structured approach made all the difference.",
    rating: 5,
    avatar: testimonialAvatar1,
  },
  {
    name: "Marcus Johnson",
    role: "Senior Developer at Shopify",
    quote: "Cut my development time by 40% after week 2. The prompt patterns for code generation alone were worth 10x the course price.",
    rating: 5,
    avatar: testimonialAvatar2,
  },
  {
    name: "Emily Rodriguez",
    role: "Content Strategist at HubSpot",
    quote: "Finally understand why my prompts weren't working. Now I produce a week's worth of content in a single afternoon.",
    rating: 5,
    avatar: testimonialAvatar3,
  },
  {
    name: "David Park",
    role: "Startup Founder",
    quote: "Built an AI-powered MVP in 3 weeks that would have taken months. The capstone project framework was incredibly practical.",
    rating: 5,
    avatar: testimonialAvatar4,
  },
  {
    name: "Lisa Thompson",
    role: "UX Researcher at Google",
    quote: "The context engineering module transformed how I approach AI-assisted research. Essential skills for anyone in tech.",
    rating: 5,
    avatar: testimonialAvatar5,
  },
  {
    name: "James Wilson",
    role: "Freelance Consultant",
    quote: "Tripled my consulting rates by offering AI strategy services. The certification opened doors I didn't know existed.",
    rating: 5,
    avatar: testimonialAvatar6,
  },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "X (Twitter)" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

// Stat component with count-up animation
const AnimatedStat = ({ numericValue, suffix, label, decimals = 0 }: { 
  numericValue: number; 
  suffix: string; 
  label: string;
  decimals?: number;
}) => {
  const { ref, formattedCount } = useCountUp({ end: numericValue, duration: 1.4, decimals });
  
  return (
    <div ref={ref} className="text-center px-2">
      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-0.5 sm:mb-1 font-lora">
        {formattedCount}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

const ReviewsSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="reviews" className="py-16 sm:py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Trusted by <span className="text-primary font-lora">professionals</span> worldwide
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Join thousands who've transformed their careers with prompt engineering skills.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto mb-12 md:mb-16">
          <AnimatedStat numericValue={2147} suffix="" label="Students enrolled" />
          <AnimatedStat numericValue={4.9} suffix="/5" label="Average rating" decimals={1} />
          <AnimatedStat numericValue={86} suffix="%" label="Completion rate" />
          <AnimatedStat numericValue={94} suffix="%" label="Report career growth" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col h-full overflow-hidden hover:border-primary/20 active:border-primary/30"
            >
              {/* Inner glow overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,hsl(var(--primary)/0.08)_0%,transparent_70%)]" />
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_hsl(var(--primary)/0.06),inset_0_1px_0_hsl(var(--primary)/0.1)]" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <blockquote className="text-foreground mb-4 flex-1">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.name} avatar`}
                    className="w-10 h-10 rounded-full object-cover border-2 border-background shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructor Section */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Video */}
            <div className="order-1">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-secondary">
                {isPlaying ? (
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="Instructor Introduction"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={instructorImage}
                      alt="Alex Chen - Video Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-background/40" />
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="absolute inset-0 flex items-center justify-center group"
                      aria-label="Play introduction video"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Play className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground ml-1" fill="currentColor" />
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Text Content */}
            <div className="order-2 space-y-5">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Meet your <span className="text-primary font-lora">instructor</span>
              </h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed text-sm md:text-base">
                <p>
                  Alex Chen is a former AI researcher at Google DeepMind and founding engineer at two 
                  Y Combinator startups. He's spent the last decade at the intersection 
                  of machine learning and product development.
                </p>
                <p>
                  He's trained over 5,000 professionals in prompt engineering techniques 
                  and built AI systems used by millions.
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 active:bg-primary/20 transition-all duration-200 touch-manipulation"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

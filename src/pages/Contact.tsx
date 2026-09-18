import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTASection from "@/components/FinalCTASection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Send, MessageSquare, Calendar, Sparkles } from "lucide-react";

const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100, "Name must be less than 100 characters"),
  workEmail: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional().or(z.literal("")),
  teamSize: z.string().optional(),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const teamSizeOptions = [
  { value: "1-5", label: "1–5" },
  { value: "6-10", label: "6–10" },
  { value: "11-25", label: "11–25" },
  { value: "26-50", label: "26–50" },
  { value: "51-100", label: "51–100" },
  { value: "100+", label: "100+" },
];

const whatHappensNext = [
  {
    icon: MessageSquare,
    text: "We'll review your message within 1 business day",
  },
  {
    icon: Calendar,
    text: "Schedule a call to discuss your team's needs",
  },
  {
    icon: Sparkles,
    text: "Get a custom proposal tailored to your organization",
  },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      company: "",
      teamSize: "",
      message: "",
    },
  });

  const teamSizeValue = watch("teamSize");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact-form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            fullName: data.fullName,
            workEmail: data.workEmail,
            company: data.company || null,
            teamSize: data.teamSize || null,
            message: data.message,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(result.message || "Please wait a bit and try again.");
        }
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setIsSuccess(true);
      reset();
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="top" className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Main Content */}
      <main className="relative min-h-[calc(100vh-80px)] flex items-center py-16 sm:py-20 md:py-24 overflow-hidden">
        {/* Subtle background gradient */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(
              ellipse 80% 50% at 50% 0%,
              hsl(24 95% 50% / 0.08) 0%,
              hsl(24 95% 45% / 0.04) 40%,
              transparent 70%
            )`,
          }}
        />
        
        {/* Subtle grid texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(hsl(24 40% 60% / 0.5) 1px, transparent 1px),
              linear-gradient(90deg, hsl(24 40% 60% / 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Bottom fade */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: `linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)`,
          }}
        />
        <div className="container mx-auto px-4 md:px-6 w-full relative z-10">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Contact <span className="text-primary font-lora">Sales</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              Looking to enroll your team? Let's discuss.
            </p>
          </div>

          {isSuccess ? (
            /* Success State - What Happens Next */
            <div className="max-w-xl mx-auto">
              <div className="bg-card border border-border rounded-3xl p-6 md:p-8 backdrop-blur-md text-center">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Message sent!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Thanks for reaching out.
                </p>
                
                <div className="text-left bg-secondary/30 rounded-2xl p-5 mb-6">
                  <h4 className="text-base font-semibold text-foreground mb-4">
                    What happens next
                  </h4>
                  <ul className="space-y-3">
                    {whatHappensNext.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-sm text-foreground/90 pt-1.5">{item.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setIsSuccess(false)}
                  className="border-primary/30 hover:bg-primary/10"
                >
                  Send another message
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              {/* Form Card */}
              <div>
                <div className="bg-card border border-border rounded-3xl p-5 md:p-6 backdrop-blur-md">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    {/* Row 1: Full Name + Work Email */}
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                          Full name <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="fullName"
                          {...register("fullName")}
                          placeholder="Jane Smith"
                          className="h-10 bg-secondary/30 border-border focus:border-primary"
                          aria-invalid={errors.fullName ? "true" : "false"}
                          aria-describedby={errors.fullName ? "fullName-error" : undefined}
                        />
                        {errors.fullName && (
                          <p id="fullName-error" className="text-sm text-destructive" role="alert">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="workEmail" className="text-sm font-medium text-foreground">
                          Work email <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="workEmail"
                          type="email"
                          {...register("workEmail")}
                          placeholder="jane@company.com"
                          className="h-10 bg-secondary/30 border-border focus:border-primary"
                          aria-invalid={errors.workEmail ? "true" : "false"}
                          aria-describedby={errors.workEmail ? "workEmail-error" : undefined}
                        />
                        {errors.workEmail && (
                          <p id="workEmail-error" className="text-sm text-destructive" role="alert">
                            {errors.workEmail.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Company + Team Size */}
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="company" className="text-sm font-medium text-foreground">
                          Company
                        </Label>
                        <Input
                          id="company"
                          {...register("company")}
                          placeholder="Acme Inc."
                          className="h-10 bg-secondary/30 border-border focus:border-primary"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="teamSize" className="text-sm font-medium text-foreground">
                          Team size
                        </Label>
                        <Select
                          value={teamSizeValue}
                          onValueChange={(value) => setValue("teamSize", value)}
                        >
                          <SelectTrigger
                            id="teamSize"
                            className="h-10 bg-secondary/30 border-border focus:border-primary"
                          >
                            <SelectValue placeholder="Select team size" />
                          </SelectTrigger>
                          <SelectContent>
                            {teamSizeOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message <span className="text-primary">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="Tell us about your team's needs..."
                        rows={3}
                        className="min-h-[80px] bg-secondary/30 border-border focus:border-primary resize-none"
                        aria-invalid={errors.message ? "true" : "false"}
                        aria-describedby={errors.message ? "message-error" : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="text-sm text-destructive" role="alert">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Error */}
                    {submitError && (
                      <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                        <p className="text-sm text-destructive" role="alert">
                          {submitError}
                        </p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 text-base font-medium rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-150 hover:-translate-y-px active:translate-y-0"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      <ScrollReveal delay={100}>
        <FinalCTASection />
      </ScrollReveal>

      <Footer />
    </div>
  );
};

export default Contact;

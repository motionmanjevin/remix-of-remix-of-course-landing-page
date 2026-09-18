import { ReactNode, useEffect, useState } from "react";
import { Target, Award, Zap, BookOpen, Users, Check, FileText, Clock, MessageCircle, MessageSquare } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
interface BentoTileProps {
  children: ReactNode;
  className?: string;
  span?: "1x1" | "2x1" | "1x2" | "2x2";
  gridArea?: string;
}
const BentoTile = ({
  children,
  className = "",
  span = "1x1",
  gridArea
}: BentoTileProps) => {
  // Only apply span classes on large screens (lg+), not tablet
  const spanClasses = {
    "1x1": "",
    "2x1": "lg:col-span-2",
    "1x2": "lg:row-span-2",
    "2x2": "lg:col-span-2 lg:row-span-2"
  };
  return (
    <div 
      className={`group relative bg-card border border-border rounded-2xl p-5 overflow-hidden
        /* Stable min-height for tablet */
        md:min-h-[280px] lg:min-h-0
        /* Only transform/opacity animations - no layout shift */
        transition-[transform,opacity] duration-300
        ${spanClasses[span]} ${className}`} 
      style={gridArea ? { gridArea } : undefined}
    >
      {/* Inner glow overlay - transform/opacity only */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,hsl(var(--primary)/0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_hsl(var(--primary)/0.06),inset_0_1px_0_hsl(var(--primary)/0.1)]" />
      </div>
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  );
};

/* 
 * Typography Scale (consistent across all cards):
 * - Titles: text-lg (18px), font-semibold, leading-snug (1.375)
 * - Descriptions: text-sm (14px), text-muted-foreground/90, leading-relaxed (1.625)
 * - Demo UI text: text-xs (12px), tracking-wide for labels
 */

// Demo: Checklist animation
const ChecklistDemo = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [showProject, setShowProject] = useState(false);
  useEffect(() => {
    const totalItems = 4;
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < totalItems) {
        const indexToCheck = currentIndex;
        setCheckedItems(prev => [...prev, indexToCheck]);
        currentIndex++;
      } else if (currentIndex === totalItems) {
        setShowProject(true);
        currentIndex++;
      } else {
        setCheckedItems([]);
        setShowProject(false);
        currentIndex = 0;
      }
    }, 700);
    return () => clearInterval(interval);
  }, []);
  const tasks = ["Set up", "Build UI", "Add logic", "Deploy"];
  return (
    <div className="mt-auto pt-4">
      {/* Fixed height container to prevent layout shift */}
      <div className="h-[120px] md:h-[100px] overflow-hidden">
        <div className="flex gap-3 items-end h-full">
          <div className="flex-1 bg-background/50 rounded-lg p-3 border border-border/50">
            <div className="text-xs text-muted-foreground/90 mb-2 uppercase tracking-widest">Progress</div>
            <div className="space-y-1.5">
              {tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-[background,border-color] duration-300 ${checkedItems.includes(i) ? "bg-primary border-primary" : "border-muted-foreground/60"}`}>
                    {checkedItems.includes(i) && <Check className="w-2 h-2 text-primary-foreground" />}
                  </div>
                  <span className={`transition-colors duration-300 ${checkedItems.includes(i) ? "text-foreground" : "text-muted-foreground"}`}>{task}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`w-20 bg-background/50 rounded-lg p-3 border border-border/50 transition-[transform,opacity] duration-500 ${showProject ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <FileText className="w-4 h-4 text-primary mb-1" />
            <div className="text-xs font-medium text-foreground">Done</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo: Before/After text morph
const TextMorphDemo = () => {
  const [showAfter, setShowAfter] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setShowAfter(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="mt-auto pt-3">
      {/* Fixed height container */}
      <div className="h-[72px] overflow-hidden">
        <div className="bg-background/50 rounded-lg p-3 border border-border/50 h-full">
          <div className="flex items-center gap-2 mb-2">
            <div className={`text-xs px-2 py-0.5 rounded transition-[background,color] duration-300 ${!showAfter ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>Before</div>
            <div className={`text-xs px-2 py-0.5 rounded transition-[background,color] duration-300 ${showAfter ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>After</div>
          </div>
          <div className="relative h-10 overflow-hidden">
            <div className={`absolute inset-0 transition-[transform,opacity] duration-500 ${!showAfter ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
              <code className="text-xs text-muted-foreground">write me a professional email</code>
            </div>
            <div className={`absolute inset-0 transition-[transform,opacity] duration-500 ${showAfter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <code className="text-xs text-primary">Role: Writer · Tone: Formal · Goal: Meeting</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo: Curriculum update pulse
const CurriculumDemo = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => prev >= 100 ? 0 : prev + 3);
    }, 100);
    return () => clearInterval(interval);
  }, []);
  const months = ["Jan", "Feb", "Mar", "Apr"];
  return (
    <div className="mt-auto pt-3">
      {/* Fixed height container */}
      <div className="h-[60px] overflow-hidden space-y-2">
        <div className="relative inline-block">
          <div className="px-2 py-1 bg-primary/20 text-primary text-xs rounded font-medium flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            Jan 2025
          </div>
          <div className="absolute inset-0 bg-primary/30 rounded animate-ping opacity-75" style={{ animationDuration: '2s' }} />
        </div>
        <div className="flex items-center gap-1">
          {months.map((month, i) => (
            <div key={month} className="flex-1 flex flex-col items-center">
              <div className={`w-full h-1 rounded-full transition-[background] duration-300 ${progress > i * 25 ? "bg-primary" : "bg-muted"}`} />
              <span className="text-xs text-muted-foreground/80 mt-1">{month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Demo: Certificate stamp
const CertificateDemo = () => {
  const [showCompanies, setShowCompanies] = useState(false);
  const [stamped, setStamped] = useState(false);
  useEffect(() => {
    const stampTimer = setTimeout(() => setStamped(true), 500);
    const companiesTimer = setTimeout(() => setShowCompanies(true), 1000);
    const resetTimer = setTimeout(() => {
      setStamped(false);
      setShowCompanies(false);
    }, 4500);
    return () => {
      clearTimeout(stampTimer);
      clearTimeout(companiesTimer);
      clearTimeout(resetTimer);
    };
  }, [stamped, showCompanies]);
  const companies = ["Tech Co", "AI Labs", "DevCorp"];
  return (
    <div className="mt-auto pt-3">
      {/* Fixed height container - overflow visible for badge */}
      <div className="h-[52px] overflow-visible">
        <div className="flex items-center gap-3">
          <div className={`relative w-12 h-12 border border-primary/50 rounded-lg flex items-center justify-center flex-shrink-0 transition-[transform,opacity] duration-300 ${stamped ? "scale-100" : "scale-90 opacity-50"}`}>
            <Award className={`w-6 h-6 text-primary transition-[transform] duration-500 ${stamped ? "rotate-0 scale-100" : "rotate-12 scale-50"}`} />
            {stamped && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-primary-foreground" />
              </div>
            )}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {companies.map((company, i) => (
              <div 
                key={company} 
                className={`px-2 py-1 bg-muted text-xs text-muted-foreground/90 rounded transition-[transform,opacity] duration-300 ${showCompanies ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} 
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo: Guided feedback - Interactive prompt improvement
const FeedbackDemo = () => {
  const [phase, setPhase] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [showSuggestions, setShowSuggestions] = useState<number[]>([]);
  const [appliedSuggestion, setAppliedSuggestion] = useState<number | null>(null);
  const [hoveredSuggestion, setHoveredSuggestion] = useState<number | null>(null);

  const initialPrompt = "write me an email";
  const improvedPrompt = "As a writer, draft a formal meeting request.";
  
  const suggestions = [
    { icon: "🎭", text: "Add role" },
    { icon: "🎯", text: "Be specific" },
  ];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    const runAnimation = () => {
      if (phase === 0) {
        // Type initial prompt
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex <= initialPrompt.length) {
            setTypedPrompt(initialPrompt.slice(0, charIndex));
            charIndex++;
          } else {
            clearInterval(typeInterval);
            setPhase(1);
          }
        }, 50);
        return () => clearInterval(typeInterval);
      } else if (phase === 1) {
        // Show suggestions one by one
        timeout = setTimeout(() => setShowSuggestions([0]), 400);
        setTimeout(() => setShowSuggestions([0, 1]), 800);
        setTimeout(() => setShowSuggestions([0, 1, 2]), 1200);
        setTimeout(() => setPhase(2), 1800);
      } else if (phase === 2) {
        // Apply suggestions one by one
        timeout = setTimeout(() => setAppliedSuggestion(0), 300);
        setTimeout(() => setAppliedSuggestion(1), 700);
        setTimeout(() => setAppliedSuggestion(2), 1100);
        setTimeout(() => setPhase(3), 1600);
      } else if (phase === 3) {
        // Show improved prompt
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex <= improvedPrompt.length) {
            setTypedPrompt(improvedPrompt.slice(0, charIndex));
            charIndex++;
          } else {
            clearInterval(typeInterval);
            setPhase(4);
          }
        }, 25);
        return () => clearInterval(typeInterval);
      } else if (phase === 4) {
        // Hold then reset
        timeout = setTimeout(() => {
          setPhase(0);
          setTypedPrompt("");
          setShowSuggestions([]);
          setAppliedSuggestion(null);
        }, 2500);
      }
    };

    const cleanup = runAnimation();
    return () => {
      if (timeout) clearTimeout(timeout);
      if (cleanup) cleanup();
    };
  }, [phase]);

  return (
    <div className="mt-auto pt-3">
      {/* Fixed height container - compact to prevent clipping */}
      <div className="h-[80px] overflow-hidden space-y-1.5">
        {/* Prompt input area - reduced height */}
        <div className="bg-background/50 rounded-lg p-2 border border-border/50 h-[44px] overflow-hidden">
          <div className="flex items-start gap-2">
            <MessageCircle className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
            <code className={`text-xs leading-snug break-all transition-colors duration-300 line-clamp-2 ${phase >= 3 ? "text-primary" : "text-muted-foreground/90"}`}>
              {typedPrompt}
              <span className="inline-block w-0.5 h-3 bg-primary/70 ml-0.5 animate-pulse" />
            </code>
          </div>
        </div>

        {/* Suggestion chips - single row */}
        <div className="flex gap-1.5">
          {suggestions.map((suggestion, i) => (
            <div
              key={i}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs cursor-pointer
                transition-[transform,opacity,background,color,border-color] duration-300
                ${showSuggestions.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                ${appliedSuggestion !== null && appliedSuggestion >= i 
                  ? "bg-primary/20 text-primary border border-primary/30" 
                  : "bg-muted text-muted-foreground border border-transparent"}
                ${hoveredSuggestion === i ? "scale-105" : ""}
              `}
              style={{ transitionDelay: `${i * 100}ms` }}
              onMouseEnter={() => setHoveredSuggestion(i)}
              onMouseLeave={() => setHoveredSuggestion(null)}
            >
              <span>{suggestion.icon}</span>
              <span>{suggestion.text}</span>
              {appliedSuggestion !== null && appliedSuggestion >= i && (
                <Check className="w-2.5 h-2.5 text-primary animate-scale-in" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Demo: Community avatars with real faces - Interactive chat simulation
const CommunityDemo = () => {
  const [visibleAvatars, setVisibleAvatars] = useState<number[]>([]);
  const [activeAvatar, setActiveAvatar] = useState<number | null>(null);
  const [messages, setMessages] = useState<{id: number; text: string; avatar: number; hasReaction: boolean}[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [typingAvatar, setTypingAvatar] = useState<number>(0);
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);

  const chatMessages = [
    { text: "How do I start?", avatar: 0 },
    { text: "Try module 1! 🚀", avatar: 2 },
  ];

  useEffect(() => {
    const avatars = [0, 1, 2, 3, 4];
    let phase = 0;
    let messageIndex = 0;

    const runAnimation = () => {
      if (phase < 5) {
        // Show avatars one by one
        setVisibleAvatars(prev => [...prev, avatars[phase]]);
        phase++;
      } else if (phase === 5) {
        // First person starts typing
        setTypingAvatar(chatMessages[0].avatar);
        setActiveAvatar(chatMessages[0].avatar);
        setShowTyping(true);
        phase++;
      } else if (phase >= 6 && phase < 6 + chatMessages.length * 2) {
        const msgPhase = phase - 6;
        if (msgPhase % 2 === 0) {
          // Show message
          const msgIdx = Math.floor(msgPhase / 2);
          setShowTyping(false);
          setMessages(prev => [...prev, { id: msgIdx, ...chatMessages[msgIdx], hasReaction: false }]);
          messageIndex = msgIdx;
          phase++;
        } else {
          // Add reaction to previous message and start next typing
          setMessages(prev => prev.map((m, i) => 
            i === messageIndex - 1 ? { ...m, hasReaction: true } : m
          ));
          const nextMsgIdx = Math.floor(msgPhase / 2) + 1;
          if (nextMsgIdx < chatMessages.length) {
            setTypingAvatar(chatMessages[nextMsgIdx].avatar);
            setActiveAvatar(chatMessages[nextMsgIdx].avatar);
            setShowTyping(true);
          }
          phase++;
        }
      } else if (phase === 6 + chatMessages.length * 2) {
        // Add final reaction
        setMessages(prev => prev.map((m, i) => 
          i === chatMessages.length - 1 ? { ...m, hasReaction: true } : m
        ));
        phase++;
      } else if (phase === 7 + chatMessages.length * 2) {
        // Hold
        phase++;
      } else {
        // Reset
        setVisibleAvatars([]);
        setActiveAvatar(null);
        setMessages([]);
        setShowTyping(false);
        phase = 0;
        messageIndex = 0;
      }
    };

    const interval = setInterval(runAnimation, 600);
    return () => clearInterval(interval);
  }, []);

  const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5];

  return (
    <div className="mt-auto pt-3">
      {/* Fixed height container - compact */}
      <div className="h-[76px] overflow-hidden flex flex-col gap-1.5 items-start justify-start">
        {/* Avatar row with hover interactions */}
        <div className="flex items-center gap-2">
          <div className="-space-x-1.5 flex flex-row">
            {avatarImages.map((avatar, i) => (
              <div
                key={i}
                className={`relative w-6 h-6 rounded-full border-2 cursor-pointer
                  transition-[transform,opacity,border-color,box-shadow] duration-300
                  ${visibleAvatars.includes(i) ? "opacity-100 scale-100" : "opacity-0 scale-75"}
                  ${activeAvatar === i ? "border-primary ring-1 ring-primary/30 scale-110 z-20" : "border-card"}
                  ${hoveredAvatar === i ? "scale-110 z-20" : ""}
                `}
                style={{
                  transitionDelay: `${i * 50}ms`,
                  zIndex: hoveredAvatar === i || activeAvatar === i ? 20 : avatarImages.length - i,
                }}
                onMouseEnter={() => setHoveredAvatar(i)}
                onMouseLeave={() => setHoveredAvatar(null)}
              >
                <img
                  src={avatar}
                  alt={`Community member ${i + 1}`}
                  className="w-full h-full object-cover rounded-full"
                />
                {/* Speaking/typing indicator */}
                {activeAvatar === i && showTyping && (
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-1 h-1 bg-primary-foreground rounded-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="px-1.5 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded-full">
            +2k
          </div>
        </div>

        {/* Chat messages area - compact fixed height */}
        <div className="flex flex-col gap-0.5 w-full h-[40px] overflow-hidden">
          {messages.map((msg, i) => (
            <div
              key={msg.id}
              className="flex items-center gap-1.5 animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <img
                src={avatarImages[msg.avatar]}
                alt=""
                className="w-4 h-4 rounded-full flex-shrink-0"
              />
              <div className="px-2 py-0.5 bg-muted text-xs text-foreground rounded-lg">
                {msg.text}
              </div>
              {msg.hasReaction && (
                <span className="text-xs animate-scale-in">❤️</span>
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {showTyping && (
            <div className="flex items-center gap-1.5 animate-fade-in">
              <img
                src={avatarImages[typingAvatar]}
                alt=""
                className="w-4 h-4 rounded-full flex-shrink-0"
              />
              <div className="flex gap-0.5 px-2 py-1 bg-muted rounded-lg">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce"
                    style={{
                      animationDelay: `${i * 150}ms`,
                      animationDuration: '0.6s'
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const BentoGrid = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Mobile: Simple vertical stack */}
      <div className="flex flex-col gap-4 md:hidden">
        <BentoTile>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Practical, not theoretical
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            Every lesson includes hands-on exercises. Build real projects, not just watch videos.
          </p>
          <ChecklistDemo />
        </BentoTile>

        <BentoTile>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Guided feedback
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            Feedback to improve faster.
          </p>
          <FeedbackDemo />
        </BentoTile>

        <BentoTile>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Community support
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            2,000+ learners ready to help.
          </p>
          <CommunityDemo />
        </BentoTile>

        <BentoTile>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <Award className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Industry-recognized
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            Recognized by 500+ companies.
          </p>
          <CertificateDemo />
        </BentoTile>

        <BentoTile>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Learn by doing
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            80% hands-on practice, 20% instruction.
          </p>
          <TextMorphDemo />
        </BentoTile>

        <BentoTile>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Always current
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            Updated monthly with latest AI.
          </p>
          <CurriculumDemo />
        </BentoTile>
      </div>

      {/* Tablet: Stable 2-column grid (768-1024px) - no bento effects */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-4 max-w-4xl mx-auto items-stretch">
        <BentoTile>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Practical, not theoretical
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            Every lesson includes hands-on exercises. Build real projects, not just watch videos.
          </p>
          <ChecklistDemo />
        </BentoTile>

        <BentoTile>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Guided feedback
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            Feedback to improve faster.
          </p>
          <FeedbackDemo />
        </BentoTile>

        <BentoTile>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Community support
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            2,000+ learners ready to help.
          </p>
          <CommunityDemo />
        </BentoTile>

        <BentoTile>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <Award className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Industry-recognized
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            Recognized by 500+ companies.
          </p>
          <CertificateDemo />
        </BentoTile>

        <BentoTile>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Learn by doing
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            80% hands-on practice, 20% instruction.
          </p>
          <TextMorphDemo />
        </BentoTile>

        <BentoTile>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Always current
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            Updated monthly with latest AI.
          </p>
          <CurriculumDemo />
        </BentoTile>
      </div>

      {/* Desktop: Bento grid layout (lg+) */}
      <div 
        className="hidden lg:grid lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
        style={{
          gridTemplateAreas: `
            "practical practical guided community"
            "industry learn learn current"
          `
        }}
      >
        <BentoTile span="2x1" gridArea="practical">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Practical, not theoretical
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            Every lesson includes hands-on exercises. Build real projects, not just watch videos.
          </p>
          <ChecklistDemo />
        </BentoTile>

        <BentoTile span="1x1" gridArea="guided">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Guided feedback
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            Feedback to improve faster.
          </p>
          <FeedbackDemo />
        </BentoTile>

        <BentoTile span="1x1" gridArea="community">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Community support
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            2,000+ learners ready to help.
          </p>
          <CommunityDemo />
        </BentoTile>

        <BentoTile span="1x1" gridArea="industry">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <Award className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Industry-recognized
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            Recognized by 500+ companies.
          </p>
          <CertificateDemo />
        </BentoTile>

        <BentoTile span="2x1" gridArea="learn">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Learn by doing
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            80% hands-on practice, 20% instruction.
          </p>
          <TextMorphDemo />
        </BentoTile>

        <BentoTile span="1x1" gridArea="current">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1.5">
            Always current
          </h3>
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            Updated monthly with latest AI.
          </p>
          <CurriculumDemo />
        </BentoTile>
      </div>
    </div>
  );
};
export default BentoGrid;
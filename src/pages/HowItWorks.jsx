import React, { useState, useEffect, useRef } from "react";
import {
  Brain, Utensils, Camera, Mic, Star, Users, MapPin, Building2,
  CreditCard, Music, Globe, Shield, Sparkles, ArrowRight, Play,
  Zap, Heart, Leaf, Search, Lock, ChevronDown, MessageCircle,
  Calendar, Smartphone, TrendingUp, Award
} from "lucide-react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg:       "#041B16",
  deep:     "#085041",
  emerald:  "#1D9E75",
  mint:     "#E1F5EE",
  gold:     "#D4A64A",
  glass:    "rgba(8,80,65,0.25)",
  glassB:   "rgba(8,80,65,0.45)",
};

// ─── UTILITY: Animated number ─────────────────────────────────────────────────
function AnimNumber({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = to / 60;
        const t = setInterval(() => {
          start += step;
          if (start >= to) { setVal(to); clearInterval(t); }
          else setVal(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── PARTICLES ────────────────────────────────────────────────────────────────
function Particles({ count = 30 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 8,
    dur: Math.random() * 10 + 8,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: `radial-gradient(circle, ${C.emerald}, transparent)`,
            opacity: 0.4,
            animation: `floatParticle ${p.dur}s ${p.delay}s infinite ease-in-out alternate`,
          }}
        />
      ))}
    </div>
  );
}

// ─── GLOW ORBS ────────────────────────────────────────────────────────────────
function GlowOrb({ x, y, size = 400, color = C.emerald, opacity = 0.12 }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: x, top: y,
        width: size, height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        transform: "translate(-50%, -50%)",
        filter: "blur(40px)",
      }}
    />
  );
}

// ─── GLASS CARD ───────────────────────────────────────────────────────────────
function GlassCard({ children, className = "", style = {}, hover = true }) {
  return (
    <div
      className={`relative rounded-2xl border transition-all duration-500 ${hover ? "group cursor-pointer" : ""} ${className}`}
      style={{
        background: "rgba(8,80,65,0.18)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(29,158,117,0.2)",
        boxShadow: "0 8px 40px rgba(4,27,22,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
        ...style,
      }}
    >
      {hover && (
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(29,158,117,0.08) 0%, rgba(212,166,74,0.05) 100%)" }}
        />
      )}
      {children}
    </div>
  );
}

// ─── SECTION: HERO ────────────────────────────────────────────────────────────
function HeroSection() {
  const stats = [
    { val: 4, suffix: "", label: "Languages" },
    { val: 10, suffix: "+", label: "Ecosystem Pillars" },
    { val: 100, suffix: "", label: "Warka Score Max" },
    { val: 50, suffix: "k+", label: "Communities" },
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{ background: `radial-gradient(ellipse 120% 80% at 50% 0%, #0a3528 0%, ${C.bg} 60%)` }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(${C.emerald} 1px, transparent 1px), linear-gradient(90deg, ${C.emerald} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <GlowOrb x="10%" y="20%" size={600} color={C.emerald} opacity={0.1} />
      <GlowOrb x="90%" y="60%" size={500} color={C.gold} opacity={0.07} />
      <GlowOrb x="50%" y="90%" size={800} color={C.deep} opacity={0.3} />
      <Particles count={40} />

      {/* Ethiopian cross decorative motif */}
      <div className="absolute top-16 right-16 opacity-10" style={{ fontSize: 120, color: C.gold, fontFamily: "serif" }}>
        ✙
      </div>
      <div className="absolute bottom-20 left-10 opacity-8" style={{ fontSize: 80, color: C.emerald, fontFamily: "serif" }}>
        ✙
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border"
          style={{ borderColor: "rgba(29,158,117,0.3)", background: "rgba(29,158,117,0.1)" }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.emerald }} />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: C.emerald }}>
            How Warka Works
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 leading-none" style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontWeight: 900,
          fontSize: "clamp(2.8rem, 7vw, 7rem)",
          letterSpacing: "-0.02em",
        }}>
          <span style={{
            background: `linear-gradient(135deg, ${C.mint} 0%, ${C.emerald} 50%, ${C.gold} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            An AI Wellness Ecosystem
          </span>
          <br />
          <span style={{ color: "rgba(225,245,238,0.7)", fontWeight: 300 }}>
            Built For African Reality
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto mb-12 text-lg leading-relaxed"
          style={{ color: "rgba(225,245,238,0.55)", fontFamily: "Georgia, serif" }}>
          Mind, nutrition, community, healing, culture, and opportunity —
          <br />unified into one intelligent platform.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
          <button
            className="relative px-8 py-4 rounded-full font-semibold text-sm tracking-wide overflow-hidden group transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${C.emerald}, ${C.deep})`,
              color: C.mint,
              boxShadow: `0 0 30px rgba(29,158,117,0.4)`,
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles size={16} />
              Explore the Ecosystem
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(135deg, ${C.gold}33, ${C.emerald})` }} />
          </button>

          <button
            className="flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-wide border transition-all duration-300 group"
            style={{
              borderColor: "rgba(29,158,117,0.3)",
              color: C.mint,
              background: "rgba(29,158,117,0.08)",
            }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ background: "rgba(29,158,117,0.2)", boxShadow: `0 0 20px rgba(29,158,117,0.3)` }}>
              <Play size={12} style={{ color: C.emerald }} />
            </div>
            Watch Experience
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <GlassCard key={i} className="px-6 py-5 text-center" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="text-3xl font-black mb-1" style={{
                background: `linear-gradient(135deg, ${C.mint}, ${C.gold})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                <AnimNumber to={s.val} suffix={s.suffix} />
              </div>
              <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(225,245,238,0.4)" }}>
                {s.label}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs tracking-widest uppercase" style={{ color: C.mint }}>Scroll</span>
        <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: "rgba(29,158,117,0.4)" }}>
          <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: C.emerald }} />
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: ECOSYSTEM FLOW ──────────────────────────────────────────────────
const STEPS = [
  {
    n: "01", icon: Globe, title: "Profile Setup & Localization",
    desc: "Configure your health profile, language, and economic context across 4 Ethiopian languages.",
    tags: ["Amharic", "Afaan Oromoo", "Tigrinya", "English"],
    color: C.emerald, accent: "#0ecf8e",
  },
  {
    n: "02", icon: Utensils, title: "AI Nutrition & Fasting Sync",
    desc: "Ethiopian meals, Orthodox & Muslim fasting calendars — AI-calibrated to your body and beliefs.",
    tags: ["Ethiopian Meals", "Fasting Calendar", "AI Sync"],
    color: "#2eb87a", accent: C.gold,
  },
  {
    n: "03", icon: Camera, title: "AI Vision Plate Scanner",
    desc: "Point your camera at any Ethiopian dish. Computer vision delivers instant nutritional analysis.",
    tags: ["Computer Vision", "Health Score", "Real-time"],
    color: "#1a8f6b", accent: "#e8b84b",
  },
  {
    n: "04", icon: Mic, title: "Voice & Text Mental Check-In",
    desc: "Speak or type in your language. Warka reads emotion and tone with cultural AI understanding.",
    tags: ["Emotion AI", "Voice Analysis", "Cultural Context"],
    color: C.emerald, accent: "#a78bfa",
  },
  {
    n: "05", icon: Star, title: "Warka Score & Micro Actions",
    desc: "Your 0–100 wellness intelligence score with budget-based, culturally-fit recommendations.",
    tags: ["0–100 Score", "Budget AI", "Daily Actions"],
    color: C.gold, accent: C.emerald,
  },
  {
    n: "06", icon: Users, title: "Community & Peer Support",
    desc: "Anonymous chats, local wellness hubs, trusted peers — community healing rooted in African values.",
    tags: ["Anonymous", "Local Hubs", "Peer Circles"],
    color: "#1D9E75", accent: "#60a5fa",
  },
  {
    n: "07", icon: MapPin, title: "Discover Marketplace",
    desc: "Budget-filtered wellness places, Ethiopian businesses, healers, and local services near you.",
    tags: ["Budget Filter", "Local Businesses", "Geo-Search"],
    color: "#16a37a", accent: C.gold,
  },
  {
    n: "08", icon: Building2, title: "B2B Business Profiles",
    desc: "Video portfolios, menus, credentials — Ethiopian businesses connect to the wellness economy.",
    tags: ["Video Portfolios", "Revenue Ecosystem", "B2B"],
    color: C.deep, accent: C.emerald,
  },
  {
    n: "09", icon: CreditCard, title: "Smart Booking & Payments",
    desc: "Instant reservations, secure Ethiopian payment methods, and seamless checkout experiences.",
    tags: ["Instant Book", "Secure Pay", "Local Methods"],
    color: C.emerald, accent: "#f59e0b",
  },
  {
    n: "10", icon: Music, title: "Entertainment & Culture",
    desc: "Podcasts, music feeds, wellness entertainment — a cultural sanctuary for the African soul.",
    tags: ["Podcasts", "Music Feeds", "Cultural Media"],
    color: "#1a9470", accent: "#c084fc",
  },
];

function StepCard({ step, i }) {
  const Icon = step.icon;
  const isEven = i % 2 === 0;

  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? "" : "md:flex-row-reverse"}`}>
      {/* Visual side */}
      <div className="flex-1 relative w-full">
        <GlassCard className="p-8 overflow-hidden" style={{
          background: `linear-gradient(135deg, rgba(8,80,65,0.3) 0%, rgba(4,27,22,0.6) 100%)`,
          borderColor: `${step.color}33`,
        }}>
          {/* Step number watermark */}
          <div className="absolute top-4 right-6 text-8xl font-black opacity-5 select-none"
            style={{ color: step.color, fontFamily: "Georgia, serif" }}>{step.n}</div>

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative"
            style={{
              background: `linear-gradient(135deg, ${step.color}33, ${step.accent}22)`,
              border: `1px solid ${step.color}44`,
              boxShadow: `0 0 40px ${step.color}22`,
            }}>
            <Icon size={28} style={{ color: step.color }} />
            <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `radial-gradient(circle, ${step.color}22, transparent)` }} />
          </div>

          {/* Step label */}
          <div className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: step.color }}>Step {step.n}</div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-3 leading-tight"
            style={{ color: C.mint, fontFamily: "Georgia, serif" }}>{step.title}</h3>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-6"
            style={{ color: "rgba(225,245,238,0.55)" }}>{step.desc}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {step.tags.map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: `${step.color}18`,
                  color: step.color,
                  border: `1px solid ${step.color}33`,
                }}>
                {t}
              </span>
            ))}
          </div>

          {/* Glow line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(90deg, transparent, ${step.color}88, transparent)` }} />
        </GlassCard>
      </div>

      {/* Connector dot */}
      <div className="hidden md:flex flex-col items-center gap-2">
        <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, transparent, ${step.color}66)` }} />
        <div className="w-4 h-4 rounded-full border-2 relative"
          style={{ borderColor: step.color, background: `${step.color}33`, boxShadow: `0 0 20px ${step.color}66` }}>
          <div className="absolute inset-1 rounded-full animate-ping opacity-40" style={{ background: step.color }} />
        </div>
        <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, ${step.color}66, transparent)` }} />
      </div>

      {/* Text side */}
      <div className="flex-1 text-center md:text-left w-full">
        <div className="text-7xl font-black opacity-15 mb-2 select-none"
          style={{ color: step.color, fontFamily: "Georgia, serif" }}>{step.n}</div>
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: step.accent }}>
          Ecosystem Layer
        </div>
        <h3 className="text-3xl font-bold mb-4"
          style={{ color: C.mint, fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
          {step.title}
        </h3>
        <p style={{ color: "rgba(225,245,238,0.5)", lineHeight: 1.8 }}>{step.desc}</p>
      </div>
    </div>
  );
}

function EcosystemFlow() {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: C.bg }}>
      <GlowOrb x="50%" y="0%" size={800} color={C.emerald} opacity={0.06} />

      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
            style={{ background: "rgba(29,158,117,0.1)", border: "1px solid rgba(29,158,117,0.2)" }}>
            <Zap size={12} style={{ color: C.emerald }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: C.emerald }}>
              The Ecosystem Flow
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6"
            style={{
              fontFamily: "Georgia, serif",
              background: `linear-gradient(135deg, ${C.mint} 0%, ${C.emerald} 60%, ${C.gold} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}>
            10 Pillars of Wellness
          </h2>
          <p style={{ color: "rgba(225,245,238,0.5)", maxWidth: 500, margin: "0 auto" }}>
            Each layer of Warka is crafted for African reality — where culture, community, and technology intertwine.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-24">
          {STEPS.map((step, i) => <StepCard key={i} step={step} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: ECOSYSTEM FEATURES ─────────────────────────────────────────────
const FEATURE_CATS = [
  {
    id: "mental", label: "Mental Wellness", icon: Brain,
    features: [
      { title: "Voice Emotion AI", desc: "Real-time tone & emotion detection in Amharic, Oromoo, Tigrinya", icon: Mic },
      { title: "Cultural Therapy Prompts", desc: "Healing guided by Ethiopian spiritual traditions", icon: Heart },
      { title: "Mood Timeline", desc: "Track your emotional arc with beautiful AI visualizations", icon: TrendingUp },
      { title: "Crisis Support Network", desc: "Immediate peer + professional connection in emergencies", icon: Shield },
    ],
    accent: "#a78bfa",
  },
  {
    id: "lifestyle", label: "Lifestyle & Nutrition", icon: Leaf,
    features: [
      { title: "Injera Intelligence", desc: "AI nutrition for injera, tibs, shiro, and 200+ Ethiopian dishes", icon: Utensils },
      { title: "Fasting Calendar AI", desc: "Orthodox & Islamic fasting schedules synced to your health profile", icon: Calendar },
      { title: "Plate Vision Scanner", desc: "Scan any Ethiopian meal for instant nutritional breakdown", icon: Camera },
      { title: "Hydration & Sleep Coach", desc: "Daily micro-habits calibrated to Ethiopian climate and lifestyle", icon: Star },
    ],
    accent: C.gold,
  },
  {
    id: "community", label: "Community", icon: Users,
    features: [
      { title: "Anonymous Safe Circles", desc: "Speak freely in identity-protected peer support groups", icon: Lock },
      { title: "Local Wellness Hubs", desc: "Find and join physical community spaces near you", icon: MapPin },
      { title: "Healer Directories", desc: "Connect with traditional healers, spiritual guides, therapists", icon: Award },
      { title: "Cultural Events", desc: "Wellness festivals, group practices, and community gatherings", icon: Globe },
    ],
    accent: "#60a5fa",
  },
  {
    id: "marketplace", label: "Discover Marketplace", icon: Search,
    features: [
      { title: "Budget-Smart Discovery", desc: "Find wellness services filtered by your actual budget in ETB", icon: CreditCard },
      { title: "Ethiopian Business Spotlight", desc: "Local gyms, spas, organic farms, mental health clinics", icon: Building2 },
      { title: "AI Recommendation Engine", desc: "Hyper-personalized suggestions based on your Warka Score", icon: Sparkles },
      { title: "Review & Trust System", desc: "Community-verified ratings in all 4 languages", icon: MessageCircle },
    ],
    accent: C.emerald,
  },
  {
    id: "safety", label: "Safety & Privacy", icon: Shield,
    features: [
      { title: "End-to-End Encryption", desc: "All health data encrypted at rest and in transit", icon: Lock },
      { title: "Anonymous Mode", desc: "Use the full platform without revealing your identity", icon: Smartphone },
      { title: "Data Sovereignty", desc: "Your data stays in Ethiopia. Ethiopian law compliant.", icon: Globe },
      { title: "Cultural Safety", desc: "AI trained to respect Ethiopian cultural and religious sensitivities", icon: Heart },
    ],
    accent: "#f87171",
  },
];

function FeatureSection() {
  const [active, setActive] = useState("mental");
  const cat = FEATURE_CATS.find(c => c.id === active);

  return (
    <section className="relative py-32 overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${C.bg} 0%, #051e17 100%)` }}>
      <GlowOrb x="80%" y="50%" size={600} color={C.gold} opacity={0.05} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
            style={{ background: "rgba(212,166,74,0.1)", border: "1px solid rgba(212,166,74,0.2)" }}>
            <Sparkles size={12} style={{ color: C.gold }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: C.gold }}>
              Platform Features
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4"
            style={{
              fontFamily: "Georgia, serif",
              color: C.mint,
              letterSpacing: "-0.02em",
            }}>
            The AI Operating System
            <br />
            <span style={{
              background: `linear-gradient(135deg, ${C.emerald}, ${C.gold})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              for Ethiopian Wellness
            </span>
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {FEATURE_CATS.map(c => {
            const Icon = c.icon;
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300"
                style={{
                  background: isActive ? `linear-gradient(135deg, ${c.accent}33, ${c.accent}18)` : "rgba(8,80,65,0.15)",
                  color: isActive ? c.accent : "rgba(225,245,238,0.5)",
                  border: `1px solid ${isActive ? c.accent + "55" : "rgba(29,158,117,0.15)"}`,
                  boxShadow: isActive ? `0 0 20px ${c.accent}22` : "none",
                }}
              >
                <Icon size={14} />
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cat.features.map((f, i) => {
            const Icon = f.icon;
            return (
              <GlassCard
                key={i}
                className="p-6 group"
                style={{
                  transitionDelay: `${i * 60}ms`,
                  borderColor: `${cat.accent}22`,
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${cat.accent}18`,
                    border: `1px solid ${cat.accent}33`,
                    boxShadow: `0 0 20px ${cat.accent}18`,
                  }}>
                  <Icon size={20} style={{ color: cat.accent }} />
                </div>
                <h4 className="font-bold mb-2" style={{ color: C.mint, fontSize: "0.95rem" }}>{f.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(225,245,238,0.45)" }}>{f.desc}</p>
                <div className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${cat.accent}, transparent)` }} />
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: LANGUAGE ────────────────────────────────────────────────────────
const LANGUAGES = [
  {
    name: "Amharic", native: "አማርኛ", script: "Ge'ez Script",
    speakers: "57M", sample: "ጤናህ ለምን ጥሩ ነው?",
    desc: "The official national language of Ethiopia, spoken by the Amhara and widely as a lingua franca.",
    color: "#1D9E75", flag: "🇪🇹",
  },
  {
    name: "Afaan Oromoo", native: "Afaan Oromoo", script: "Latin Script",
    speakers: "40M", sample: "Fayyaan kee gaarii dhaa?",
    desc: "The most widely spoken Cushitic language in Ethiopia, native to the Oromo people.",
    color: C.gold, flag: "🌱",
  },
  {
    name: "Tigrinya", native: "ትግርኛ", script: "Ge'ez Script",
    speakers: "9M", sample: "ጥዕናኻ ከመይ ኣሎ?",
    desc: "The primary language of Tigray region, with a rich literary tradition spanning centuries.",
    color: "#60a5fa", flag: "🏔",
  },
  {
    name: "English", native: "English", script: "Latin Script",
    speakers: "Global", sample: "How is your wellness today?",
    desc: "Full platform access in English for diaspora communities and international users.",
    color: "#a78bfa", flag: "🌍",
  },
];

function LanguageSection() {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: C.bg }}>
      <GlowOrb x="20%" y="50%" size={700} color={C.emerald} opacity={0.08} />
      <GlowOrb x="80%" y="30%" size={500} color={C.gold} opacity={0.06} />

      {/* Decorative Amharic characters floating */}
      {["ሀ","ለ","ሐ","መ","ሠ","ረ","ሰ","ሸ"].map((c, i) => (
        <div key={i} className="absolute text-6xl select-none pointer-events-none"
          style={{
            left: `${10 + i * 12}%`, top: `${15 + (i % 3) * 25}%`,
            color: C.emerald, opacity: 0.04,
            fontFamily: "serif",
            animation: `floatParticle ${6 + i}s ${i * 0.5}s infinite ease-in-out alternate`,
          }}>
          {c}
        </div>
      ))}

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
            style={{ background: "rgba(29,158,117,0.1)", border: "1px solid rgba(29,158,117,0.2)" }}>
            <Globe size={12} style={{ color: C.emerald }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: C.emerald }}>
              Inclusive Language Experience
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6"
            style={{
              fontFamily: "Georgia, serif",
              letterSpacing: "-0.02em",
              color: C.mint,
            }}>
            Every Voice Deserves
            <br />
            <span style={{
              background: `linear-gradient(135deg, ${C.emerald}, ${C.gold})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              To Be Heard
            </span>
          </h2>
          <p style={{ color: "rgba(225,245,238,0.45)", maxWidth: 500, margin: "0 auto" }}>
            Warka speaks the languages of Ethiopia's diverse peoples — because wellness must feel like home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LANGUAGES.map((lang, i) => (
            <GlassCard
              key={i}
              className="p-7 flex flex-col group overflow-hidden"
              style={{ borderColor: `${lang.color}22` }}
            >
              {/* Flag / emoji */}
              <div className="text-4xl mb-4">{lang.flag}</div>

              {/* Native name */}
              <div className="text-3xl font-black mb-1 leading-tight"
                style={{ color: lang.color, fontFamily: "serif", letterSpacing: "0.02em" }}>
                {lang.native}
              </div>

              {/* Name + script */}
              <div className="font-bold mb-1" style={{ color: C.mint, fontSize: "0.9rem" }}>
                {lang.name}
              </div>
              <div className="text-xs mb-4 opacity-50" style={{ color: C.mint }}>
                {lang.script} · {lang.speakers} speakers
              </div>

              {/* Sample sentence */}
              <div className="flex-1 px-3 py-2 rounded-xl mb-4 text-sm italic"
                style={{
                  background: `${lang.color}12`,
                  border: `1px solid ${lang.color}22`,
                  color: "rgba(225,245,238,0.7)",
                  fontFamily: "Georgia, serif",
                }}>
                "{lang.sample}"
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed" style={{ color: "rgba(225,245,238,0.4)" }}>
                {lang.desc}
              </p>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${lang.color}, transparent)` }} />
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: WARKA SCORE VISUAL ─────────────────────────────────────────────
function ScoreSection() {
  const domains = [
    { label: "Mental", val: 78, color: "#a78bfa" },
    { label: "Nutrition", val: 85, color: C.emerald },
    { label: "Community", val: 91, color: "#60a5fa" },
    { label: "Physical", val: 70, color: C.gold },
    { label: "Cultural", val: 88, color: "#34d399" },
  ];

  return (
    <section className="relative py-32 overflow-hidden"
      style={{ background: `linear-gradient(180deg, #051e17 0%, ${C.bg} 100%)` }}>
      <GlowOrb x="50%" y="50%" size={900} color={C.emerald} opacity={0.07} />

      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Score visual */}
          <div className="relative flex-shrink-0">
            {/* Outer rings */}
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-full relative flex items-center justify-center"
              style={{
                background: `conic-gradient(${C.emerald} 0deg, ${C.gold} 180deg, #1a9470 360deg)`,
                padding: 3,
                boxShadow: `0 0 80px ${C.emerald}44`,
              }}>
              <div className="w-full h-full rounded-full flex items-center justify-center"
                style={{ background: "#060f0c" }}>
                <div className="text-center">
                  <div className="text-7xl font-black" style={{
                    background: `linear-gradient(135deg, ${C.mint}, ${C.gold})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    fontFamily: "Georgia, serif",
                  }}>
                    <AnimNumber to={84} />
                  </div>
                  <div className="text-xs font-bold tracking-widest uppercase mt-1" style={{ color: C.emerald }}>
                    Warka Score
                  </div>
                </div>
              </div>
            </div>
            {/* Floating labels */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: `${C.emerald}22`, color: C.emerald, border: `1px solid ${C.emerald}33` }}>
              Excellent
            </div>
          </div>

          {/* Domain bars */}
          <div className="flex-1 w-full">
            <h3 className="text-3xl font-black mb-8"
              style={{ color: C.mint, fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
              Holistic Intelligence
              <br />
              <span style={{ color: "rgba(225,245,238,0.4)", fontWeight: 300, fontSize: "1.1rem" }}>
                across 5 life domains
              </span>
            </h3>
            <div className="space-y-4">
              {domains.map((d, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-20 text-xs font-semibold" style={{ color: "rgba(225,245,238,0.6)" }}>
                    {d.label}
                  </div>
                  <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${d.val}%`,
                        background: `linear-gradient(90deg, ${d.color}, ${d.color}88)`,
                        boxShadow: `0 0 10px ${d.color}66`,
                      }}
                    />
                  </div>
                  <div className="w-8 text-xs font-bold text-right" style={{ color: d.color }}>{d.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: CTA ─────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="relative py-40 overflow-hidden flex items-center justify-center min-h-screen"
      style={{ background: `radial-gradient(ellipse 100% 80% at 50% 100%, #0a3528 0%, ${C.bg} 60%)` }}>

      {/* Giant orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
        style={{
          width: 800, height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.emerald}33 0%, ${C.gold}11 40%, transparent 70%)`,
          filter: "blur(60px)",
        }} />

      <GlowOrb x="20%" y="30%" size={400} color={C.gold} opacity={0.08} />
      <GlowOrb x="80%" y="40%" size={500} color={C.emerald} opacity={0.1} />
      <Particles count={60} />

      {/* Ethiopian cross decorative */}
      <div className="absolute top-20 left-20 opacity-6" style={{ fontSize: 200, color: C.gold, fontFamily: "serif" }}>✙</div>
      <div className="absolute bottom-20 right-20 opacity-6" style={{ fontSize: 150, color: C.emerald, fontFamily: "serif" }}>✙</div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
          style={{ background: "rgba(212,166,74,0.1)", border: "1px solid rgba(212,166,74,0.25)" }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.gold }} />
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: C.gold }}>
            Begin Your Journey
          </span>
        </div>

        <h2 className="mb-8 leading-none"
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 900,
            fontSize: "clamp(3rem, 8vw, 8rem)",
            letterSpacing: "-0.03em",
          }}>
          <span style={{
            background: `linear-gradient(135deg, ${C.mint} 0%, ${C.emerald} 40%, ${C.gold} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Your Wellness.
            <br />Your Culture.
            <br />Your Future.
          </span>
        </h2>

        <p className="text-xl mb-14 max-w-xl mx-auto"
          style={{ color: "rgba(225,245,238,0.5)", fontFamily: "Georgia, serif", lineHeight: 1.7 }}>
          The first AI platform designed from the roots of Ethiopian culture,
          for the wellness of its people.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <button onClick={() => window.location.hash = "#home"} className="relative px-10 py-5 rounded-full font-bold text-base overflow-hidden group transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${C.emerald}, ${C.deep})`,
              color: C.mint,
              boxShadow: `0 0 60px rgba(29,158,117,0.4), 0 0 120px rgba(29,158,117,0.15)`,
            }}>
            <span className="relative z-10 flex items-center gap-3">
              <Sparkles size={18} />
              Start Your Wellness Journey
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${C.gold}44, ${C.emerald})` }} />
          </button>

          <button onClick={() => window.location.hash = "#community"} className="px-10 py-5 rounded-full font-bold text-base border transition-all duration-300 group"
            style={{
              borderColor: "rgba(212,166,74,0.4)",
              color: C.gold,
              background: "rgba(212,166,74,0.08)",
            }}>
            <span className="flex items-center gap-2">
              <Globe size={16} />
              Join the Warka Ecosystem
            </span>
          </button>
        </div>

        {/* Footer tag */}
        <div className="mt-20 pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderColor: "rgba(29,158,117,0.12)" }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${C.emerald}, ${C.deep})` }}>
              <Leaf size={14} style={{ color: C.mint }} />
            </div>
            <span className="text-lg font-black" style={{ color: C.mint, fontFamily: "Georgia, serif" }}>
              Warka
            </span>
          </div>
          <div className="text-xs" style={{ color: "rgba(225,245,238,0.3)" }}>
            © 2026 Warka Wellness Technologies · Built in Ethiopia, for Ethiopia
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CSS ANIMATIONS ───────────────────────────────────────────────────────────
const globalStyles = `
  @keyframes floatParticle {
    0% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
    50% { opacity: 0.6; }
    100% { transform: translateY(-30px) translateX(15px); opacity: 0.2; }
  }
`;

// ─── APP ──────────────────────────────────────────────────────────────────────
export const HowItWorks = ({ currentLang }) => {
  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ background: C.bg, minHeight: "100vh" }} className="w-full text-left">
        <HeroSection />
        <EcosystemFlow />
        <ScoreSection />
        <FeatureSection />
        <LanguageSection />
        <CTASection />
      </div>
    </>
  );
}

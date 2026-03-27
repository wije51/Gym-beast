import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Sparkles, Star } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

type ParallaxSectionProps = {
  id: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
  imageUrl: string;
};

function CeilingLights() {
  // Geometric ceiling lights overlay (kept as a fixed visual motif)
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10">
      {/* Upper grid */}
      <div className="relative mx-auto h-56 max-w-6xl">
        {/* soft haze */}
        <div className="absolute -top-10 left-1/2 h-44 w-[44rem] -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />
        {/* geometric rails */}
        <div className="absolute left-1/2 top-8 h-44 w-[56rem] -translate-x-1/2">
          <div className="absolute left-1/2 top-0 h-px w-[85%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div className="absolute left-1/2 top-10 h-px w-[92%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute left-1/2 top-20 h-px w-[78%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          {/* diagonals */}
          <div className="absolute left-1/2 top-0 h-36 w-[60%] -translate-x-1/2">
            <div className="absolute left-0 top-2 h-px w-[55%] origin-left rotate-[9deg] bg-white/15" />
            <div className="absolute right-0 top-2 h-px w-[55%] origin-right -rotate-[9deg] bg-white/15" />
            <div className="absolute left-0 top-20 h-px w-[48%] origin-left rotate-[13deg] bg-white/10" />
            <div className="absolute right-0 top-20 h-px w-[48%] origin-right -rotate-[13deg] bg-white/10" />
          </div>
        </div>
        {/* light tubes */}
        <div className="absolute left-1/2 top-14 flex -translate-x-1/2 gap-7">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="relative h-24 w-1 overflow-visible rounded-full bg-white/20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/60 via-white/20 to-transparent" />
              <div className="absolute -inset-x-6 -inset-y-3 rounded-full bg-amber-400/10 blur-2xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LiquidGlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        "rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)] " +
        className
      }
    >
      {children}
    </div>
  );
}

function ParallaxSection({ id, title, kicker, children, imageUrl }: ParallaxSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // subtle cinematic parallax
  const y = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 1], shouldReduce ? [1, 1] : [1.05, 1.05]);

  return (
    <section
      id={id}
      ref={(el) => {
        ref.current = el;
      }}
      className="relative isolate"
    >
      {/* Background image with parallax */}
      <motion.div
        aria-hidden
        style={{ y, scale, backgroundImage: `url(${imageUrl})` }}
        className="absolute inset-0 -z-20 bg-cover bg-center"
      />

      {/* Concrete-ish dark overlay */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-slate-950/55" />
      <div aria-hidden className="absolute inset-0 -z-10 ff-noise" />

      {/* Warm LED wash */}
      <div aria-hidden className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      <div aria-hidden className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="mb-10">
          {kicker ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/40 px-4 py-2 text-xs text-slate-200 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span className="opacity-90">{kicker}</span>
            </div>
          ) : null}
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">{title}</span>
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.a
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      href="#plans"
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/50 px-5 py-3 text-sm font-medium text-white backdrop-blur-md shadow-lg shadow-black/30"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </motion.a>
  );
}

function GhostButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <motion.a
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      href={href}
      className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/30 px-5 py-3 text-sm font-medium text-slate-100 backdrop-blur-md"
    >
      {children}
    </motion.a>
  );
}

function SectionReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduce = useReducedMotion();

  // simple in-view reveal (IntersectionObserver)
  useEffect(() => {
    if (!ref.current || shouldReduce) return;
    const el = ref.current;
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.style.transition = "opacity 700ms ease, transform 700ms ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0px)";
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldReduce]);

  return <div ref={ref}>{children}</div>;
}

export default function Home() {
  const planItems = useMemo(
    () => [
      {
        name: "Starter",
        price: "$19",
        blurb: "Perfect for consistency.",
        perks: ["Gym access", "Cardio zone", "1 body scan"],
      },
      {
        name: "Pro",
        price: "$39",
        blurb: "Strength + performance.",
        perks: ["All Starter perks", "Free weights", "Weekly check-in"],
        featured: true,
      },
      {
        name: "Elite",
        price: "$69",
        blurb: "The cinematic upgrade.",
        perks: ["All Pro perks", "Coach sessions", "Recovery lounge"],
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-950">
      {/* HERO */}
      <div className="relative">
        <CeilingLights />

        <ParallaxSection
          id="home"
          title="Gym Beast"
          kicker="Cinematic training • Dambulla"
          imageUrl="/images/fitflex-hero.jpg"
        >
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <SectionReveal>
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
                  Train with
                  <span className="block bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
                    cinematic focus
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200/90">
                  Premium strength, scenic cardio, and elite coaching—wrapped in a dark, industrial-lux vibe with warm LED lighting.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <PrimaryButton>Explore Plans</PrimaryButton>
                  <GhostButton href="#why">Why Gym Beast</GhostButton>
                  <GhostButton href="#coaches">Meet Coaches</GhostButton>
                </div>

                <div className="mt-10 flex items-center gap-6 text-sm text-slate-200/80">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-300" />
                    <span>Premium equipment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-300" />
                    <span>Scenic views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-300" />
                    <span>Coached progress</span>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal>
              <LiquidGlassCard className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-slate-200/80">Today’s focus</div>
                    <div className="mt-1 text-lg font-semibold text-white">Strength + Mobility</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-900/50 px-3 py-2 text-xs text-slate-100 backdrop-blur-md">
                    Live
                  </div>
                </div>
                <div className="mt-6 grid gap-4">
                  {["Compound lifts", "Form checks", "Recovery stretch"].map((t) => (
                    <motion.div
                      key={t}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/40 px-4 py-3 backdrop-blur-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-400/10">
                          <Check className="h-4 w-4 text-amber-200" />
                        </div>
                        <div className="text-sm text-slate-100">{t}</div>
                      </div>
                      <div className="text-xs text-slate-200/70">45m</div>
                    </motion.div>
                  ))}
                </div>
              </LiquidGlassCard>
            </SectionReveal>
          </div>
        </ParallaxSection>
      </div>

      {/* PLANS */}
      <ParallaxSection
        id="plans"
        title="Plans"
        kicker="Simple membership • Real results"
        imageUrl="/images/fitflex-plans.jpg"
      >
        <SectionReveal>
          <div className="grid gap-6 md:grid-cols-3">
            {planItems.map((p) => (
              <motion.div key={p.name} whileHover={{ scale: 1.03 }} className="h-full">
                <LiquidGlassCard
                  className={
                    "h-full p-6 " +
                    (p.featured ? "ring-1 ring-amber-300/25 shadow-[0_0_80px_rgba(245,158,11,0.10)]" : "")
                  }
                >
                  <div className="flex items-baseline justify-between">
                    <div className="text-lg font-semibold text-white">{p.name}</div>
                    <div className="text-3xl font-semibold text-white">{p.price}</div>
                  </div>
                  <div className="mt-2 text-sm text-slate-200/80">{p.blurb}</div>

                  <div className="mt-6 space-y-3">
                    {p.perks.map((perk) => (
                      <div key={perk} className="flex items-center gap-3 text-sm text-slate-100">
                        <div className="grid h-6 w-6 place-items-center rounded-md bg-amber-400/10">
                          <Check className="h-4 w-4 text-amber-200" />
                        </div>
                        <span className="text-slate-200/90">{perk}</span>
                      </div>
                    ))}
                  </div>

                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    href="#contact"
                    className="mt-7 inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-slate-900/50 px-5 py-3 text-sm font-medium text-white backdrop-blur-md"
                  >
                    Choose {p.name}
                  </motion.a>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </ParallaxSection>

      {/* WHY */}
      <ParallaxSection
        id="why"
        title="Why Gym Beast"
        kicker="Industrial luxury • Perfect form"
        imageUrl="/images/fitflex-why.jpg"
      >
        <SectionReveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Elite equipment",
                desc: "Premium racks, dumbbells, and plates—always organized.",
              },
              {
                title: "Cinematic atmosphere",
                desc: "Dark concrete, warm LEDs, and glass reflections for focus.",
              },
              {
                title: "Guided progress",
                desc: "Coaches who obsess over technique and recovery.",
              },
            ].map((item) => (
              <motion.div key={item.title} whileHover={{ scale: 1.03 }}>
                <LiquidGlassCard className="p-6">
                  <div className="text-base font-semibold text-white">{item.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200/80">{item.desc}</p>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </ParallaxSection>

      {/* COACHES */}
      <ParallaxSection
        id="coaches"
        title="Coaches"
        kicker="Strength • Mobility • Mindset"
        imageUrl="/images/fitflex-coaches.jpg"
      >
        <SectionReveal>
          <div className="grid gap-6 md:grid-cols-3">
            {["Coach Ayesha", "Coach Nimal", "Coach Sahan"].map((name) => (
              <motion.div key={name} whileHover={{ scale: 1.03 }}>
                <LiquidGlassCard className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-base font-semibold text-white">{name}</div>
                    <div className="rounded-full border border-white/10 bg-slate-900/40 px-3 py-1 text-xs text-slate-200/80 backdrop-blur-md">
                      Verified
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-200/80">
                    Precision coaching for strength, posture, and long-term performance.
                  </p>
                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    href="#contact"
                    className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-slate-900/50 px-5 py-3 text-sm font-medium text-white backdrop-blur-md"
                  >
                    Book a session
                  </motion.a>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </ParallaxSection>

      {/* CONTACT ANCHOR (for smooth scroll) */}
      <div id="contact" className="relative bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md">
            <div className="text-lg font-semibold text-white">Get in touch</div>
            <div className="mt-1 text-sm text-slate-200/70">
              Use the Contact page for social links and portfolio.
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-slate-200/70 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Gym Beast</div>
          <div className="flex gap-4">
            <a className="hover:text-white" href="#plans">
              Plans
            </a>
            <a className="hover:text-white" href="#why">
              Why
            </a>
            <a className="hover:text-white" href="#coaches">
              Coaches
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

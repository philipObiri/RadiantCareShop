"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, CalendarCheck, Heart } from "lucide-react";

/* ─── Leaf SVG ──────────────────────────────────────────────────── */
function LeafSVG({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" style={style} aria-hidden>
      <path
        d="M32 4C18 4 8 16 8 32c0 14 8 24 24 24 0-8 8-16 16-24C56 24 52 4 32 4z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M32 58 Q32 32 56 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

/* ─── Ambient leaf positions ────────────────────────────────────── */
const LEAVES = [
  { left: "4%",  top: "12%", size: 68, rot: -20, dur: 7,  delay: 0   },
  { left: "14%", top: "68%", size: 40, rot:  25, dur: 9,  delay: 1.5 },
  { left: "25%", top: "35%", size: 54, rot: -35, dur: 8,  delay: 3   },
  { left: "37%", top: "78%", size: 36, rot:  15, dur: 10, delay: 0.8 },
  { left: "50%", top: "20%", size: 72, rot: -15, dur: 7,  delay: 4   },
  { left: "62%", top: "55%", size: 44, rot:  40, dur: 9,  delay: 2   },
  { left: "74%", top: "18%", size: 58, rot: -10, dur: 8,  delay: 5   },
  { left: "85%", top: "70%", size: 32, rot:  30, dur: 6,  delay: 1   },
  { left: "93%", top: "40%", size: 48, rot: -25, dur: 11, delay: 3.5 },
  { left: "8%",  top: "85%", size: 28, rot:  50, dur: 7,  delay: 6   },
];

/* ─── What we offer ─────────────────────────────────────────────── */
const PILLARS = [
  {
    Icon: ShoppingBag,
    title: "Wellness Products",
    desc: "Supplements, detox kits, and nutrition packs delivered to your door.",
    href: "/shop",
    cta: "Shop Now",
  },
  {
    Icon: CalendarCheck,
    title: "1-on-1 Coaching",
    desc: "Book a 15-minute session with a certified wellness coach today.",
    href: "/book",
    cta: "Book a Session",
  },
  {
    Icon: Heart,
    title: "Personalised Plans",
    desc: "Weekly health plans with daily check-ins and progress tracking.",
    href: "/book",
    cta: "Get Started",
  },
];

export default function HomePage() {
  return (
    <div style={{ overflow: "hidden" }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="px-4 sm:px-6 text-center"
      >
        {/* Ambient leaves */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
          {LEAVES.map((leaf, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: leaf.left,
                top: leaf.top,
                width: leaf.size,
                height: leaf.size,
                color: "var(--primary)",
                opacity: 0.05,
                transform: `rotate(${leaf.rot}deg)`,
                animation: `leaf-float ${leaf.dur}s ${leaf.delay}s infinite ease-in-out`,
              }}
            >
              <LeafSVG style={{ width: "100%", height: "100%" }} />
            </div>
          ))}

          {/* Radial glow */}
          <div
            style={{
              position: "absolute",
              top: "35%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(700px, 100vw)",
              height: 600,
              borderRadius: "50%",
              background: "radial-gradient(ellipse at center, rgba(176,122,47,0.1) 0%, transparent 68%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 780, width: "100%" }}>

          {/* Eyebrow — glass pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex mb-5"
          >
            <span
              className="glass-pill text-xs font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full"
              style={{ color: "var(--primary)" }}
            >
              Premium Wellness Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-display font-bold text-foreground leading-none tracking-tight mb-5"
            style={{ fontSize: "clamp(2.2rem, 7vw, 4.6rem)" }}
          >
            Feel Better.{" "}
            <span style={{ color: "var(--primary)", fontStyle: "italic" }}>Look Radiant.</span>
            <br />
            Live Well.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            className="text-muted text-base sm:text-lg md:text-xl max-w-lg mx-auto mb-9 leading-relaxed px-2"
          >
            Shop premium wellness products, book a personal coaching session,
            or start a guided health plan — all in one place.
          </motion.p>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-7 px-2 sm:px-0"
          >
            <Link
              href="/book"
              className="inline-flex items-center gap-2.5 text-white px-7 py-4 rounded-full text-sm sm:text-base font-bold transition-all duration-200 active:scale-[0.97] w-full sm:w-auto justify-center"
              style={{
                backgroundColor: "var(--primary)",
                boxShadow: "0 8px 36px rgba(176,122,47,0.38)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}
            >
              <CalendarCheck className="w-4 h-4 shrink-0" />
              Book a Session
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2.5 text-foreground px-7 py-4 rounded-full text-sm sm:text-base font-semibold transition-all duration-200 active:scale-[0.97] w-full sm:w-auto justify-center glass-pill"
              style={{ border: "2px solid var(--primary)", color: "var(--primary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--primary-light)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              Shop Products
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── WHAT WE OFFER ────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-20 px-4 sm:px-6"
        style={{ backgroundColor: "var(--surface-raised)" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-10"
          >
            Everything you need to thrive
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {PILLARS.map(({ Icon, title, desc, href, cta }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.09, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shrink-0"
                  style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)" }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-6 flex-1">{desc}</p>
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                  style={{ color: "var(--primary)" }}
                >
                  {cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, CalendarCheck, Leaf, Heart, Zap } from "lucide-react";

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

/* ─── Floating leaf positions ───────────────────────────────────── */
const LEAVES = [
  { left: "6%",  top: "8%",  size: 72,  rot: -20, dur: 8,  delay: 0 },
  { left: "84%", top: "6%",  size: 52,  rot: 30,  dur: 10, delay: 1.5 },
  { left: "90%", top: "50%", size: 88,  rot: -10, dur: 12, delay: 0.8 },
  { left: "3%",  top: "60%", size: 60,  rot: 40,  dur: 9,  delay: 2 },
  { left: "47%", top: "86%", size: 44,  rot: -30, dur: 11, delay: 0.3 },
  { left: "67%", top: "74%", size: 36,  rot: 15,  dur: 7,  delay: 1.2 },
  { left: "19%", top: "36%", size: 28,  rot: 50,  dur: 13, delay: 2.5 },
  { left: "37%", top: "3%",  size: 42,  rot: -45, dur: 9,  delay: 0.6 },
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
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="px-5 text-center"
      >
        {/* Floating leaves — pure CSS animation (translate + transform don't conflict) */}
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
                opacity: 0.08,
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
              width: 700,
              height: 600,
              borderRadius: "50%",
              background: "radial-gradient(ellipse at center, rgba(176,122,47,0.1) 0%, transparent 68%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 780, width: "100%" }}>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-xs font-bold tracking-[0.2em] uppercase mb-5"
            style={{ color: "var(--primary)" }}
          >
            Premium Wellness Platform
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-display font-bold text-foreground leading-none tracking-tight mb-6"
            style={{ fontSize: "clamp(2.4rem, 6.5vw, 4.6rem)" }}
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
            className="text-muted text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Shop premium wellness products, book a personal coaching session,
            or start a guided health plan — all in one place.
          </motion.p>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
          >
            <Link
              href="/book"
              className="inline-flex items-center gap-2.5 text-white px-8 py-4 rounded-full text-base font-bold transition-all duration-200 active:scale-[0.97] w-full sm:w-auto justify-center"
              style={{
                backgroundColor: "var(--primary)",
                boxShadow: "0 8px 36px rgba(176,122,47,0.38)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}
            >
              <CalendarCheck className="w-4 h-4" />
              Book a Session
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2.5 text-foreground px-8 py-4 rounded-full text-base font-semibold transition-all duration-200 active:scale-[0.97] w-full sm:w-auto justify-center border"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--surface-raised)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--surface)")}
            >
              <ShoppingBag className="w-4 h-4" />
              Shop Products
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </Link>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex items-center justify-center gap-6 flex-wrap"
          >
            {["200+ clients", "15-min sessions", "Free consultation", "Loyalty rewards"].map((txt) => (
              <span key={txt} className="flex items-center gap-1.5 text-xs text-muted font-medium">
                <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "var(--primary)", display: "inline-block", opacity: 0.7 }} />
                {txt}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHAT WE OFFER ────────────────────────────────────────── */}
      <section
        className="py-20 px-5"
        style={{ backgroundColor: "var(--surface-raised)" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-10"
          >
            Everything you need to thrive
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PILLARS.map(({ Icon, title, desc, href, cta }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.09, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-7 border flex flex-col"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
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

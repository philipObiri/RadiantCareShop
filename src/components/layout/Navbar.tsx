"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, Sparkles, Menu, X, CalendarCheck } from "lucide-react";
import { useCartStore } from "@/store/cart";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { items, openCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const itemCount = mounted
    ? items.reduce((sum, i) => sum + i.quantity, 0)
    : 0;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-surface/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-surface/80 backdrop-blur-sm"
      )}
    >
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <Sparkles className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <span className="font-display text-[17px] font-semibold text-foreground leading-none">
            RadianceCare
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === href
                  ? "text-primary"
                  : "text-muted hover:text-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Cart */}
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative p-2 rounded-lg hover:bg-surface-raised transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-foreground" strokeWidth={1.75} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>

          {/* Book CTA */}
          <Link
            href="/book"
            className="hidden md:inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-hover active:scale-[0.97] transition-all"
          >
            <CalendarCheck className="w-4 h-4" />
              Book Session
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-raised transition-colors"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface px-5 py-4 flex flex-col gap-3">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setMobileOpen(false)}
            className="mt-1 inline-flex items-center justify-center gap-1.5 bg-primary text-white px-4 py-2.5 rounded-full text-sm font-semibold"
          >
            <CalendarCheck className="w-4 h-4" />
              Book a Session
          </Link>
        </div>
      )}
    </header>
  );
}

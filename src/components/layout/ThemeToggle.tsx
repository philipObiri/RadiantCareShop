"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch (_) {}
  };

  if (!mounted) {
    return <div className="w-11 h-6 rounded-full bg-border" style={{ opacity: 0.4 }} />;
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0"
      style={{ backgroundColor: isDark ? "#B07A2F" : "#D1D5DB" }}
    >
      <span
        className="absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-sm flex items-center justify-center transition-transform duration-300"
        style={{ transform: isDark ? "translateX(21px)" : "translateX(3px)" }}
      >
        {isDark ? (
          <Moon className="w-2.5 h-2.5" style={{ color: "#C8A97E" }} />
        ) : (
          <Sun className="w-2.5 h-2.5 text-amber-500" />
        )}
      </span>
    </button>
  );
}

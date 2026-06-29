import type { ReactNode } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-4 sm:px-6 py-12"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
          style={{ backgroundColor: "var(--primary)" }}
        >
          <Sparkles className="w-4 h-4 text-white" strokeWidth={2} />
        </div>
        <span className="font-display text-xl font-semibold text-foreground">
          RadianceCare
        </span>
      </Link>

      {/* Glass card */}
      <div className="glass-card w-full max-w-md rounded-2xl p-6 sm:p-8">
        {children}
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 py-12"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-10 group">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
          style={{ backgroundColor: "var(--primary)" }}
        >
          <Sparkles className="w-4.5 h-4.5 text-white" strokeWidth={2} />
        </div>
        <span className="font-display text-xl font-semibold text-foreground">
          RadianceCare
        </span>
      </Link>

      {/* Card */}
      <div
        className="w-full max-w-md rounded-2xl border p-8 shadow-sm"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        {children}
      </div>
    </div>
  );
}

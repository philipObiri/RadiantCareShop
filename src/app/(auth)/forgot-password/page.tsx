"use client";
import { useState } from "react";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setLoading(true);
    // Always show success to prevent email enumeration
    await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: "var(--primary-light)" }}>
          <KeyRound className="w-7 h-7" style={{ color: "var(--primary)" }} />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground">Check your email</h1>
        <p className="text-sm text-muted max-w-xs">
          If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset link. It expires in 1 hour.
        </p>
        <Link href="/login" className="mt-4 text-sm font-semibold" style={{ color: "var(--primary)" }}>
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Reset your password</h1>
      <p className="text-sm text-muted mb-7">Enter your email and we&apos;ll send a reset link.</p>

      {error && (
        <div className="mb-4 text-sm px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-red-600">{error}</div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full px-3 py-3 text-sm rounded-lg border outline-none transition-colors"
            style={{ backgroundColor: "var(--surface)", color: "var(--foreground)", borderColor: error ? "#f87171" : "var(--border)" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold text-white transition-all active:scale-[0.97] disabled:opacity-60"
          style={{ backgroundColor: "var(--primary)" }}
        >
          {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Send Reset Link"}
        </button>
      </form>

      <p className="text-center text-sm text-muted mt-6">
        <Link href="/login" className="font-semibold" style={{ color: "var(--primary)" }}>Back to Sign In</Link>
      </p>
    </>
  );
}

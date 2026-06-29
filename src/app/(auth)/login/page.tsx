"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const errParam = searchParams.get("error");
    if (errParam) setError(decodeURIComponent(errParam));
    const msg = searchParams.get("message");
    if (msg) setSuccessMsg(decodeURIComponent(msg));
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic client-side guards
    if (!email.trim() || !password) { setError("Please fill in all fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email address."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }

    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    setLoading(false);

    if (authError) {
      // Normalise Supabase error messages — never expose internal details
      if (authError.message.toLowerCase().includes("invalid login")) {
        setError("Incorrect email or password.");
      } else if (authError.message.toLowerCase().includes("email not confirmed")) {
        setError("Please confirm your email address before signing in.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <>
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Welcome back</h1>
      <p className="text-sm text-muted mb-7">Sign in to your RadianceCare account</p>

      {successMsg && (
        <div className="mb-5 text-sm px-4 py-3 rounded-lg border" style={{ backgroundColor: "var(--primary-light)", borderColor: "var(--primary)", color: "var(--primary)" }}>
          {successMsg}
        </div>
      )}
      {error && (
        <div className="mb-5 text-sm px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} noValidate className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="w-full px-3 py-3 text-sm rounded-lg border outline-none transition-colors"
            style={{ backgroundColor: "var(--surface)", color: "var(--foreground)", borderColor: "var(--border)" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Password</label>
            <Link href="/forgot-password" className="text-xs text-muted hover:text-primary transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
              className="w-full px-3 py-3 pr-10 text-sm rounded-lg border outline-none transition-colors"
              style={{ backgroundColor: "var(--surface)", color: "var(--foreground)", borderColor: "var(--border)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold text-white transition-all active:scale-[0.97] disabled:opacity-60 mt-2"
          style={{ backgroundColor: "var(--primary)" }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "var(--primary-hover)"; }}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              Sign In
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-muted mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold transition-colors" style={{ color: "var(--primary)" }}>
          Create one
        </Link>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

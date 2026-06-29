"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const PASSWORD_RULES = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2)
      e.fullName = "Enter your full name (min 2 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email address.";
    if (!PASSWORD_RULES.test(password))
      e.password = "Min 8 chars, with at least one uppercase letter, one lowercase, and one number.";
    if (password !== confirm)
      e.confirm = "Passwords do not match.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");
    if (!validate()) return;

    setLoading(true);
    const { error: authError } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: { full_name: fullName.trim() },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);

    if (authError) {
      if (authError.message.toLowerCase().includes("already registered")) {
        setGlobalError("An account with this email already exists. Try signing in.");
      } else {
        setGlobalError("Something went wrong. Please try again.");
      }
      return;
    }

    router.push("/check-email");
  };

  const fieldInput = (
    id: string,
    type: string,
    value: string,
    onChange: (v: string) => void,
    placeholder: string,
    autoComplete: string,
    extra?: React.ReactNode
  ) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground capitalize">
        {id === "fullName" ? "Full Name" : id === "confirm" ? "Confirm Password" : id}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => { onChange(e.target.value); setErrors((prev) => ({ ...prev, [id]: "" })); }}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="w-full px-3 py-3 text-sm rounded-lg border outline-none transition-colors"
          style={{
            backgroundColor: "var(--surface)",
            color: "var(--foreground)",
            borderColor: errors[id] ? "#f87171" : "var(--border)",
            paddingRight: extra ? "2.5rem" : undefined,
          }}
          onFocus={(e) => { if (!errors[id]) e.currentTarget.style.borderColor = "var(--primary)"; }}
          onBlur={(e) => { if (!errors[id]) e.currentTarget.style.borderColor = "var(--border)"; }}
        />
        {extra}
      </div>
      {errors[id] && <p className="text-xs text-red-500">{errors[id]}</p>}
    </div>
  );

  const toggleBtn = (field: "password" | "confirm") => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
      aria-label="Toggle password visibility"
    >
      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

  return (
    <>
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Create your account</h1>
      <p className="text-sm text-muted mb-7">Start your wellness journey with RadianceCare</p>

      {globalError && (
        <div className="mb-5 text-sm px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-red-600">
          {globalError}
        </div>
      )}

      <form onSubmit={handleSignup} noValidate className="space-y-4">
        {fieldInput("fullName", "text", fullName, setFullName, "Your full name", "name")}
        {fieldInput("email", "email", email, setEmail, "you@example.com", "email")}
        {fieldInput(
          "password",
          showPassword ? "text" : "password",
          password,
          setPassword,
          "Min 8 chars, upper + lower + number",
          "new-password",
          toggleBtn("password")
        )}
        {fieldInput(
          "confirm",
          showPassword ? "text" : "password",
          confirm,
          setConfirm,
          "Repeat your password",
          "new-password"
        )}

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
              <UserPlus className="w-4 h-4" />
              Create Account
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-muted mt-6">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold transition-colors" style={{ color: "var(--primary)" }}>
          Sign in
        </Link>
      </p>
    </>
  );
}

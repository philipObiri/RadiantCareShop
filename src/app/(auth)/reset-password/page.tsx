"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const PASSWORD_RULES = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!PASSWORD_RULES.test(password)) {
      setError("Min 8 chars, with at least one uppercase letter, one lowercase, and one number.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError("Failed to update password. The link may have expired — request a new one.");
      return;
    }

    router.push("/login?message=Password+updated+successfully.+Please+sign+in.");
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--primary-light)" }}>
          <ShieldCheck className="w-5 h-5" style={{ color: "var(--primary)" }} />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">Set new password</h1>
          <p className="text-xs text-muted">Choose a strong password for your account</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-sm px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-red-600">{error}</div>
      )}

      <form onSubmit={handleReset} noValidate className="space-y-4">
        {(["password", "confirm"] as const).map((field) => (
          <div key={field} className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              {field === "confirm" ? "Confirm new password" : "New password"}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={field === "password" ? password : confirm}
                onChange={(e) => field === "password" ? setPassword(e.target.value) : setConfirm(e.target.value)}
                placeholder={field === "password" ? "Min 8 chars, upper + lower + number" : "Repeat your password"}
                autoComplete="new-password"
                className="w-full px-3 py-3 pr-10 text-sm rounded-lg border outline-none transition-colors"
                style={{ backgroundColor: "var(--surface)", color: "var(--foreground)", borderColor: error ? "#f87171" : "var(--border)" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
              {field === "password" && (
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold text-white transition-all active:scale-[0.97] disabled:opacity-60 mt-2"
          style={{ backgroundColor: "var(--primary)" }}
        >
          {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Update Password"}
        </button>
      </form>
    </>
  );
}

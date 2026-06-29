import Link from "next/link";
import { MailCheck } from "lucide-react";

export default function CheckEmailPage() {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
        style={{ backgroundColor: "var(--primary-light)" }}
      >
        <MailCheck className="w-8 h-8" style={{ color: "var(--primary)" }} strokeWidth={1.75} />
      </div>

      <h1 className="font-display text-2xl font-bold text-foreground">Check your email</h1>
      <p className="text-sm text-muted max-w-xs leading-relaxed">
        We sent a confirmation link to your email address. Click the link to
        activate your account — it expires in 24 hours.
      </p>

      <p className="text-xs text-muted mt-2">
        Didn&apos;t receive it? Check your spam folder or{" "}
        <Link href="/signup" className="font-semibold" style={{ color: "var(--primary)" }}>
          try again
        </Link>
        .
      </p>

      <Link
        href="/login"
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full text-white transition-colors"
        style={{ backgroundColor: "var(--primary)" }}
      >
        Back to Sign In
      </Link>
    </div>
  );
}

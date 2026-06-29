import Link from "next/link";
import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ backgroundColor: "var(--primary-light)" }}
      >
        <WifiOff className="w-7 h-7" style={{ color: "var(--primary)" }} strokeWidth={1.75} />
      </div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-3">You&apos;re offline</h1>
      <p className="text-muted text-sm max-w-xs mb-8 leading-relaxed">
        Check your connection and try again. Your cart and browsing history are saved locally.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-full text-sm font-semibold"
        style={{ backgroundColor: "var(--primary)" }}
      >
        Try again
      </Link>
    </div>
  );
}

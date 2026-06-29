import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="max-w-6xl mx-auto px-5 py-7 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center transition-transform group-hover:scale-105">
            <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2} />
          </div>
          <span className="text-sm font-medium text-muted">
            © 2026 RadianceCare
          </span>
        </Link>
        <div className="flex items-center gap-6 text-xs text-muted">
          <Link href="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <Link href="/book" className="hover:text-foreground transition-colors">
            Book Session
          </Link>
          <span>Built by Philip Obiri</span>
        </div>
      </div>
    </footer>
  );
}

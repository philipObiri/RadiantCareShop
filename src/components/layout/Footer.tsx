import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="max-w-6xl mx-auto px-5 py-7 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/icon.svg"
            alt="RadianceCare"
            width={24}
            height={24}
            className="transition-transform group-hover:scale-105"
          />
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

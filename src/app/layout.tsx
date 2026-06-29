import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/shop/CartDrawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#B07A2F",
};

export const metadata: Metadata = {
  title: { default: "RadianceCare", template: "%s — RadianceCare" },
  description:
    "Premium wellness products, expert coaching sessions, and personalized health plans.",
  keywords: ["wellness", "health", "coaching", "supplements", "detox", "nutrition", "Ghana"],
  openGraph: {
    type: "website",
    siteName: "RadianceCare",
    title: "RadianceCare — Premium Wellness Platform",
    description:
      "Shop premium wellness products, book a personal coaching session, or start a guided health plan.",
    images: [{ url: "/icon.svg", width: 32, height: 32, alt: "RadianceCare logo" }],
  },
  twitter: {
    card: "summary",
    title: "RadianceCare — Premium Wellness Platform",
    description: "Shop premium wellness products and book expert coaching sessions.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <head>
        {/* Blocking script: sets .dark before React hydrates — prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}

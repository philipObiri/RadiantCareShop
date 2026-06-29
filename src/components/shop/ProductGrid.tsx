"use client";
import { useState, useMemo } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import CategoryTabs from "./CategoryTabs";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Insta Lena",
    description:
      "InstaLena Diet Candy — Weight Management Made Simple for Busy Lifestyles. Losing weight shouldn't feel overwhelming. InstaLena is designed for busy professionals who want to manage their weight without sacrificing their lifestyle.",
    price: 290,
    imageUrl:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
    category: "General",
    type: "PHYSICAL",
    stock: 15,
  },
  {
    id: "2",
    name: "Full Deox",
    description:
      "FullDeox Prebiotic Candy — Feel Lighter, Cleaner, More Energised From Within. Sometimes the problem isn't just fatigue or low energy... It's what your body has been holding onto for too long.",
    price: 290,
    imageUrl:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&q=80",
    category: "General",
    type: "PHYSICAL",
    stock: 8,
  },
  {
    id: "3",
    name: "Wellness Coaching Plan",
    description:
      "A comprehensive 4-week digital coaching plan tailored to your wellness goals. Includes daily check-in templates, nutrition guidelines, and personalised coaching materials.",
    price: 450,
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    category: "Coaching",
    type: "DIGITAL",
    stock: 999,
  },
  {
    id: "4",
    name: "Detox Tea Bundle",
    description:
      "Premium herbal detox tea blend from organic farms. Supports liver function, boosts metabolism, and promotes healthy digestion naturally. 30-day supply included.",
    price: 180,
    imageUrl:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80",
    category: "General",
    type: "PHYSICAL",
    stock: 0,
  },
  {
    id: "5",
    name: "Slim Shake",
    description:
      "High-protein meal replacement shake with 25g of protein per serving. Supports muscle recovery, reduces appetite, and fuels your active lifestyle throughout the day.",
    price: 320,
    imageUrl:
      "https://images.unsplash.com/photo-1622484212850-eb596d769edc?w=600&q=80",
    category: "General",
    type: "PHYSICAL",
    stock: 20,
  },
  {
    id: "6",
    name: "Glow Nutrition Pack",
    description:
      "A curated bundle of skin-loving vitamins and antioxidants formulated to enhance your natural glow from the inside out. Perfect for a 3-month skin transformation.",
    price: 380,
    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
    category: "Skincare",
    type: "PHYSICAL",
    stock: 12,
  },
];

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(MOCK_PRODUCTS.map((p) => p.category)));
    return ["All", ...cats];
  }, []);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? MOCK_PRODUCTS
        : MOCK_PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="space-y-8">
      <CategoryTabs
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-muted py-16 text-sm">
          No products in this category yet.
        </p>
      )}
    </div>
  );
}

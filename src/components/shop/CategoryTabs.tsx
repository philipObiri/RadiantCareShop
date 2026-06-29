"use client";

interface CategoryTabsProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryTabs({
  categories,
  active,
  onChange,
}: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
            active === cat
              ? "bg-primary text-white shadow-sm"
              : "bg-surface border border-border text-muted hover:border-primary/40 hover:text-primary"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

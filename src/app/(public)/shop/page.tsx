import ProductGrid from "@/components/shop/ProductGrid";

export const metadata = {
  title: "Shop — RadianceCare",
  description:
    "Handpicked supplements and wellness essentials to support your health journey.",
};

export default function ShopPage() {
  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Wellness Products
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
            Handpicked supplements and wellness essentials to support your health
            journey
          </p>
        </div>

        <ProductGrid />
      </div>
    </div>
  );
}

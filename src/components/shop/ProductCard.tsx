"use client";
import Image from "next/image";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [expanded, setExpanded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const isOutOfStock = product.stock === 0;
  const isLong = product.description.length > 110;

  const handleBuy = () => {
    if (isOutOfStock) return;
    addItem(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  return (
    <>
      <div className="bg-surface rounded-[12px] border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Category badge */}
          <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
            {product.category}
          </span>
          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
              <span className="bg-white text-foreground text-sm font-semibold px-4 py-2 rounded-full shadow">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display font-semibold text-foreground text-[17px] leading-snug">
              {product.name}
            </h3>
            <span className="text-primary font-bold text-base shrink-0">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="mb-4 flex-1">
            <p
              className={`text-sm text-muted leading-relaxed ${
                !expanded ? "line-clamp-2" : ""
              }`}
            >
              {product.description}
            </p>
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-primary font-medium mt-1 hover:underline focus:outline-none"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>

          <button
            onClick={handleBuy}
            disabled={isOutOfStock}
            className="w-full bg-primary text-white py-3 rounded-xl text-sm font-semibold hover:bg-primary-hover active:scale-[0.97] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
          >
            {isOutOfStock ? "Out of Stock" : "Buy Now"}
          </button>
        </div>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-primary text-white px-5 py-3 rounded-full text-sm font-semibold flex items-center gap-2 shadow-xl pointer-events-none"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.94 }}
            transition={{ type: "spring", damping: 22, stiffness: 320 }}
          >
            <CheckCircle className="w-4 h-4" />
            Added to cart
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const computeTotal = (items: CartItem[]): number =>
  items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      total: 0,

      addItem: (product) => {
        const items = get().items;
        const existing = items.find((i) => i.product.id === product.id);
        const updated: CartItem[] = existing
          ? items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          : [...items, { product, quantity: 1 }];
        set({ items: updated, total: computeTotal(updated) });
      },

      removeItem: (productId) => {
        const updated = get().items.filter((i) => i.product.id !== productId);
        set({ items: updated, total: computeTotal(updated) });
      },

      updateQty: (productId, qty) => {
        if (qty < 1) {
          get().removeItem(productId);
          return;
        }
        const updated = get().items.map((i) =>
          i.product.id === productId ? { ...i, quantity: qty } : i
        );
        set({ items: updated, total: computeTotal(updated) });
      },

      clear: () => set({ items: [], total: 0 }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "rc-cart",
      partialize: (state) => ({ items: state.items, total: state.total }),
    }
  )
);

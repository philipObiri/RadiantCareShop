"use client";
import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, CheckCircle, X } from "lucide-react";
import Drawer from "@/components/ui/Drawer";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

type Step = "cart" | "details" | "success";

function loadPaystackScript(): Promise<void> {
  return new Promise((resolve) => {
    if ((window as any).PaystackPop) { resolve(); return; }
    const s = document.createElement("script");
    s.src = "https://js.paystack.co/v1/inline.js";
    s.onload = () => resolve();
    document.head.appendChild(s);
  });
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total, clear } =
    useCartStore();

  const [step, setStep] = useState<Step>("cart");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [paying, setPaying] = useState(false);

  const resetCheckout = () => {
    setStep("cart");
    setName("");
    setEmail("");
    setPhone("");
    setErrors({});
    setPaying(false);
  };

  const handleClose = () => {
    closeCart();
    setTimeout(resetCheckout, 350); // wait for drawer close animation
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim() || name.trim().length < 2) e.name = "Enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) e.phone = "Enter a valid phone number (min 10 digits)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openPaystack = async () => {
    if (!validate()) return;
    setPaying(true);
    try {
      await loadPaystackScript();
      const key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "";
      const handler = (window as any).PaystackPop.setup({
        key,
        email: email.trim(),
        amount: Math.round(total * 100), // pesewas (1 GHS = 100 pesewas)
        currency: "GHS",
        ref: `RC-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        metadata: {
          custom_fields: [
            { display_name: "Customer Name", variable_name: "customer_name", value: name.trim() },
            { display_name: "Phone Number", variable_name: "phone_number", value: phone.trim() },
          ],
        },
        onClose: () => setPaying(false),
        callback: (_response: { reference: string }) => {
          clear();
          setStep("success");
          setPaying(false);
        },
      });
      handler.openIframe();
    } catch {
      setPaying(false);
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      title={step === "details" ? "Checkout" : step === "success" ? " " : "Your Cart"}
      side="right"
    >
      {/* ── EMPTY STATE ─────────────────────────────────────────────── */}
      {items.length === 0 && step !== "success" ? (
        <div className="flex flex-col items-center justify-center h-64 gap-4 text-center px-6 py-12">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--surface-raised)" }}>
            <ShoppingBag className="w-7 h-7 text-muted" strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-semibold text-foreground">Your cart is empty</p>
            <p className="text-sm text-muted mt-1">Add wellness products to get started</p>
          </div>
        </div>
      ) : step === "success" ? (
        /* ── SUCCESS ──────────────────────────────────────────────── */
        <div className="flex flex-col items-center text-center px-6 py-14 gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
            style={{ backgroundColor: "var(--primary-light)" }}
          >
            <CheckCircle className="w-8 h-8" style={{ color: "var(--primary)" }} strokeWidth={1.75} />
          </div>
          <h3 className="font-display text-xl font-bold text-foreground">Payment Successful</h3>
          <p className="text-sm text-muted max-w-xs">
            Your order has been placed. Check your email for a confirmation receipt.
          </p>
          <button
            onClick={handleClose}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full text-white transition-colors"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Done
          </button>
        </div>
      ) : step === "details" ? (
        /* ── CHECKOUT DETAILS FORM ────────────────────────────────── */
        <div className="flex flex-col h-full">
          <div className="flex-1 px-5 py-5 space-y-4 overflow-y-auto">
            {/* Back button */}
            <button
              onClick={() => setStep("cart")}
              className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-2"
            >
              <X className="w-3.5 h-3.5" /> Back to cart
            </button>

            {/* Order summary */}
            <div className="rounded-xl border border-border p-4" style={{ backgroundColor: "var(--surface-raised)" }}>
              <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">Order Summary</p>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-foreground truncate mr-2">{item.product.name} × {item.quantity}</span>
                    <span className="font-semibold text-foreground shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-3 pt-3 flex justify-between font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Contact fields */}
            <div className="space-y-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: undefined })); }}
                  placeholder="Your full name"
                  className="w-full px-3 py-3 text-sm rounded-lg border outline-none transition-all"
                  style={{
                    backgroundColor: "var(--surface)",
                    color: "var(--foreground)",
                    borderColor: errors.name ? "#f87171" : "var(--border)",
                  }}
                  onFocus={(e) => { if (!errors.name) e.currentTarget.style.borderColor = "var(--primary)"; }}
                  onBlur={(e) => { if (!errors.name) e.currentTarget.style.borderColor = "var(--border)"; }}
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
                  placeholder="you@example.com"
                  className="w-full px-3 py-3 text-sm rounded-lg border outline-none transition-all"
                  style={{
                    backgroundColor: "var(--surface)",
                    color: "var(--foreground)",
                    borderColor: errors.email ? "#f87171" : "var(--border)",
                  }}
                  onFocus={(e) => { if (!errors.email) e.currentTarget.style.borderColor = "var(--primary)"; }}
                  onBlur={(e) => { if (!errors.email) e.currentTarget.style.borderColor = "var(--border)"; }}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setErrors((prev) => ({ ...prev, phone: undefined })); }}
                  placeholder="e.g. 0244 123 456"
                  inputMode="tel"
                  autoComplete="tel"
                  className="w-full px-3 py-3 text-sm rounded-lg border outline-none transition-all"
                  style={{
                    backgroundColor: "var(--surface)",
                    color: "var(--foreground)",
                    borderColor: errors.phone ? "#f87171" : "var(--border)",
                  }}
                  onFocus={(e) => { if (!errors.phone) e.currentTarget.style.borderColor = "var(--primary)"; }}
                  onBlur={(e) => { if (!errors.phone) e.currentTarget.style.borderColor = "var(--border)"; }}
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
              </div>
            </div>

            <p className="text-[11px] text-muted leading-relaxed">
              Your details are used only to process this payment via Paystack. We never store card information.
            </p>
          </div>

          <div className="px-5 pb-5 pt-3 border-t border-border shrink-0">
            <button
              onClick={openPaystack}
              disabled={paying}
              className="w-full flex items-center justify-center gap-2 text-white py-3.5 rounded-full text-sm font-bold transition-all active:scale-[0.97] disabled:opacity-60"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {paying ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Opening Paystack…
                </>
              ) : (
                <>
                  Pay {formatPrice(total)}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* ── CART ITEMS ───────────────────────────────────────────── */
        <div className="flex flex-col h-full">
          <div className="flex-1 px-5 py-4 space-y-1 overflow-y-auto min-h-0">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3 py-4 border-b border-border last:border-0">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: "var(--surface-raised)" }}>
                  <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{item.product.name}</p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: "var(--primary)" }}>
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                  <div className="flex items-center gap-2 mt-2.5">
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-md border border-border flex items-center justify-center hover:bg-surface-raised transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-5 text-center tabular-nums text-foreground">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-md border border-border flex items-center justify-center hover:bg-surface-raised transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="ml-auto p-1 rounded-md text-muted hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 py-5 border-t border-border shrink-0" style={{ backgroundColor: "var(--surface)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted">Subtotal</span>
              <span className="text-xl font-bold text-foreground">{formatPrice(total)}</span>
            </div>
            <Button
              variant="primary"
              fullWidth
              size="lg"
              className="rounded-full"
              onClick={() => setStep("details")}
            >
              Proceed to Checkout
            </Button>
            <p className="text-[11px] text-center text-muted mt-2.5">
              Taxes &amp; shipping calculated at checkout
            </p>
          </div>
        </div>
      )}
    </Drawer>
  );
}

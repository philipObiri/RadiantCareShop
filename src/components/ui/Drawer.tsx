"use client";
import { useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  side?: "left" | "right";
}

export default function Drawer({
  isOpen,
  onClose,
  children,
  title,
  side = "right",
}: DrawerProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const xFrom = side === "right" ? "100%" : "-100%";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blurred backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/35"
            style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            className={`fixed top-0 ${side === "right" ? "right-0" : "left-0"} z-50 h-full w-full sm:max-w-sm flex flex-col`}
            style={{
              backgroundColor: "var(--surface)",
              borderRadius: side === "right" ? "1.25rem 0 0 1.25rem" : "0 1.25rem 1.25rem 0",
              boxShadow: "-8px 0 40px rgba(0,0,0,0.18)",
            }}
            initial={{ x: xFrom }}
            animate={{ x: 0 }}
            exit={{ x: xFrom }}
            transition={{ ease: [0.32, 0.72, 0, 1], duration: 0.3 }}
          >
            {title && (
              <div
                className="flex items-center justify-between px-5 sm:px-6 py-5 border-b shrink-0"
                style={{ borderColor: "var(--border)" }}
              >
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-surface-raised transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-muted" />
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto min-h-0">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

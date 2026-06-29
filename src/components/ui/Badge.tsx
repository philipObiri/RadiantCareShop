import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "success" | "warning" | "error" | "muted" | "gold";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary text-white",
  success: "bg-primary-light text-primary",
  warning: "bg-amber-100 text-amber-700",
  error: "bg-red-100 text-red-600",
  muted: "bg-surface-raised text-muted border border-border",
  gold: "bg-gold-light text-amber-800",
};

export default function Badge({
  children,
  variant = "primary",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

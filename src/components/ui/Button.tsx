import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed gap-2",
          size === "sm" && "px-4 py-2 text-sm rounded-lg",
          size === "md" && "px-5 py-2.5 text-sm rounded-xl",
          size === "lg" && "px-7 py-3.5 text-[15px] rounded-xl",
          variant === "primary" &&
            "bg-primary text-white hover:bg-primary-hover active:scale-[0.97] shadow-sm",
          variant === "outline" &&
            "border border-border bg-transparent text-foreground hover:bg-surface-raised active:scale-[0.97]",
          variant === "ghost" &&
            "bg-transparent text-foreground hover:bg-surface-raised",
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;

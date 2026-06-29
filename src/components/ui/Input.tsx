import { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type NativeInput = Omit<InputHTMLAttributes<HTMLInputElement>, "prefix">;

interface InputProps extends NativeInput {
  label?: string;
  error?: string;
  prefix?: ReactNode;
  isRequired?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, prefix, isRequired, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div
          className={cn(
            "flex items-center border rounded-lg bg-surface transition-all",
            error
              ? "border-red-400 focus-within:ring-2 focus-within:ring-red-200"
              : "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10"
          )}
        >
          {prefix && (
            <span className="ml-3 mr-1 px-2 py-1 bg-surface-raised rounded-md text-xs font-semibold text-muted shrink-0 border border-border/50">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              "flex-1 px-3 py-3 text-sm bg-transparent outline-none text-foreground placeholder:text-muted",
              prefix && "pl-1",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
export default Input;

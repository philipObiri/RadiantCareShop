"use client";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { z } from "zod";
import Input from "@/components/ui/Input";
import { useBookingStore } from "@/store/booking";

const schema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^0[2-5][0-9]{8}$/, "Enter a valid Ghana mobile number (e.g. 0244123456)"),
  email: z.string().email("Enter a valid email address"),
  notes: z.string().optional(),
});

type Errors = Partial<Record<"name" | "phone" | "email", string>>;

export interface DetailsFormHandle {
  validate: () => boolean;
}

interface Props {
  onValidChange?: (valid: boolean) => void;
}

const DetailsForm = forwardRef<DetailsFormHandle, Props>(function DetailsForm(
  { onValidChange },
  ref
) {
  const { details, setDetails } = useBookingStore();
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  /* Live validation after a field has been touched */
  useEffect(() => {
    if (Object.keys(touched).length === 0) return;
    const result = schema.safeParse(details);
    const isValid = result.success;
    onValidChange?.(isValid);
    if (!isValid) {
      const fieldErrors: Errors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof Errors;
        if (touched[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details, touched]);

  /* Exposed to parent so it can trigger full validation on Continue */
  useImperativeHandle(ref, () => ({
    validate() {
      setTouched({ name: true, phone: true, email: true });
      const result = schema.safeParse(details);
      if (!result.success) {
        const fieldErrors: Errors = {};
        result.error.issues.forEach((issue) => {
          const key = issue.path[0] as keyof Errors;
          fieldErrors[key] = issue.message;
        });
        setErrors(fieldErrors);
        return false;
      }
      setErrors({});
      return true;
    },
  }));

  const blur = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  return (
    <div className="space-y-4">
      <Input
        label="Name"
        isRequired
        placeholder="Your full name"
        value={details.name}
        onChange={(e) => setDetails({ name: e.target.value })}
        onBlur={() => blur("name")}
        error={errors.name}
        autoComplete="name"
      />

      <Input
        label="Ghana Phone Number"
        isRequired
        placeholder="024 XXX XXXX"
        prefix="GH"
        value={details.phone}
        onChange={(e) => setDetails({ phone: e.target.value })}
        onBlur={() => blur("phone")}
        error={errors.phone}
        inputMode="tel"
        autoComplete="tel"
      />

      <Input
        label="Email"
        isRequired
        type="email"
        placeholder="you@example.com"
        value={details.email}
        onChange={(e) => setDetails({ email: e.target.value })}
        onBlur={() => blur("email")}
        error={errors.email}
        autoComplete="email"
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Notes{" "}
          <span className="text-muted font-normal">(optional)</span>
        </label>
        <textarea
          placeholder="Any special requests..."
          value={details.notes}
          onChange={(e) => setDetails({ notes: e.target.value })}
          rows={4}
          className="border border-border rounded-lg px-3 py-3 text-sm bg-surface text-foreground placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors resize-none"
        />
      </div>
    </div>
  );
});

export default DetailsForm;

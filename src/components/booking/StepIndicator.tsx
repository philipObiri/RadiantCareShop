import { Check } from "lucide-react";

const STEPS = [
  { num: 1, label: "Date" },
  { num: 2, label: "Time" },
  { num: 3, label: "Details" },
  { num: 4, label: "Confirm" },
];

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8 px-2">
      {STEPS.map((step, idx) => {
        const isDone = currentStep > step.num;
        const isActive = currentStep === step.num;

        return (
          <div key={step.num} className="flex items-center">
            {/* Circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isDone
                    ? "bg-primary text-white"
                    : isActive
                    ? "bg-primary text-white ring-4 ring-primary/20"
                    : "bg-surface border-2 border-border text-muted"
                }`}
              >
                {isDone ? (
                  <Check className="w-4.5 h-4.5" strokeWidth={3} />
                ) : (
                  step.num
                )}
              </div>
              <span
                className={`text-[11px] font-semibold tracking-wide ${
                  isActive
                    ? "text-primary"
                    : isDone
                    ? "text-muted"
                    : "text-muted/60"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {idx < STEPS.length - 1 && (
              <div
                className={`w-14 h-0.5 mb-5 mx-0.5 transition-colors duration-300 ${
                  currentStep > step.num ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

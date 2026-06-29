"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronLeft } from "lucide-react";
import { useBookingStore } from "@/store/booking";
import { buildGoogleCalendarLink, generateConfirmationCode } from "@/lib/utils";
import StepIndicator from "@/components/booking/StepIndicator";
import CalendarPicker from "@/components/booking/CalendarPicker";
import TimeSlotList from "@/components/booking/TimeSlotList";
import DetailsForm, {
  type DetailsFormHandle,
} from "@/components/booking/DetailsForm";
import ConfirmSummary from "@/components/booking/ConfirmSummary";
import SuccessScreen from "@/components/booking/SuccessScreen";
import Button from "@/components/ui/Button";

const STEP_META = [
  { title: "Select a Date", subtitle: "Choose a weekday for your session" },
  { title: "Select a Time", subtitle: "" },
  { title: "Your Details", subtitle: "Please provide your contact information" },
  { title: "Confirm Booking", subtitle: "Review your booking details" },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "55%" : "-55%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-55%" : "55%", opacity: 0 }),
};

export default function BookPage() {
  const { step, setStep, selectedDate, selectedSlot, details } =
    useBookingStore();
  const [direction, setDirection] = useState(1);
  const [detailsValid, setDetailsValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");
  const [loading, setLoading] = useState(false);
  const detailsRef = useRef<DetailsFormHandle>(null);

  const canContinue = () => {
    if (step === 1) return !!selectedDate;
    if (step === 2) return !!selectedSlot;
    if (step === 3) return detailsValid;
    return true;
  };

  const goNext = () => {
    if (step === 3) {
      if (!detailsRef.current?.validate()) return;
    }
    setDirection(1);
    setStep(step + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // Simulates POST /api/bookings
    setConfirmCode(generateConfirmationCode());
    setIsSuccess(true);
    setLoading(false);
  };

  const calendarLink =
    selectedDate && selectedSlot
      ? buildGoogleCalendarLink(
          selectedDate,
          selectedSlot.startTime,
          selectedSlot.endTime
        )
      : "#";

  const stepMeta = STEP_META[step - 1];

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-xl mx-auto">
          <SuccessScreen
            confirmationCode={confirmCode}
            calendarLink={calendarLink}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Book Your Wellness Session
          </h1>
          <p className="text-muted text-sm">
            Choose a time that works for you · Confirmed instantly
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold bg-primary-light px-3.5 py-1.5 rounded-full border border-primary/20">
              <Clock className="w-3.5 h-3.5" />
              15 min sessions
            </span>
          </div>
        </div>

        <StepIndicator currentStep={step} />

        {/* Card */}
        <div className="bg-surface border border-border rounded-[12px] overflow-hidden shadow-sm">
          {/* Step header */}
          <div className="px-6 py-5 border-b border-border">
            <h2 className="font-display text-xl font-semibold text-foreground">
              {stepMeta.title}
            </h2>
            {stepMeta.subtitle && (
              <p className="text-sm text-muted mt-0.5">
                {stepMeta.subtitle}
              </p>
            )}
            {step === 2 && selectedDate && (
              <div className="flex items-center gap-3 mt-2">
                <p className="text-sm text-muted">
                  {new Intl.DateTimeFormat("en-GH", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(selectedDate))}
                </p>
                <span className="text-[11px] bg-primary-light text-primary px-2.5 py-0.5 rounded-full font-semibold">
                  15 min session
                </span>
              </div>
            )}
          </div>

          {/* Animated step content */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "tween",
                  ease: [0.32, 0.72, 0, 1],
                  duration: 0.28,
                }}
                className="p-6"
              >
                {step === 1 && <CalendarPicker />}
                {step === 2 && <TimeSlotList />}
                {step === 3 && (
                  <DetailsForm
                    ref={detailsRef}
                    onValidChange={setDetailsValid}
                  />
                )}
                {step === 4 && <ConfirmSummary />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="px-6 pb-6 flex gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={goBack}
                className="flex-1 gap-1"
                size="lg"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            )}

            {step < 4 ? (
              <Button
                variant="primary"
                onClick={goNext}
                disabled={!canContinue()}
                className={`rounded-xl ${step === 1 ? "w-full" : "flex-1"}`}
                size="lg"
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 rounded-xl"
                size="lg"
              >
                {loading ? "Confirming…" : "Confirm Booking"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

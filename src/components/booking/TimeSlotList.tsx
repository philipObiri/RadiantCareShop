"use client";
import { Clock } from "lucide-react";
import { useBookingStore } from "@/store/booking";
import { TimeSlot } from "@/types";
import { formatTime } from "@/lib/utils";

/* Mock slots — in production fetched from GET /api/slots?date=YYYY-MM-DD */
const MOCK_SLOTS: TimeSlot[] = [
  { id: "1", date: "", startTime: "08:00", endTime: "09:00", capacity: 10, spotsLeft: 0 },
  { id: "2", date: "", startTime: "09:00", endTime: "10:00", capacity: 10, spotsLeft: 0 },
  { id: "3", date: "", startTime: "10:00", endTime: "11:00", capacity: 10, spotsLeft: 0 },
  { id: "4", date: "", startTime: "11:00", endTime: "12:00", capacity: 10, spotsLeft: 0 },
  { id: "5", date: "", startTime: "12:00", endTime: "13:00", capacity: 10, spotsLeft: 0 },
  { id: "6", date: "", startTime: "13:00", endTime: "14:00", capacity: 10, spotsLeft: 0 },
  { id: "7", date: "", startTime: "14:00", endTime: "15:00", capacity: 10, spotsLeft: 9 },
  { id: "8", date: "", startTime: "15:00", endTime: "16:00", capacity: 10, spotsLeft: 9 },
  { id: "9", date: "", startTime: "16:00", endTime: "17:00", capacity: 10, spotsLeft: 9 },
];

export default function TimeSlotList() {
  const { selectedSlot, setSlot } = useBookingStore();

  return (
    <div className="space-y-2">
      {MOCK_SLOTS.map((slot) => {
        const isFull = slot.spotsLeft === 0;
        const isSelected = selectedSlot?.id === slot.id;

        return (
          <button
            key={slot.id}
            onClick={() => !isFull && setSlot(slot)}
            disabled={isFull}
            className={[
              "w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-all duration-150",
              isSelected
                ? "border-primary bg-primary/5"
                : isFull
                ? "border-border bg-surface-raised/60 opacity-65 cursor-default"
                : "border-border bg-surface hover:border-primary/40 hover:bg-primary/5 cursor-pointer",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <Clock
                className={`w-4 h-4 shrink-0 ${
                  isSelected ? "text-primary" : "text-muted"
                }`}
                strokeWidth={1.75}
              />
              <span
                className={`text-sm font-medium ${
                  isSelected ? "text-primary" : "text-foreground"
                }`}
              >
                {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
              </span>
            </div>

            {isFull ? (
              <span className="text-[11px] font-bold bg-red-100 text-red-600 px-2.5 py-1 rounded-full">
                Full
              </span>
            ) : (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)" }}>
                {slot.spotsLeft} spots left
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

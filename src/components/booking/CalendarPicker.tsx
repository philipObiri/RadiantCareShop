"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBookingStore } from "@/store/booking";
import { DayStatus } from "@/types";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

/* Mock availability — in production fetched from GET /api/slots/availability */
const MOCK_AVAILABILITY: Record<string, DayStatus> = {
  /* June 2026 */
  "2026-06-30": "available",
  /* July 2026 */
  "2026-07-01": "booked",
  "2026-07-02": "available",
  "2026-07-03": "booked",
  "2026-07-06": "available",
  "2026-07-07": "available",
  "2026-07-08": "booked",
  "2026-07-09": "available",
  "2026-07-10": "available",
  "2026-07-13": "unavailable",
  "2026-07-14": "available",
  "2026-07-15": "available",
  "2026-07-16": "booked",
  "2026-07-17": "available",
  "2026-07-20": "available",
  "2026-07-21": "available",
  "2026-07-22": "available",
  "2026-07-23": "available",
  "2026-07-24": "booked",
  "2026-07-27": "available",
  "2026-07-28": "available",
  "2026-07-29": "available",
  "2026-07-30": "available",
  "2026-07-31": "available",
};

function toKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function CalendarPicker() {
  const today = new Date();
  /* Start on next month if we're in the last week of the current month */
  const startMonth =
    today.getDate() >= 25
      ? new Date(today.getFullYear(), today.getMonth() + 1, 1)
      : new Date(today.getFullYear(), today.getMonth(), 1);
  const [viewDate, setViewDate] = useState(startMonth);
  const { selectedDate, setDate } = useBookingStore();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array<null>(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  return (
    <div>
      <div className="bg-surface rounded-[12px] border border-border overflow-hidden">
        {/* macOS traffic lights */}
        <div className="flex items-center gap-1.5 px-5 pt-4 pb-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-primary/60" />
        </div>

        {/* Month nav */}
        <div className="flex items-center justify-between px-5 py-3">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-lg hover:bg-surface-raised transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 text-muted" />
          </button>
          <span className="font-display font-semibold text-foreground">
            {MONTH_NAMES[month]} {year}
          </span>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-lg hover:bg-surface-raised transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 text-muted" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 px-5 pb-2">
          {DAY_NAMES.map((d) => (
            <div
              key={d}
              className="text-center text-[11px] font-semibold text-muted py-1 tracking-wide"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Cells */}
        <div className="grid grid-cols-7 px-5 pb-5 gap-y-1">
          {cells.map((day, idx) => {
            if (!day) return <div key={`e-${idx}`} />;

            const colIdx = (firstDayOfWeek + day - 1) % 7;
            const isWeekend = colIdx === 0 || colIdx === 6;
            const key = toKey(year, month, day);
            const status = MOCK_AVAILABILITY[key];
            const isSelected = selectedDate === key;
            const isPast =
              new Date(year, month, day) <
              new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const isClickable = !isWeekend && !isPast && status === "available";

            return (
              <button
                key={day}
                onClick={() => isClickable && setDate(key)}
                disabled={!isClickable}
                className={[
                  "w-9 h-9 mx-auto rounded-full flex items-center justify-center text-sm font-medium transition-all duration-150 select-none",
                  isSelected
                    ? "bg-primary text-white shadow-md"
                    : isWeekend || isPast || !status
                    ? "text-muted/35 cursor-default"
                    : status === "available"
                    ? "text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer"
                    : status === "booked"
                    ? "text-red-400 cursor-default"
                    : "text-muted/35 cursor-default",
                ].join(" ")}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-4 flex-wrap">
        {[
          { color: "bg-primary", label: "Selected" },
          { color: "bg-primary", label: "Available" },
          { color: "bg-red-400", label: "Booked" },
          { color: "bg-border", label: "Unavailable" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
            <span className="text-[11px] text-muted">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

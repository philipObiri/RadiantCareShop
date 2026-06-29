"use client";
import { useBookingStore } from "@/store/booking";
import { formatDate, formatTime } from "@/lib/utils";

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-start py-3.5 border-b border-border last:border-0 px-5">
    <span className="text-sm text-muted">{label}</span>
    <span className="text-sm font-medium text-foreground text-right max-w-[60%]">
      {value}
    </span>
  </div>
);

export default function ConfirmSummary() {
  const { selectedDate, selectedSlot, details } = useBookingStore();

  if (!selectedDate || !selectedSlot) return null;

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-surface">
      <Row label="Date" value={formatDate(selectedDate)} />
      <Row label="Time" value={formatTime(selectedSlot.startTime)} />
      <Row label="Duration" value="15 min" />
      <Row label="Name" value={details.name || "—"} />
      <Row label="Phone" value={details.phone || "—"} />
      <Row label="Email" value={details.email || "—"} />
      {details.notes && <Row label="Notes" value={details.notes} />}
    </div>
  );
}

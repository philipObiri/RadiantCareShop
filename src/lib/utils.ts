import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return `₵${amount.toFixed(2)}`;
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-GH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatTime(time: string): string {
  const [hour, min] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 || 12;
  return `${h}:${String(min).padStart(2, "0")} ${period}`;
}

export function generateConfirmationCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return (
    "TWP-" +
    Array.from(
      { length: 6 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("")
  );
}

export function buildGoogleCalendarLink(
  date: string,
  startTime: string,
  endTime: string,
  title = "Wellness Session – RadianceCare"
): string {
  const start = `${date.replace(/-/g, "")}T${startTime.replace(":", "")}00`;
  const end = `${date.replace(/-/g, "")}T${endTime.replace(":", "")}00`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}`;
}

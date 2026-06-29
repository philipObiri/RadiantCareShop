import { create } from "zustand";
import { TimeSlot, BookingDetails } from "@/types";

interface BookingStore {
  step: number;
  selectedDate: string | null;
  selectedSlot: TimeSlot | null;
  details: BookingDetails;
  setStep: (step: number) => void;
  setDate: (date: string) => void;
  setSlot: (slot: TimeSlot) => void;
  setDetails: (details: Partial<BookingDetails>) => void;
  reset: () => void;
}

const defaultDetails: BookingDetails = {
  name: "",
  phone: "",
  email: "",
  notes: "",
};

export const useBookingStore = create<BookingStore>((set) => ({
  step: 1,
  selectedDate: null,
  selectedSlot: null,
  details: defaultDetails,

  setStep: (step) => set({ step }),
  setDate: (date) => set({ selectedDate: date, selectedSlot: null }),
  setSlot: (slot) => set({ selectedSlot: slot }),
  setDetails: (details) =>
    set((state) => ({ details: { ...state.details, ...details } })),
  reset: () =>
    set({
      step: 1,
      selectedDate: null,
      selectedSlot: null,
      details: defaultDetails,
    }),
}));

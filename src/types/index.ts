export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  type: "PHYSICAL" | "DIGITAL";
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  spotsLeft: number;
}

export interface BookingDetails {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

export type DayStatus = "available" | "booked" | "unavailable";

export interface DayAvailability {
  date: string;
  status: DayStatus;
}

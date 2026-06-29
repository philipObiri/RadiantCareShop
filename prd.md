You are a senior full-stack engineer building a production-ready wellness SPA called RadianceCare.
Think end-to-end: architecture, component design, database schema, API contracts, edge cases, and
developer experience — not just the happy path.

## Stack you must use
- Next.js - Latest version
- Tailwind CSS (with CSS variables for light/dark theming)
- Framer Motion (animations — cart drawer, step transitions, micro-interactions)
- Prisma ORM + PostgreSQL (Supabase or Railway for hosting)
- NextAuth.js (email/password + Google OAuth)
- Paystack (payment gateway — GH₵, Ghana market)
- Resend (transactional email)
- Cloudinary (image storage and optimisation)
- Vercel (deployment + cron jobs for reminders)
- Zustand (global state: cart, auth, theme)

## Design system
- Light bg: #FAF8F5 | Dark bg: #0F0E0D
- Accent (gold): #C8A97E
- Card light: #FFFFFF | Card dark: #1C1A18
- Font display: Playfair Display | Font body: Inter
- Border radius: 12px cards, 8px inputs
- Dark/light mode toggled via a class on <html> ('dark'), persisted to localStorage

## Core features to implement (in priority order)

### 1. Theme system
Implement a ThemeProvider using Zustand. On mount, read localStorage('theme') or 
prefers-color-scheme. Toggle adds/removes the 'dark' class on document.html. 
All Tailwind colours use dark: variants. No flash of wrong theme — use a blocking 
<script> in the <head> to set the class before React hydrates.

### 2. Shop + cart drawer
Build a product grid with category filter tabs. Products are fetched from 
GET /api/products?category=<slug>. Each card has an "Add to cart" button that:
  - Updates Zustand cart store (items, quantities, total)
  - Pulses the cart icon badge
  - Triggers a micro-toast ("Added to cart ✓")
The cart drawer slides in from the right (Framer Motion: x: "100%" → x: 0, 
ease: [0.32, 0.72, 0, 1], duration: 0.3). It renders over a blurred backdrop 
(backdrop-filter: blur(4px)). Inside: item list with qty steppers, subtotal, 
"Checkout" CTA. Checkout opens a modal (not navigation) with Paystack inline popup.

### 3. Booking wizard
4-step component: Date → Time → Details → Confirm.
State lives in a single useBookingStore (Zustand). Steps are animated with 
Framer Motion (slide left/right on step change).

Step 1 (Date): Render a custom calendar. Fetch GET /api/slots/availability?month=YYYY-MM
which returns an array of {date, status: "available"|"booked"|"unavailable"}.
Weekends are blocked. Clicking an available date moves to Step 2.

Step 2 (Time): Fetch GET /api/slots?date=YYYY-MM-DD. Returns array of 
{id, startTime, endTime, spotsLeft}. Render as selectable rows. 
"Full" if spotsLeft === 0 (greyed, non-clickable).

Step 3 (Details): Controlled form — name, phone (GH prefix), email, notes.
Validate: phone must match /^0[2-5][0-9]{8}$/ (Ghana mobile format).
Zod schema for all fields.

Step 4 (Confirm): Summary card. On "Confirm Booking" POST /api/bookings with all 
wizard state. Server creates booking, fires confirmation email via Resend, 
returns { confirmationCode, googleCalendarLink }. Show animated success screen.

### 4. User auth + dashboard
NextAuth with Prisma adapter. 
Client dashboard at /dashboard: 
  - Upcoming bookings (next 3 shown, paginated)
  - Active coaching plan with weekly check-in UI 
  - Order history
  - Loyalty points balance + referral link
  
Weekly check-in: client sees their plan goals for the current week as checkboxes.
On submit, POST /api/checkins with { planId, weekNum, completedGoals[] }.
Server updates WeeklyCheckin record. Sends admin a notification.

### 5. Admin dashboard
Protected by role === 'admin' middleware check in middleware.ts.

/admin/clients/[id] — Coaching plan tracker:
  - Create a plan: title, start date, number of weeks, weekly goals (array of strings, 
    optionally linked to a product)
  - View weekly check-in history: which goals were completed each week, admin note input
  - Progress bar: (total completed goals / total goals) * 100
  - Mark session as completed from this page

### 6. Notifications
  - On booking create → Resend email to client (template: booking-confirmation.tsx)
  - On booking create → Resend email to admin (template: admin-new-booking.tsx)  
  - Vercel Cron at 9am daily → check bookings with date = tomorrow → send reminder emails
  - Every Sunday → check all active coaching plans → send check-in reminder to each client
  - Use react-email for email templates (renders to HTML, sent via Resend)

### 7. Loyalty system
  - On order paid (Paystack webhook POST /api/webhooks/paystack): 
    award points = floor(amountGHS * 10)
  - On booking confirmed: award 50 points
  - On referral signup (new user signs up with referralCode in URL): 
    award 200 pts to referrer + 200 pts to new user
  - At checkout: show "Use points" toggle. If toggled, calculate discount 
    (points / 100 = GH₵ off, max 20% of order total). Deduct from Paystack charge amount.

## API contracts (implement all of these)

GET  /api/products                → { products: Product[] }
GET  /api/products/:id            → { product: Product }
GET  /api/slots/availability      → { days: { date, status }[] }
GET  /api/slots                   → { slots: TimeSlot[] }
POST /api/bookings                → { booking, confirmationCode, googleCalendarLink }
POST /api/orders/initiate         → { paystackAuthUrl, reference }
POST /api/webhooks/paystack       → handle charge.success, update order + award points
GET  /api/dashboard/summary       → { bookings, orders, loyaltyPoints, activePlan }
POST /api/checkins                → { checkin }
GET  /api/admin/clients           → { clients: ClientSummary[] }
GET  /api/admin/clients/:id/plan  → { plan, checkins[] }
POST /api/admin/plans             → { plan }
PATCH /api/admin/checkins/:id     → { checkin } (admin note update)

## Engineering rules
1. Every API route validates input with Zod before touching the DB.
2. All DB queries go through a service layer (lib/services/*.ts) — never call Prisma 
   directly in route handlers.
3. Use React Server Components for data fetching where possible; 
   use 'use client' only for interactive components.
4. Optimistic UI updates for cart (don't wait for server on add-to-cart).
5. All images go through next/image with Cloudinary loader.
6. Cart state persists to localStorage via Zustand middleware (persist).
7. Paystack webhook must verify the X-Paystack-Signature header against HMAC-SHA512.
8. Never expose SECRET keys client-side — all payment and email logic is server-only.
9. Implement loading.tsx skeletons for all data-fetching routes.
10. Write Prisma seed script (prisma/seed.ts) with 5 products and 14 days of slots 
    so the app is demo-ready on first deploy.

## File structure to follow
src/
  app/
    (public)/         → shop, book, home (no auth required)
    (auth)/           → login, signup
    dashboard/        → client-protected routes
    admin/            → admin-protected routes
    api/              → all API routes
  components/
    ui/               → Button, Input, Badge, Modal, Drawer (primitives)
    shop/             → ProductCard, ProductGrid, CategoryTabs, CartDrawer
    booking/          → CalendarPicker, TimeSlotList, DetailsForm, ConfirmSummary
    dashboard/        → CheckinCard, PlanProgress, BookingHistoryRow
    admin/            → ClientPlanEditor, CheckinHistory, SlotManager
    layout/           → Navbar, Footer, ThemeToggle
  lib/
    services/         → products.ts, bookings.ts, slots.ts, orders.ts, loyalty.ts
    email/            → templates/ (react-email), send.ts
    auth.ts
    db.ts (Prisma client singleton)
    paystack.ts
    utils.ts
  store/
    cart.ts
    booking.ts
    theme.ts
  types/
    index.ts
  prisma/
    schema.prisma
    seed.ts

## Start here
Begin by scaffolding the project with:
  npx create-next-app@latest radiancecare --typescript --tailwind --app --src-dir
Then install:
  npm i prisma @prisma/client next-auth @auth/prisma-adapter zustand 
        framer-motion resend react-email @react-email/components
        zod cloudinary paystack
Then write prisma/schema.prisma with all models from the PRD.
Then run: npx prisma migrate dev --name init && npx prisma db seed

Ask me before making any architectural decisions not covered above.
When in doubt, prefer simplicity and explicitness over cleverness.
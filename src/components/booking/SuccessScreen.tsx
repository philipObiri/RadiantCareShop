"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Home } from "lucide-react";

interface SuccessScreenProps {
  confirmationCode: string;
  calendarLink: string;
}

export default function SuccessScreen({
  confirmationCode,
  calendarLink,
}: SuccessScreenProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated check */}
      <motion.div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: "var(--primary-light)" }}
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: "spring", damping: 14, stiffness: 220 }}
      >
        <CheckCircle className="w-11 h-11 text-primary" strokeWidth={1.75} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-muted text-sm max-w-xs mx-auto mb-7">
          Your RadianceCare session is booked. Check your email for full
          details and a calendar invite.
        </p>
      </motion.div>

      {/* Confirmation code */}
      <motion.div
        className="bg-surface-raised border border-border rounded-xl px-8 py-5 mb-7 w-full max-w-xs"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-xs text-muted mb-1.5 uppercase tracking-widest font-semibold">
          Confirmation Code
        </p>
        <p className="font-mono text-2xl font-bold text-primary tracking-[0.2em]">
          {confirmationCode}
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col gap-3 w-full max-w-xs"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <a
          href={calendarLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary-hover transition-colors"
        >
          <Calendar className="w-4 h-4" />
          Add to Google Calendar
        </a>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 border border-border text-muted px-6 py-3 rounded-full text-sm font-medium hover:bg-surface-raised transition-colors"
        >
          <Home className="w-4 h-4" />
          Return to Home
        </Link>
      </motion.div>
    </motion.div>
  );
}

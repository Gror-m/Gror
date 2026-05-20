"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function SupportBubble() {
  return (
    <motion.a href="mailto:hello@grormarketing.com" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-white shadow-[0_20px_60px_rgba(124,58,237,0.3)] ring-1 ring-white/40">
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  );
}

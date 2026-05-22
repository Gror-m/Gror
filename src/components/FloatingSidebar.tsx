"use client";

import { motion } from "framer-motion";
import { PhoneCall, MessageCircle, CalendarDays, Mail } from "lucide-react";

const actions = [
  { label: "Call Us", icon: PhoneCall, href: "tel:+919068897893", active: true },
  { label: "WhatsApp", icon: MessageCircle, href: "https://wa.me/919068897893" },
  { label: "Book Call", icon: CalendarDays, href: "#contact" },
  { label: "Email Us", icon: Mail, href: "mailto:info.gror@gmail.com" },
];

export function FloatingSidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 36 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="fixed right-4 bottom-6 z-50 flex w-[80px] flex-col rounded-[16px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 sm:right-5 sm:w-[92px] lg:bottom-auto lg:right-6 lg:top-1/2 lg:-translate-y-1/2"
    >
      {actions.map((action, index) => {
        const Icon = action.icon;
        const isLast = index === actions.length - 1;
        const isActive = action.active;
        return (
          <a
            key={action.label}
            href={action.href}
            className={`group flex ${isActive ? "h-[72px]" : "h-[68px]"} w-full flex-col items-center justify-center gap-1 text-center transition duration-300 ${isActive ? "rounded-t-[16px] bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] text-white" : `bg-white text-[#111827] hover:bg-[#F5EEFF] ${isLast ? "rounded-b-[16px] border-t border-slate-200/60" : "border-t border-slate-200/60"}`}`}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-2xl transition duration-300 ${isActive ? "bg-white/10 text-white" : "bg-white text-[#111827] group-hover:bg-violet-100 group-hover:text-[#5B21B6]"}`}
            >
              <Icon size={18} className={`transition-transform duration-300 ${!isActive ? "group-hover:-translate-y-1" : ""}`} />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] leading-4">
              {action.label}
            </span>
          </a>
        );
      })}
    </motion.aside>
  );
}

"use client";

import { motion } from "framer-motion";
import { LeadGenForm } from "@/components/LeadGenForm";

export function CtaSection() {
  return (
    <section id="contact" className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 lg:px-16">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="rounded-[36px] border border-white/15 bg-white/10 p-10 shadow-[0_40px_100px_rgba(15,23,42,0.14)] backdrop-blur-2xl">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-950/80">Ready To Scale Your Real Estate Growth?</p>
          <h2 className="mt-4 text-4xl font-black text-slate-950 sm:text-5xl">Ready To Scale Your Real Estate Growth?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-700">Let’s build a performance-driven marketing system that generates qualified leads, automates follow-ups, and increases conversions.</p>
          <a href="mailto:info.gror@gmail.com" className="mt-8 inline-flex rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-10 py-4 text-sm font-semibold text-white shadow-[0_24px_60px_rgba(124,58,237,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_34px_80px_rgba(124,58,237,0.34)]">
            Book Your Free Strategy Session
          </a>
        </motion.div>

        <LeadGenForm />
      </div>
    </section>
  );
}

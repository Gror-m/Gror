"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "100Cr+", label: "Revenue Generated" },
  { value: "20,000+", label: "Qualified Leads Delivered" },
  { value: "6.5X", label: "Average ROAS" },
];

export function WhyGrorSection() {
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 lg:px-16">
      <div className="grid gap-12 lg:grid-cols-[1.05fr,_0.95fr] lg:items-center">
        <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-sm uppercase tracking-[0.32em] text-violet-600">ABOUT GROR</p>
          <h2 className="mt-4 max-w-xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">We Build Scalable Real Estate Growth Engines</h2>
          <div className="mt-6 text-[17px] leading-7 italic text-slate-600">
            <p>
              At GROR Marketing, we combine performance marketing, automation, analytics, and conversion psychology to help real estate businesses generate predictable revenue growth. From premium residential projects to commercial developments, we create high-converting digital ecosystems that drive qualified inquiries, increase bookings, and maximize ROI. We don’t just run ads — we build complete growth systems.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.1 }} className="rounded-[32px] border border-white/80 bg-violet-50/70 p-8 shadow-[0_18px_60px_rgba(91,33,182,0.08)] backdrop-blur-xl">
              <p className="text-4xl font-black text-slate-950">{stat.value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.28em] text-slate-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

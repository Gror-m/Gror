"use client";

import { motion } from "framer-motion";

const caseStudies = [
  {
    title: "Luxury Residential Project",
    highlight: "4.8X ROAS • 2,300+ Qualified Leads • 38% Lower CPL",
    badge: "Residential",
  },
  {
    title: "Commercial Property Campaign",
    highlight: "₹12Cr+ Revenue Generated • 5.6X ROI • 42% Increase In Site Visits",
    badge: "Commercial",
  },
  {
    title: "Builder Brand Growth Campaign",
    highlight: "3X Faster Lead Conversion • 8,000+ Leads Generated • 92% Automation Efficiency",
    badge: "Builder",
  },
];

export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 lg:px-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.32em] text-violet-600">Case Studies</p>
        <h2 className="mt-4 text-4xl font-black text-slate-950 sm:text-5xl">Real Results. Real Growth.</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {caseStudies.map((item, index) => (
          <motion.article key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.12 }} className="rounded-[32px] border border-white/80 bg-white/80 p-8 shadow-[0_24px_70px_rgba(91,33,182,0.08)] backdrop-blur-xl hover:-translate-y-1 hover:shadow-[0_35px_90px_rgba(91,33,182,0.12)]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-violet-700">{item.badge}</div>
            <h3 className="text-2xl font-bold text-slate-950">{item.title}</h3>
            <p className="mt-4 text-base leading-7 text-slate-600">{item.highlight}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

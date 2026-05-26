"use client";

import { motion } from "framer-motion";

const steps = [
  { title: "Market & Audience Research", description: "Understand your project, audience behavior, competitors, and growth opportunities." },
  { title: "Strategy & Funnel Planning", description: "Create a custom lead generation strategy with optimized ad funnels and automation flows." },
  { title: "Campaign Launch & Optimization", description: "Launch multi-channel campaigns and continuously optimize for CPL, ROAS, and conversion rates." },
  { title: "Lead Nurturing & Conversion", description: "Automate follow-ups, qualify leads, and help your sales team close more deals faster." },
];

export function ProcessSection() {
  return (
    <section id="process" className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 lg:px-16">
      <div className="rounded-[40px] border border-white/80 bg-white/80 p-8 shadow-[0_30px_110px_rgba(91,33,182,0.08)] backdrop-blur-xl md:p-12">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.32em] text-violet-600">Our Real Estate Growth Process</p>
          <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Our Real Estate Growth Process</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.12 }} className="rounded-3xl bg-slate-950/5 p-6 ring-1 ring-white/70 transition hover:-translate-y-1 hover:bg-white/90 hover:shadow-[0_20px_60px_rgba(91,33,182,0.08)]">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-violet-100 text-violet-700">{index + 1}</div>
              <h3 className="text-xl font-semibold text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

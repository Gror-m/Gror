"use client";

import { motion } from "framer-motion";

const stack = ["Next.js", "React", "TypeScript", "Tailwind", "Three.js", "Prisma", "PostgreSQL", "Redis", "BullMQ", "NextAuth"];

export function TechStackSection() {
  return (
    <section id="technology" className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 lg:px-16">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.32em] text-violet-600">Technology Stack</p>
        <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Built on enterprise-grade modern infrastructure.</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {stack.map((item, index) => (
          <motion.div key={item} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.08 }} className="rounded-[30px] border border-white/80 bg-white/80 p-5 text-center text-sm font-semibold text-slate-900 shadow-[0_20px_50px_rgba(91,33,182,0.06)] backdrop-blur-xl">
            {item}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

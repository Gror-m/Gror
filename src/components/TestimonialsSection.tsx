"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "GROR completely transformed our lead generation system. We started receiving highly qualified inquiries within the first few weeks.",
    name: "Real Estate Developer",
    role: "Client",
  },
  {
    quote: "The automation workflows alone saved our sales team hundreds of hours every month.",
    name: "Managing Director",
    role: "Property Agency",
  },
  {
    quote: "Their performance marketing strategy significantly reduced our CPL while increasing booking quality.",
    name: "Luxury Builder Brand",
    role: "Client",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 lg:px-16">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.32em] text-violet-600">Testimonials</p>
        <h2 className="mt-4 text-4xl font-black text-slate-950 sm:text-5xl">Trusted by ambitious real estate leaders.</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {testimonials.map((item, index) => (
          <motion.div key={item.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.12 }} className="relative overflow-hidden rounded-[36px] border border-white/80 bg-gradient-to-br from-white via-violet-50 to-fuchsia-50 p-8 shadow-[0_30px_90px_rgba(91,33,182,0.08)] backdrop-blur-xl">
            <Quote className="mb-6 h-8 w-8 text-violet-500" />
            <p className="text-lg leading-8 text-slate-700">{item.quote}</p>
            <div className="mt-8">
              <p className="text-base font-semibold text-slate-950">{item.name}</p>
              <p className="text-sm text-slate-500">{item.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

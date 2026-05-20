"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  "/logo.png",
  "/vercel.svg",
  "/file.svg",
  "/globe.svg",
  "/next.svg",
];

export function BrandMarquee() {
  return (
    <section id="brand-logos" className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 lg:px-16">
      <div className="overflow-hidden rounded-[36px] border border-white/20 bg-slate-950/10 shadow-[0_30px_90px_rgba(124,58,237,0.16)] backdrop-blur-xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-5 sm:gap-6">
          {logos.map((src, index) => (
            <div key={`${src}-${index}`} className="flex items-center justify-center rounded-full bg-gradient-to-br from-violet-950/10 via-slate-900/10 to-white/10 p-4 shadow-[0_18px_28px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-white/10">
              <Image src={src} alt={`Partner ${index + 1}`} width={40} height={40} className="rounded-full object-contain" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

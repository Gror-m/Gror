"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MiniParticleGlobe from "./MiniParticleGlobe";

const logoCards = [
  {
    label: "Google Ads",
    description: "High-intent search demand captured with precision bidding and conversion-first creative.",
    logo: "/Google_Ad_Logo.png",
  },
  {
    label: "Meta Ads",
    description: "Premium social demand generation across Facebook and Instagram ecosystems.",
    logo: "/Meta_Ad.png",
  },
];

export function AdsPartnerSection() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-6 py-16 md:px-12 lg:px-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.08),transparent_60%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.06),transparent_70%)]" />
        <MiniParticleGlobe className="absolute inset-0 -z-10 opacity-95" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-violet-400">Trusted Advertising Platforms</p>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          We generate high-intent real estate leads through data-driven advertising systems across Google and Meta platforms.
        </p>
      </div>

      <div className="relative z-10 mt-16 grid gap-8 xl:grid-cols-2">
        {logoCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: index * 0.12, ease: "easeOut" }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="relative overflow-hidden rounded-[40px] border border-white/15 bg-white/10 p-8 shadow-[0_28px_90px_rgba(124,58,237,0.12)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:shadow-[0_36px_100px_rgba(124,58,237,0.18)]"
          >
            <div className="absolute inset-x-6 top-6 h-24 rounded-[32px] bg-violet-500/5 blur-3xl" />
            <div className="relative flex min-h-[280px] flex-col items-center justify-center gap-6 rounded-[32px] px-6 py-10 text-center">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white/100 shadow-[0_24px_48px_rgba(15,23,42,0.12)]">
                <div className="absolute inset-1 rounded-full bg-white/100" />
                <div className="relative flex h-full w-full items-center justify-center rounded-full">
                  <Image src={card.logo} alt={card.label} width={140} height={140} className="object-contain" priority />
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-2xl font-black tracking-[-0.04em] text-slate-950">{card.label}</p>
                <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">{card.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mt-12 text-center">
        <p className="inline-flex rounded-full border border-violet-300/30 bg-violet-50/20 px-5 py-2 text-xs uppercase tracking-[0.4em] text-violet-500 shadow-[0_8px_30px_rgba(168,85,247,0.12)]">
          Our Verified Partners
        </p>
      </div>

      <style jsx>{`
        section {
          isolation: isolate;
        }

        @media (max-width: 1023px) {
          section {
            padding-top: 3.5rem;
            padding-bottom: 3.5rem;
          }
        }

        @media (max-width: 767px) {
          section {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
        }
      `}</style>
    </section>
  );
}

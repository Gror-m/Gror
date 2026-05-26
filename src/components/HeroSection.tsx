"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Facebook, Linkedin, MessageCircle } from "lucide-react";
import { FloatingSidebar } from "@/components/FloatingSidebar";
import GlobeBackground from "@/components/GlobeBackground";

export function GlowingGrorLogo() {
  return (
    <div className="relative flex h-[240px] w-[240px] items-center justify-center rounded-full bg-gradient-to-br from-[#f6f2ff]/90 via-[#fbf3ff]/90 to-[#fff8ff]/90 shadow-[0_0_100px_rgba(124,58,237,0.16)]">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7c3aed]/20 via-[#ec4899]/10 to-transparent blur-3xl" />
      <div className="relative flex h-[220px] w-[220px] items-center justify-center rounded-full bg-transparent shadow-[0_0_80px_rgba(124,58,237,0.12)] overflow-hidden">
        <Image src="/logo.png" alt="GROR Marketing" width={210} height={210} className="object-contain h-[95%] w-[95%]" priority />
      </div>
    </div>
  );
}

export function HeroSection() {
  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/gror_marketing/" },
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61587605125285" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/gror-marketing/?viewAsMember=true" },
    { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/919068897893" },
  ];

  return (
    <section id="home" className="relative overflow-hidden">
      <GlobeBackground />
      <div className="relative px-6 py-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col items-center gap-14 pt-8">
            <div className="flex flex-col items-center gap-6 text-center">
              <GlowingGrorLogo />
            </div>

          <div className="z-10 flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-violet-200/70 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-slate-600 shadow-lg shadow-violet-200/20 backdrop-blur-xl">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700">★</span>
              REAL ESTATE PERFORMANCE MARKETING EXPERTS
            </div>

            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
              <h1 className="text-5xl font-black tracking-[-0.05em] text-slate-950 sm:text-6xl xl:text-7xl">
                Real Estate Lead Generation & Performance Marketing Agency
              </h1>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }} className="max-w-xl text-base font-semibold text-transparent bg-gradient-to-r from-[#7C3AED] via-[#C084FC] to-[#EC4899] bg-clip-text sm:text-lg">
              We help builders, developers, and real estate brands generate high-intent property leads using Google Ads, Meta Ads, landing pages, and automation systems.
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }} className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Scale property lead generation across search and social with proven real estate advertising campaigns, premium landing page experiences, and WhatsApp automation for faster conversion.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }} className="flex flex-col gap-4 sm:flex-row">
              <a href="#contact" className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] px-7 py-4 text-sm font-semibold text-white shadow-[0_24px_60px_rgba(123,58,237,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_90px_rgba(123,58,237,0.34)]">
                <span>📞</span>
                Book Free Strategy Call
              </a>
              <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/95 px-7 py-4 text-sm font-semibold text-slate-950 transition duration-300 hover:border-violet-200 hover:bg-violet-50">
                Explore Growth Solutions
                <span>→</span>
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3, delay: 0.3 }} className="w-full max-w-2xl">
              <div className="grid gap-4 rounded-[32px] border border-white/80 bg-white/75 p-6 shadow-[0_24px_80px_rgba(91,33,182,0.08)] backdrop-blur-xl sm:grid-cols-4">
                {[
                  { value: "100Cr+", label: "Revenue Generated" },
                  { value: "20,000+", label: "Qualified Leads Delivered" },
                  { value: "6.5X", label: "Average ROAS" },
                  { value: "98%", label: "Client Retention" },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-2 text-center">
                    <p className="text-3xl font-bold text-slate-950">{stat.value}</p>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.4 }} className="mt-8 flex items-center justify-center gap-6">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-md transition duration-300 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-600 hover:-translate-y-1"
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>

          </div>
        </div>
      </div>

      <FloatingSidebar />
    </section>
  );
}

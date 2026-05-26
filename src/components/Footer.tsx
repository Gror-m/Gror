"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Contact Us", href: "#contact" },
];

const services = [
  "Performance Marketing for Real Estate",
  "Digital Marketing Services",
  "Social Media Marketing",
  "Real Estate SEO Services",
  "Website & Funnel Development",
  "WhatsApp Automation for Real Estate",
  "CRM & Lead Automation",
];

const company = [
  { label: "About", href: "#about" },
  { label: "Careers", href: "#careers" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-violet-500/10 bg-[#0D0D1A] text-[rgba(255,255,255,0.8)]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="mx-auto grid max-w-[1440px] gap-10 px-6 py-12 md:px-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-16">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600/10 shadow-[0_20px_80px_rgba(124,58,237,0.14)]">
              <Image src="/logo.png" alt="GROR Marketing" width={32} height={32} className="h-8 w-8 rounded-full object-contain" />
            </div>
            <div>
              <p className="text-base font-semibold uppercase tracking-[0.28em] text-white">GROR Marketing</p>
              <p className="text-xs uppercase tracking-[0.3em] text-violet-300">Real Estate Advertising Agency</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[rgba(255,255,255,0.74)]">
            Premium performance marketing and lead generation systems for builders, developers, and real estate brands.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/5 p-4 text-sm text-white/80 shadow-[0_20px_60px_rgba(124,58,237,0.12)]">
              <p className="font-semibold text-white">Lead Generation Agency</p>
              <p className="mt-2 text-[0.93rem] text-slate-300">Google Ads, Meta Ads, and automation for property lead generation.</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-4 text-sm text-white/80 shadow-[0_20px_60px_rgba(124,58,237,0.12)]">
              <p className="font-semibold text-white">Performance Marketing Services</p>
              <p className="mt-2 text-[0.93rem] text-slate-300">Conversion-first real estate campaigns with measurable ROI.</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white">Services</h3>
          <ul className="mt-6 space-y-3 text-sm text-[rgba(255,255,255,0.75)]">
            {services.map((item) => (
              <li key={item} className="transition duration-200 hover:text-white">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white">Company</h3>
          <ul className="mt-6 space-y-3 text-sm text-[rgba(255,255,255,0.75)]">
            {company.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition duration-200 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white">Contact</h3>
          <div className="mt-6 space-y-4 text-sm text-[rgba(255,255,255,0.78)]">
            <p className="font-semibold text-white">info.gror@gmail.com</p>
            <p className="text-[0.95rem] leading-6 text-slate-300">Schedule a free strategy session or ask about property lead generation systems.</p>
            <a href="mailto:info.gror@gmail.com" className="inline-flex rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(124,58,237,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(124,58,237,0.35)]">
              Book a Call
            </a>
          </div>
        </div>
      </motion.div>
      <div className="border-t border-white/10 bg-[#0B0B12] px-6 py-5 text-center text-xs text-[rgba(255,255,255,0.55)] md:px-12">
        © {new Date().getFullYear()} GROR Marketing — Premium real estate marketing agency crafted for builders, developers, and property teams.
      </div>
    </footer>
  );
}

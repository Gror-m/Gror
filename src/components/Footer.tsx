"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Insights", href: "#insights" },
  { label: "Contact Us", href: "#contact" },
];

const services = [
  "Meta Ads",
  "Google Ads",
  "SEO",
  "Website Development",
  "CRM Automation",
  "Lead Generation",
];

const company = [
  { label: "About", href: "#about" },
  { label: "Careers", href: "#careers" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-violet-500/10 bg-[#0D0D1A] text-[rgba(255,255,255,0.7)]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:px-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] lg:items-start lg:px-16">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600/10 shadow-[0_20px_80px_rgba(124,58,237,0.14)]">
              <Image src="/logo.png" alt="GROR Marketing" width={32} height={32} className="h-8 w-8 rounded-full object-contain" />
            </div>
            <p className="text-lg font-semibold text-white">GROR Marketing</p>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[rgba(255,255,255,0.72)]">
            GROR Marketing is a premium real estate performance marketing agency focused on lead generation, automation, branding, and scalable growth systems.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white">Quick Links</h3>
          <ul className="mt-6 space-y-3 text-sm">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition duration-200 hover:text-[#8B5CF6]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white">Services</h3>
          <ul className="mt-6 space-y-3 text-sm">
            {services.map((item) => (
              <li key={item} className="transition duration-200 hover:text-[#8B5CF6]">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white">Company</h3>
          <ul className="mt-6 space-y-3 text-sm">
            {company.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition duration-200 hover:text-[#8B5CF6]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white">Contact</h3>
          <div className="mt-6 space-y-4 text-sm text-[rgba(255,255,255,0.75)]">
            <p>info.gror@gmail.com</p>
            <p className="text-[rgba(255,255,255,0.6)]">We reply within one business day.</p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

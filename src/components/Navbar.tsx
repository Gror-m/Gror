"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-5 left-1/2 z-[9999] w-[min(98vw,1180px)] -translate-x-1/2 rounded-full border backdrop-blur-[20px] transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "bg-gradient-to-r from-[#f3e8ff]/80 to-[#efe0ff]/70 border-violet-300/60 shadow-[0_14px_60px_rgba(124,58,237,0.18)]"
          : "bg-gradient-to-r from-[#f6f0ff]/60 to-[#fdf6ff]/40 border-violet-200/40 shadow-[0_8px_40px_rgba(124,58,237,0.12)]"
      }`}>
      <div className="mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="#home" className="inline-flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden">
            <Image src="/logo.png" alt="Gror Marketing" fill sizes="56px" className="object-contain" priority />
          </div>
          <span className="hidden text-sm font-semibold uppercase tracking-[0.22em] text-slate-950 sm:inline-flex">Gror Marketing</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 transition duration-200 hover:text-violet-600 hover:shadow-[0_0_0_8px_rgba(139,92,246,0.05)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            className="hidden items-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(124,58,237,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(124,58,237,0.35)] md:inline-flex"
          >
            Book Strategy Call
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-900 transition duration-200 hover:border-violet-300 hover:text-violet-600 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="border-t border-white/80 bg-white/90 px-4 py-4 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 transition duration-200 hover:bg-violet-50 hover:text-violet-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  );
}

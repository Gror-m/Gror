"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BarChart3, ShieldCheck, Facebook, Globe, Activity, MonitorPlay } from "lucide-react";

type Service = {
  title: string;
  description: string;
  icon: any;
  extraIcons?: any[];
};

const services: Service[] = [
  {
    title: "Performance Marketing for Real Estate",
    description: "Generate high-intent property leads using Google Ads, Meta Ads, conversion-focused campaigns, landing pages, and data-driven performance marketing systems.",
    icon: BarChart3,
  },
  {
    title: "Digital Marketing Services",
    description: "Complete digital marketing solutions for real estate brands including paid ads, funnels, content strategy, and lead nurturing systems.",
    icon: Globe,
  },
  {
    title: "Social Media Marketing",
    description: "Grow your real estate brand visibility and engagement through strategic social media marketing campaigns.",
    icon: Facebook,
  },
  {
    title: "Search Engine Optimization (SEO)",
    description: "Improve Google rankings, organic traffic, and property lead visibility using SEO strategies built for real estate businesses.",
    icon: Sparkles,
  },
  {
    title: "Website & Funnel Development",
    description: "Premium real estate websites and landing funnels optimized for lead conversion and user experience.",
    icon: MonitorPlay,
  },
  {
    title: "WhatsApp Automation",
    description: "Automate buyer follow-ups, lead nurturing, and customer engagement through WhatsApp workflows.",
    icon: ShieldCheck,
  },
  {
    title: "CRM & Lead Automation",
    description: "Manage and convert leads efficiently using CRM systems, automation workflows, and sales integrations.",
    icon: Activity,
  },
];

const testimonials = [
  {
    name: "Rahul Mehta",
    company: "Luxury Builder Group",
    quote: "GROR completely transformed our lead generation strategy. Within the first month, we started receiving highly qualified buyer inquiries consistently.",
    initials: "RM",
  },
  {
    name: "Priya Sharma",
    company: "Skyline Realty",
    quote: "The automation workflows and WhatsApp integrations saved our sales team countless hours while improving follow-up speed dramatically.",
    initials: "PS",
  },
  {
    name: "Amit Verma",
    company: "UrbanNest Developers",
    quote: "Our CPL dropped significantly after working with GROR. Their campaign optimization and landing pages delivered exceptional ROI.",
    initials: "AV",
  },
  {
    name: "Karan Patel",
    company: "Prime Estates",
    quote: "GROR helped us scale multiple real estate campaigns across Meta and Google with a highly structured performance marketing approach.",
    initials: "KP",
  },
  {
    name: "Sneha Kapoor",
    company: "Elite Spaces",
    quote: "The reporting dashboards, lead quality, and CRM automation completely changed how we manage and convert leads.",
    initials: "SK",
  },
];

export function ServicesSection() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-[80px] md:px-12 lg:px-16">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.32em] text-violet-600">Testimonials</p>
        <p className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
          Trusted by modern real estate brands driving scalable growth with GROR Marketing.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[36px] border border-white/30 bg-white/70 p-6 shadow-[0_30px_90px_rgba(124,58,237,0.14)] backdrop-blur-[24px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.14),transparent_30%)] opacity-90" />
        <div className="relative mx-auto max-w-6xl py-10">
          <div className="pointer-events-none absolute -top-10 left-8 h-44 w-44 rounded-full bg-violet-200/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-8 right-8 h-32 w-32 rounded-full bg-fuchsia-200/20 blur-3xl" />

          <div className="overflow-hidden rounded-[28px] border border-white/50 bg-white/80 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <div
              className="testimonial-row relative overflow-hidden"
              onPointerEnter={() => setIsPaused(true)}
              onPointerLeave={() => setIsPaused(false)}
            >
              <div
                className="testimonial-track flex items-center gap-6"
                style={{ animationPlayState: isPaused ? "paused" : "running" }}
              >
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.name}-${index}`}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="testimonial-card h-[240px] min-w-[360px] max-w-[360px] flex flex-col justify-between rounded-[24px] border border-white/50 bg-white/75 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-[18px] transition duration-300 hover:border-violet-300/70 hover:shadow-[0_20px_80px_rgba(124,58,237,0.16)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 text-sm font-semibold text-slate-950 shadow-sm shadow-violet-200/30">
                        {testimonial.initials}
                      </div>
                      <div>
                        <p className="text-[22px] font-bold text-[#0D0D1A]">{testimonial.name}</p>
                        <p className="mt-1 text-[15px] text-[#64748B]">{testimonial.company}</p>
                      </div>
                    </div>

                    <p className="testimonial-copy mt-4 text-base leading-[1.9] text-[#475569]">
                      “{testimonial.quote}”
                    </p>

                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <span key={starIndex} className="text-base">★</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="services" className="mx-auto mt-12 max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.32em] text-violet-600">Services</p>
        <p className="mt-6 text-3xl font-black text-slate-950 sm:text-4xl">
          Growth Solutions Built For Modern Real Estate Brands
        </p>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              className="rounded-[32px] border border-white/80 bg-white/80 p-8 shadow-[0_24px_80px_rgba(91,33,182,0.06)] backdrop-blur-xl hover:-translate-y-1 hover:shadow-[0_40px_110px_rgba(91,33,182,0.12)] transition duration-300"
            >
              <div className="mb-6 flex h-14 items-center justify-center gap-2 rounded-3xl bg-violet-50 px-3 text-violet-700 shadow-md shadow-violet-200/30">
                <Icon className="h-5 w-5" />
                {service.extraIcons ? (
                  <div className="flex items-center gap-1">
                    {service.extraIcons.map((ExtraIcon, extraIndex) => (
                      <ExtraIcon key={extraIndex} className="h-4 w-4" />
                    ))}
                  </div>
                ) : null}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-950">{service.title}</h3>
              <p className="text-sm leading-7 text-slate-600">{service.description}</p>
            </motion.article>
          );
        })}
      </div>

      <style jsx>{`
        .testimonial-row {
          min-height: 260px;
        }

        .testimonial-track {
          will-change: transform;
          animation: marqueeLeft 18s linear infinite;
        }

        .testimonial-copy {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @keyframes marqueeLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 1023px) {
          .testimonial-card {
            min-width: 320px !important;
            max-width: 320px !important;
            width: 320px !important;
          }
        }

        @media (max-width: 767px) {
          .testimonial-row {
            overflow-x: auto;
          }

          .testimonial-track {
            animation: none;
          }

          .testimonial-card {
            min-width: 280px !important;
            max-width: 280px !important;
            width: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}

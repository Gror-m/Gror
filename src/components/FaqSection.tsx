"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "How quickly can GROR launch a campaign?",
    answer: "Most campaigns are launched within 3-4 days depending on project requirements, creatives, and integrations.",
  },
  {
    question: "Do you provide Meta and Google Ads management?",
    answer: "Yes. We manage complete paid advertising campaigns across Meta, Google, YouTube, and retargeting platforms.",
  },
  {
    question: "Can you integrate our CRM and automation systems?",
    answer: "Absolutely. We support CRM integrations, WhatsApp automation, lead routing, and custom workflow setups.",
  },
  {
    question: "Do you work only with real estate businesses?",
    answer: "Our primary expertise is real estate performance marketing, but we also support premium service-based brands.",
  },
  {
    question: "How do you track campaign performance?",
    answer: "We provide detailed reporting dashboards with CPL, ROAS, conversion tracking, and lead quality insights.",
  },
];

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-16">
      <div className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-[#4B5563]">FAQ</p>
        <h2 className="mt-4 text-5xl font-black text-[#0D0D1A] sm:text-6xl">Questions we answer before launch.</h2>
      </div>

      <div className="mx-auto w-full max-w-3xl space-y-4 rounded-[32px] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.28)] p-1 shadow-[0_40px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
        {faqs.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="border-b border-[rgba(15,23,42,0.08)] last:border-b-0"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition duration-300 hover:bg-white/40"
              >
                <span className="text-lg font-semibold text-[#0D0D1A] sm:text-xl">{item.question}</span>
                <span className={"flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(15,23,42,0.08)] shadow-sm transition duration-300 " + (isOpen ? "bg-violet-600 text-white border-transparent" : "bg-white/75 text-[#0D0D1A]") }>
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="overflow-hidden px-6"
                  >
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="pb-6 text-base leading-8 text-[#64748B]"
                    >
                      {item.answer}
                    </motion.p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

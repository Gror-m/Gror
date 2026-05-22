"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type LeadFormValues = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
};

export function LeadGenForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({ mode: "onTouched" });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  async function onSubmit(values: LeadFormValues) {
    setStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source: "Luxury Website Lead Form",
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData?.message || "Unable to submit lead. Please try again.");
      }

      setStatus("success");
      setStatusMessage("Thank you for your request. We will contact you soon.");
      reset();
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : "Something went wrong, please try again."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[36px] border border-white/15 bg-white/10 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.14)] backdrop-blur-2xl"
      aria-live="polite"
    >
      <div className="mb-8 space-y-4">
        <p className="text-sm uppercase tracking-[0.32em] text-slate-950/80">Book your growth strategy</p>
        <h3 className="text-3xl font-black text-slate-950 sm:text-4xl">Start with a tailored premium plan</h3>
        <p className="text-sm leading-7 text-slate-700">
          Share a few details and we’ll send a custom strategy preview crafted for your real estate business.
        </p>
      </div>

      <div className="grid gap-4">
        <label className="space-y-2 text-sm text-slate-950">
          <span>Name</span>
          <input
            type="text"
            placeholder="John Smith"
            className="h-[58px] w-full rounded-[18px] border border-slate-200/25 bg-white/90 px-4 text-sm text-slate-950 outline-none transition duration-300 hover:border-[#8B5CF6]/40 focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/15 placeholder:text-slate-400"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <span className="text-xs text-pink-500">{errors.name.message}</span>}
        </label>

        <label className="space-y-2 text-sm text-slate-950">
          <span>Email</span>
          <input
            type="email"
            placeholder="hello@grormarketing.com"
            className="h-[58px] w-full rounded-[18px] border border-slate-200/25 bg-white/90 px-4 text-sm text-slate-950 outline-none transition duration-300 hover:border-[#8B5CF6]/40 focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/15 placeholder:text-slate-400"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && <span className="text-xs text-pink-500">{errors.email.message}</span>}
        </label>

        <label className="space-y-2 text-sm text-slate-950">
          <span>Phone</span>
          <input
            type="tel"
            placeholder="XXXXXXXXXX"
            className="h-[58px] w-full rounded-[18px] border border-slate-200/25 bg-white/90 px-4 text-sm text-slate-950 outline-none transition duration-300 hover:border-[#8B5CF6]/40 focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/15 placeholder:text-slate-400"
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && <span className="text-xs text-pink-500">{errors.phone.message}</span>}
        </label>

        <label className="space-y-2 text-sm text-slate-950">
          <span>Company or Agency</span>
          <input
            type="text"
            placeholder="GROR Marketing"
            className="h-[58px] w-full rounded-[18px] border border-slate-200/25 bg-white/90 px-4 text-sm text-slate-950 outline-none transition duration-300 hover:border-[#8B5CF6]/40 focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/15 placeholder:text-slate-400"
            {...register("company")}
          />
        </label>

        <label className="space-y-2 text-sm text-slate-950">
          <span>Message</span>
          <textarea
            placeholder="Tell us what you want to grow next..."
            rows={5}
            className="min-h-[160px] w-full rounded-[18px] border border-slate-200/25 bg-white/90 px-4 py-4 text-sm text-slate-950 outline-none transition duration-300 hover:border-[#8B5CF6]/40 focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/15 placeholder:text-slate-400"
            {...register("message")}
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-6 py-3 text-sm font-semibold text-white shadow-[0_24px_66px_rgba(124,58,237,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_80px_rgba(124,58,237,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Request Strategy Review"}
        </button>

        {status !== "idle" && (
          <div
            className={`mx-auto w-full max-w-2xl rounded-[32px] border p-6 text-sm shadow-[0_24px_80px_rgba(15,23,42,0.12)] ${
              status === "success"
                ? "border-emerald-300/70 bg-emerald-50/90 text-emerald-950"
                : "border-pink-400/70 bg-pink-200/30 text-pink-900"
            }`}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="font-semibold text-lg">{statusMessage}</p>
              </div>
            ) : (
              <p className="font-semibold">{statusMessage}</p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}

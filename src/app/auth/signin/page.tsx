"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.18),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.16),_transparent_26%),#f8f8ff] px-6 py-24 text-slate-950">
      <div className="mx-auto max-w-md rounded-[36px] border border-white/80 bg-white/90 p-10 shadow-[0_40px_120px_rgba(91,33,182,0.12)] backdrop-blur-xl">
        <h1 className="text-3xl font-black">Sign in to GROR</h1>
        <p className="mt-3 text-sm text-slate-600">Access your dashboard, leads, automation workflows, and campaign analytics.</p>
        <form className="mt-8 space-y-6" onSubmit={async (event) => {
          event.preventDefault();
          await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
        }}>
          <label className="block text-sm font-medium text-slate-800">
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" required />
          </label>
          <label className="block text-sm font-medium text-slate-800">
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" required />
          </label>
          <button type="submit" className="w-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] px-6 py-4 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(123,58,237,0.25)] hover:-translate-y-0.5">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}

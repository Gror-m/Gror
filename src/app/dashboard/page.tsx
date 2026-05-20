import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | GROR Marketing",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-12">
        <div className="mb-8 rounded-[36px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-violet-300">Admin Dashboard</p>
              <h1 className="mt-3 text-4xl font-black">Performance summary</h1>
            </div>
            <div className="inline-flex items-center gap-4 rounded-full bg-white/5 px-5 py-3 text-sm text-slate-200">
              <span className="inline-flex h-3 w-3 rounded-full bg-emerald-400" />
              Live analytics enabled
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { label: "Leads captured", value: "1,268" },
            { label: "Pipeline value", value: "₹56.4M" },
            { label: "Campaign ROI", value: "4.6x" },
          ].map((metric) => (
            <div key={metric.label} className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">{metric.label}</p>
              <p className="mt-4 text-3xl font-bold text-white">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

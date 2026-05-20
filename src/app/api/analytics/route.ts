import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    revenue: "₹12.5CR",
    leads: 1280,
    conversionRate: "7.4%",
    roi: "4.6x",
    activeCampaigns: 12,
  });
}

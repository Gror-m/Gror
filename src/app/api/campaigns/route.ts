import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

export async function GET() {
  const campaigns = await prisma.campaign.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ campaigns });
}

export async function POST(request: Request) {
  const body = await request.json();

  const campaign = await prisma.campaign.create({
    data: {
      name: body.name,
      description: body.description,
      status: body.status || "DRAFT",
      channel: body.channel || "EMAIL",
      roi: body.roi || 0,
      impressions: body.impressions || 0,
      clicks: body.clicks || 0,
    },
  });

  return NextResponse.json({ campaign }, { status: 201 });
}

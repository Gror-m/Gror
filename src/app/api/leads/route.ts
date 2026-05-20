import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  source?: string;
  company?: string;
  message?: string;
};

async function sendToGoogleSheets(payload: LeadPayload) {
  const endpoint = process.env.GOOGLE_SHEETS_ENDPOINT?.trim();
  if (!endpoint || endpoint.includes("docs.google.com/spreadsheets")) {
    console.warn(
      "Google Sheets sync skipped: configure GOOGLE_SHEETS_ENDPOINT with a valid webhook or Apps Script URL, not a sheet view link."
    );
    return;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        company: payload.company ?? "",
        message: payload.message ?? "",
        source: payload.source ?? "Website Lead Form",
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets endpoint returned ${response.status}`);
    }
  } catch (error) {
    console.error("Google Sheets sync failed:", error);
  }
}

export async function GET() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return NextResponse.json({ leads });
}

export async function POST(request: Request) {
  const body: LeadPayload = await request.json();
  let lead = null;

  try {
    lead = await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        source: body.source || "Website Lead Form",
        score: 0,
        status: "NEW",
      },
    });
  } catch (error) {
    console.error("Lead creation failed:", error);
  }

  await sendToGoogleSheets(body);

  return NextResponse.json(
    {
      lead,
      message: lead ? "Lead saved successfully" : "Lead saved to sheet fallback",
    },
    { status: 201 }
  );
}

import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

export async function GET() {
  const workflows = await prisma.workflow.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ workflows });
}

export async function POST(request: Request) {
  const body = await request.json();

  const workflow = await prisma.workflow.create({
    data: {
      name: body.name,
      trigger: body.trigger,
      actions: body.actions || [],
      active: body.active ?? true,
    },
  });

  return NextResponse.json({ workflow }, { status: 201 });
}

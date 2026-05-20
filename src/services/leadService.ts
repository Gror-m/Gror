import { prisma } from "@/server/db";

export async function createLead(data: { name: string; email: string; phone: string; source?: string }) {
  return prisma.lead.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      source: data.source || "website",
      score: 0,
      status: "NEW",
    },
  });
}

export async function getLeads() {
  return prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
}

import type { CampaignChannel, CampaignStatus } from "@prisma/client";
import { prisma } from "@/server/db";

export async function createCampaign(data: { name: string; description?: string; status?: CampaignStatus; channel?: CampaignChannel }) {
  return prisma.campaign.create({
    data: {
      name: data.name,
      description: data.description,
      status: data.status || "DRAFT",
      channel: data.channel || "EMAIL",
    },
  });
}

export async function getCampaigns() {
  return prisma.campaign.findMany({ orderBy: { updatedAt: "desc" } });
}

import { prisma } from "@/server/db";

export async function createWorkflow(data: { name: string; trigger: string; actions: any[]; active?: boolean }) {
  return prisma.workflow.create({
    data: {
      name: data.name,
      trigger: data.trigger,
      actions: data.actions,
      active: data.active ?? true,
    },
  });
}

export async function getWorkflows() {
  return prisma.workflow.findMany({ orderBy: { updatedAt: "desc" } });
}

import { Queue, Worker } from "bullmq";
import { redis } from "@/server/redis";

export const leadQueue = new Queue("lead-queue", { connection: redis });
export const campaignQueue = new Queue("campaign-queue", { connection: redis });

export const worker = new Worker(
  "lead-queue",
  async (job) => {
    if (job.name === "lead:create") {
      console.log("Processing lead task", job.data);
    }
  },
  { connection: redis }
);

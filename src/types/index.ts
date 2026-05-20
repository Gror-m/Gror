export type Role = "admin" | "manager" | "sales" | "client";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  organizationId?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: "new" | "contacted" | "nurturing" | "closed";
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: "draft" | "active" | "paused" | "completed";
  channel: "email" | "whatsapp" | "ads";
  leads: number;
  roi: number;
  createdAt: string;
}

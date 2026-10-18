import { User } from "@/types";

export const DEMO_USERS: Record<string, User> = {
  buyer: {
    id: "usr-buyer-001",
    name: "Ananya Sharma",
    email: "ananya.sharma@example.com",
    role: "buyer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    phone: "+91 98765 43210",
  },
  seller: {
    id: "usr-seller-002",
    name: "Haji Mohammad Irfan",
    email: "irfan.bunkar@swadesh.crafts",
    role: "seller",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    phone: "+91 94500 12890",
    sellerId: "seller-bunkar-samiti",
  },
  admin: {
    id: "usr-admin-003",
    name: "Vikramaditya Roy",
    email: "admin@swadesh.gov.in",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    phone: "+91 99000 88776",
  },
};

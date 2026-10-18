"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRole, SavedAddress } from "@/types";
import { DEMO_USERS } from "@/data/mockUsers";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  addresses: SavedAddress[];
  login: (email: string, role?: UserRole) => void;
  quickSwitchRole: (role: UserRole) => void;
  logout: () => void;
  addAddress: (address: Omit<SavedAddress, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  updateProfile: (profile: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: DEMO_USERS.buyer,
      isAuthenticated: true,
      addresses: [
        {
          id: "addr-1",
          fullName: "Ananya Sharma",
          phone: "+91 98765 43210",
          street: "Flat 402, Nilgiri Heritage Heights, 12th Main Road, Indiranagar",
          landmark: "Near Defense Colony Club",
          city: "Bengaluru",
          state: "Karnataka",
          pincode: "560038",
          addressType: "Home",
          isDefault: true,
        },
        {
          id: "addr-2",
          fullName: "Ananya Sharma",
          phone: "+91 98765 43210",
          street: "Studio 18, Mehrauli Heritage Complex, Qutub Road",
          landmark: "Opposite Jamali Kamali Mosque",
          city: "New Delhi",
          state: "Delhi",
          pincode: "110030",
          addressType: "Work",
          isDefault: false,
        },
      ],

      login: (email: string, role: UserRole = "buyer") => {
        const found = Object.values(DEMO_USERS).find((u) => u.email.toLowerCase() === email.toLowerCase());
        const user = found || {
          id: `usr-${Date.now()}`,
          name: email.split("@")[0].replace(".", " "),
          email,
          role,
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        };
        set({ user, isAuthenticated: true });
      },

      quickSwitchRole: (role: UserRole) => {
        const user = DEMO_USERS[role] || DEMO_USERS.buyer;
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      addAddress: (newAddr) => {
        set((state) => {
          const id = `addr-${Date.now()}`;
          let updated = [...state.addresses];
          if (newAddr.isDefault) {
            updated = updated.map((a) => ({ ...a, isDefault: false }));
          }
          return { addresses: [...updated, { ...newAddr, id }] };
        });
      },

      removeAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        }));
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        }));
      },

      updateProfile: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    }),
    {
      name: "swadesh-auth-storage",
      skipHydration: true,
    }
  )
);

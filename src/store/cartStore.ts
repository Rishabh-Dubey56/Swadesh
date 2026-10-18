"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types";

export interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number;
  description: string;
  minOrder?: number;
}

export const VALID_COUPONS: Record<string, Coupon> = {
  SWADESH10: {
    code: "SWADESH10",
    type: "percent",
    value: 10,
    description: "10% off on your artisan order",
  },
  UTSAV500: {
    code: "UTSAV500",
    type: "fixed",
    value: 500,
    minOrder: 3000,
    description: "₹500 festive discount on orders above ₹3,000",
  },
  CULTURE20: {
    code: "CULTURE20",
    type: "percent",
    value: 20,
    minOrder: 8000,
    description: "20% off on heritage orders above ₹8,000",
  },
};

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  appliedCoupon: Coupon | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getShippingFee: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [
        {
          id: "prod-banarasi-katan-saree-Free Size-Crimson Maroon",
          productId: "prod-banarasi-katan-saree",
          name: "Handwoven Banarasi Katan Pure Silk Saree",
          slug: "banarasi-katan-pure-silk-saree",
          image:
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
          price: 18500,
          quantity: 1,
          selectedSize: "Free Size (5.5m + 0.8m Blouse Piece)",
          selectedColor: "Crimson Maroon",
          stateName: "Uttar Pradesh",
          craftType: "Kadhwa Zari Weave",
        },
      ],
      isOpen: false,
      appliedCoupon: VALID_COUPONS["SWADESH10"],

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (item, quantity = 1) => {
        set((state) => {
          const cartItemId = `${item.productId}-${item.selectedSize || "default"}-${item.selectedColor || "default"}`;
          const existingIndex = state.items.findIndex((i) => i.id === cartItemId);

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += quantity;
            return { items: updated, isOpen: true };
          }

          return {
            items: [...state.items, { ...item, id: cartItemId, quantity }],
            isOpen: true,
          };
        });
      },

      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      applyCoupon: (code: string) => {
        const clean = code.trim().toUpperCase();
        const coupon = VALID_COUPONS[clean];

        if (!coupon) {
          return { success: false, message: "Invalid coupon code. Try SWADESH10, UTSAV500, or CULTURE20." };
        }

        const subtotal = get().getSubtotal();
        if (coupon.minOrder && subtotal < coupon.minOrder) {
          return {
            success: false,
            message: `Minimum order of ₹${coupon.minOrder.toLocaleString("en-IN")} required for ${coupon.code}.`,
          };
        }

        set({ appliedCoupon: coupon });
        return { success: true, message: `Coupon ${coupon.code} applied successfully!` };
      },

      removeCoupon: () => set({ appliedCoupon: null }),

      clearCart: () => set({ items: [], appliedCoupon: null }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const coupon = get().appliedCoupon;
        if (!coupon || subtotal === 0) return 0;

        if (coupon.type === "percent") {
          return Math.round((subtotal * coupon.value) / 100);
        } else {
          return Math.min(coupon.value, subtotal);
        }
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0 || subtotal >= 2500) return 0;
        return 150;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const shipping = get().getShippingFee();
        return Math.max(0, subtotal - discount + shipping);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "swadesh-cart-storage",
      skipHydration: true,
    }
  )
);

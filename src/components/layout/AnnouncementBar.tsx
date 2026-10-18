"use client";

import React, { useState } from "react";
import { Sparkles, ShieldCheck, Truck, UserCircle2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { UserRole } from "@/types";

export function AnnouncementBar() {
  const user = useAuthStore((s) => s.user);
  const quickSwitchRole = useAuthStore((s) => s.quickSwitchRole);
  const [copied, setCopied] = useState(false);

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText("SWADESH10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#4F0E11] text-[#F5EBDD] text-xs py-2 px-4 border-b border-[#C7A46A]/20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Assurance Highlights */}
        <div className="flex items-center gap-4 text-[11px] sm:text-xs">
          <span className="flex items-center gap-1.5 font-medium text-[#E0C496]">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Handloom Certified &amp; GI Tagged
          </span>
          <span className="hidden md:inline-block text-[#C7A46A]/40">•</span>
          <span className="hidden md:flex items-center gap-1.5 text-[#F5EBDD]/90">
            <Truck className="w-3.5 h-3.5" />
            Complimentary Artisan Shipping over ₹2,500
          </span>
        </div>

        {/* Center: Promo Coupon Code */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] sm:text-xs text-[#FAF4EB]/80">
            Artisan Celebration:
          </span>
          <button
            onClick={handleCopyCoupon}
            title="Click to copy coupon code"
            className="inline-flex items-center gap-1 bg-[#6E171B] border border-[#C7A46A]/40 px-2 py-0.5 rounded-xs text-[#E0C496] font-mono text-[11px] hover:border-[#C7A46A] transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[#C7A46A]" />
            <span>SWADESH10</span>
            <span className="text-[10px] text-[#FAF4EB]/70 ml-0.5">
              {copied ? "(Copied!)" : "(10% Off)"}
            </span>
          </button>
        </div>

        {/* Right: Demo Role Switcher */}
        <div className="hidden lg:flex items-center gap-2 text-[11px]">
          <span className="text-[#E0C496]/80 flex items-center gap-1">
            <UserCircle2 className="w-3.5 h-3.5" />
            Demo Role:
          </span>
          <select
            value={user?.role || "buyer"}
            onChange={(e) => quickSwitchRole(e.target.value as UserRole)}
            className="bg-[#282522] border border-[#C7A46A]/40 text-[#E0C496] text-[11px] rounded-xs px-2 py-0.5 focus:outline-none focus:border-[#C7A46A] cursor-pointer"
            aria-label="Switch Demo User Role"
          >
            <option value="buyer">Patron (Buyer)</option>
            <option value="seller">Artisan Guild (Seller)</option>
            <option value="admin">Platform Admin</option>
          </select>
        </div>
      </div>
    </div>
  );
}

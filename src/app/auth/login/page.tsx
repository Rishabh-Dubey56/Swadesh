"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, UserCircle2, Store, ShieldAlert, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, quickSwitchRole } = useAuthStore();
  const [email, setEmail] = useState("ananya.sharma@example.com");
  const [password, setPassword] = useState("••••••••");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, "buyer");
    router.push("/account");
  };

  const handleQuickRole = (role: "buyer" | "seller" | "admin") => {
    quickSwitchRole(role);
    if (role === "seller") router.push("/seller");
    else if (role === "admin") router.push("/admin");
    else router.push("/account");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-6">
      {/* Brand Heading */}
      <div className="text-center space-y-2">
        <span className="font-serif text-2xl font-bold tracking-[0.25em] text-[#6E171B] uppercase">
          SWADESH
        </span>
        <h1 className="font-serif text-2xl font-bold text-[#282522]">
          Sign In to Your Cultural Account
        </h1>
        <p className="text-xs text-[#776B5E]">
          Access your handloom orders, saved weaves, and artisan messages
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm p-6 sm:p-8 space-y-5 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3.5 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
              placeholder="e.g. patron@swadesh.in"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E]">
                Password
              </label>
              <span className="text-[10px] text-[#9C7942] cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3.5 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" className="w-full">
              <span>Sign In as Patron</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </form>

        {/* 1-Click Demo Logins */}
        <div className="pt-4 border-t border-[#E8DCCD] space-y-2">
          <p className="text-[11px] font-semibold text-center text-[#776B5E] uppercase tracking-wider">
            Instant Demo 1-Click Access
          </p>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleQuickRole("buyer")}
              className="w-full flex items-center justify-between p-2.5 rounded-xs border border-[#E8DCCD] bg-[#FAF4EB] hover:bg-[#F5EBDD] text-xs transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2">
                <UserCircle2 className="w-4 h-4 text-[#6E171B]" />
                <div>
                  <p className="font-semibold text-[#282522]">Patron (Buyer)</p>
                  <p className="text-[10px] text-[#776B5E]">Ananya Sharma • Orders &amp; Wishlist</p>
                </div>
              </div>
              <span className="text-[10px] text-[#6E171B] font-bold">Launch →</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickRole("seller")}
              className="w-full flex items-center justify-between p-2.5 rounded-xs border border-[#E8DCCD] bg-[#FAF4EB] hover:bg-[#F5EBDD] text-xs transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-[#C45538]" />
                <div>
                  <p className="font-semibold text-[#282522]">Master Artisan (Seller)</p>
                  <p className="text-[10px] text-[#776B5E]">Varanasi Bunkar Guild • Inventory &amp; Sales</p>
                </div>
              </div>
              <span className="text-[10px] text-[#C45538] font-bold">Launch →</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickRole("admin")}
              className="w-full flex items-center justify-between p-2.5 rounded-xs border border-[#E8DCCD] bg-[#FAF4EB] hover:bg-[#F5EBDD] text-xs transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#6E171B]" />
                <div>
                  <p className="font-semibold text-[#282522]">Platform Administrator</p>
                  <p className="text-[10px] text-[#776B5E]">Vikramaditya Roy • GMV &amp; Approvals</p>
                </div>
              </div>
              <span className="text-[10px] text-[#6E171B] font-bold">Launch →</span>
            </button>
          </div>
        </div>

        {/* Create account link */}
        <div className="pt-2 text-center text-xs text-[#776B5E]">
          Don&apos;t have an account yet?{" "}
          <Link href="/auth/register" className="text-[#6E171B] font-semibold hover:underline">
            Register Here
          </Link>
        </div>
      </div>

      <div className="text-center text-[11px] text-[#776B5E] flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#C7A46A]" />
        <span>Demo environment: No real authentication credentials stored.</span>
      </div>
    </div>
  );
}

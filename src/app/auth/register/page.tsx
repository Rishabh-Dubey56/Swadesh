"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || "patron@swadesh.in", "buyer");
    router.push("/account");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-6">
      <div className="text-center space-y-2">
        <span className="font-serif text-2xl font-bold tracking-[0.25em] text-[#6E171B] uppercase">
          SWADESH
        </span>
        <h1 className="font-serif text-2xl font-bold text-[#282522]">
          Join the Cultural Community
        </h1>
        <p className="text-xs text-[#776B5E]">
          Preserve generational looms and wear authentic heritage fashion
        </p>
      </div>

      <div className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm p-6 sm:p-8 space-y-4 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priyamvada Joshi"
              className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3.5 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. priyamvada@example.com"
              className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3.5 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
              Mobile Contact *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3.5 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
              Create Password *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3.5 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" className="w-full">
              <span>Create Cultural Account</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </form>

        <div className="pt-3 border-t border-[#E8DCCD] text-center text-xs text-[#776B5E]">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#6E171B] font-semibold hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}

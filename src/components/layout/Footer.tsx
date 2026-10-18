"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Award,
  RefreshCw,
  Send,
  CheckCircle2,
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#282522] text-[#F5EBDD] pt-16 pb-12 border-t border-[#C7A46A]/30">
      {/* Upper Trust Badges Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#776B5E]/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#4F0E11] text-[#E0C496] flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-semibold text-sm text-[#E0C496]">
              100% Handloom Certified
            </h4>
            <p className="text-xs text-[#EAE2D5]/70 mt-1">
              Silk Mark India &amp; GI Tagged Authenticity
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#4F0E11] text-[#E0C496] flex items-center justify-center mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-semibold text-sm text-[#E0C496]">
              Direct to Loom Fair Trade
            </h4>
            <p className="text-xs text-[#EAE2D5]/70 mt-1">
              Direct value to 500+ master weaver families
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#4F0E11] text-[#E0C496] flex items-center justify-center mb-3">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-semibold text-sm text-[#E0C496]">
              7-Day Cultural Heritage Returns
            </h4>
            <p className="text-xs text-[#EAE2D5]/70 mt-1">
              Hassle-free doorstep exchanges &amp; returns
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#4F0E11] text-[#E0C496] flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-semibold text-sm text-[#E0C496]">
              28 States, Infinite Stories
            </h4>
            <p className="text-xs text-[#EAE2D5]/70 mt-1">
              Preserving living traditions across India
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-[0.25em] text-[#C7A46A] uppercase">
                SWADESH
              </span>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#E0C496]/80 font-medium">
                Discover India. Wear Culture.
              </p>
            </Link>
            <p className="text-xs leading-relaxed text-[#EAE2D5]/80 max-w-sm">
              SWADESH is India&apos;s premier cultural fashion sanctuary. We curate rare handloom textiles, royal brocades, indigenous crafts, and artisan narratives directly from master weavers across all 28 Indian States.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-[#E0C496] mb-2 uppercase tracking-wider">
                The Heritage Chronicle (Newsletter)
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 p-2.5 rounded-sm border border-emerald-800">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Dhanyavaad! You are subscribed to our monthly textile journals.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email for artisan chronicles"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#1A1816] border border-[#776B5E]/50 rounded-sm px-3.5 py-2 text-xs text-[#F5EBDD] placeholder-[#776B5E] focus:outline-none focus:border-[#C7A46A]"
                  />
                  <button
                    type="submit"
                    className="bg-[#C7A46A] hover:bg-[#E0C496] text-[#282522] px-4 py-2 rounded-sm text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Join</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Regional Textiles Column */}
          <div>
            <h5 className="font-serif text-sm font-semibold text-[#E0C496] uppercase tracking-wider mb-4">
              Regional Weaves
            </h5>
            <ul className="space-y-2.5 text-xs text-[#EAE2D5]/75">
              <li>
                <Link href="/products?search=Banarasi" className="hover:text-[#C7A46A] transition-colors">
                  Banarasi Katan Brocades
                </Link>
              </li>
              <li>
                <Link href="/products?search=Kanjeevaram" className="hover:text-[#C7A46A] transition-colors">
                  Kanchipuram Korvai Silks
                </Link>
              </li>
              <li>
                <Link href="/products?search=Pashmina" className="hover:text-[#C7A46A] transition-colors">
                  Kashmiri Handspun Pashmina
                </Link>
              </li>
              <li>
                <Link href="/products?search=Chanderi" className="hover:text-[#C7A46A] transition-colors">
                  Chanderi Gossamer Pattu
                </Link>
              </li>
              <li>
                <Link href="/products?search=Paithani" className="hover:text-[#C7A46A] transition-colors">
                  Yeola Paithani Sarees
                </Link>
              </li>
              <li>
                <Link href="/products?search=Ajrakh" className="hover:text-[#C7A46A] transition-colors">
                  Kutch Natural Dye Ajrakh
                </Link>
              </li>
              <li>
                <Link href="/states" className="text-[#C7A46A] font-medium hover:underline inline-block pt-1">
                  Explore All 28 States →
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div>
            <h5 className="font-serif text-sm font-semibold text-[#E0C496] uppercase tracking-wider mb-4">
              Patron Care
            </h5>
            <ul className="space-y-2.5 text-xs text-[#EAE2D5]/75">
              <li>
                <Link href="/account" className="hover:text-[#C7A46A] transition-colors">
                  Track Your Artisan Order
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-[#C7A46A] transition-colors">
                  Shipping &amp; Delivery Timeline
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-[#C7A46A] transition-colors">
                  Returns &amp; Loom Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#C7A46A] transition-colors">
                  Silk Mark &amp; GI Tag FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C7A46A] transition-colors">
                  Contact Curators &amp; Loom Concierge
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#C7A46A] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#C7A46A] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Artisan & Dashboards */}
          <div>
            <h5 className="font-serif text-sm font-semibold text-[#E0C496] uppercase tracking-wider mb-4">
              Artisan Guilds
            </h5>
            <ul className="space-y-2.5 text-xs text-[#EAE2D5]/75">
              <li>
                <Link href="/seller" className="hover:text-[#C7A46A] transition-colors">
                  Weaver &amp; Seller Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#C7A46A] transition-colors">
                  Platform Admin Portal
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-[#C7A46A] transition-colors">
                  Artisan Living Narratives
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C7A46A] transition-colors">
                  Fair Wage &amp; Loom Direct Pledge
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C7A46A] transition-colors">
                  Register Your Weaver Co-operative
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Simulated Payment Notice & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#776B5E]/30 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-[#776B5E]">
        <div>
          <p className="text-[11px] text-[#EAE2D5]/60">
            © {new Date().getFullYear()} SWADESH Cultural Marketplace. Crafted with reverence for India&apos;s 7 million handloom artisans.
          </p>
          <p className="text-[10px] text-[#C7A46A]/80 mt-1">
            *SIMULATED PROTOTYPE: All payments, orders, and authentication are strictly demonstration simulations. No real financial transactions occur.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-[#EAE2D5]/70 bg-[#1A1816] px-3 py-1.5 rounded-sm border border-[#776B5E]/30">
          <span>Accepted (Simulated):</span>
          <span className="text-[#C7A46A]">UPI</span> • <span>RuPay</span> • <span>NetBanking</span> • <span>Visa / MC</span> • <span>COD</span>
        </div>
      </div>
    </footer>
  );
}

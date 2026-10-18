import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Award, Sparkles, Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-[#282522] text-[#FFF9F0]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1800&q=80"
            alt="Handloom pit loom master weaver"
            fill
            priority
            className="object-cover opacity-35 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#282522] via-[#282522]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center space-y-6">
          <span className="inline-block bg-[#6E171B] text-[#E0C496] border border-[#C7A46A]/40 text-xs uppercase font-bold tracking-[0.25em] px-3.5 py-1.5 rounded-full">
            The SWADESH Cultural Manifesto
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Preserving India&apos;s Loom Legacy for the Next Thousand Years
          </h1>
          <p className="text-sm sm:text-base text-[#F5EBDD]/90 max-w-2xl mx-auto leading-relaxed font-light">
            India is home to over 7 million handloom weavers and craftspeople—custodians of an unbroken 5,000-year textile civilization. SWADESH exists to ensure this genius thrives with sovereignty, fair value, and global pride.
          </p>
        </div>
      </section>

      {/* 2. The 4 Cultural Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
            Core Commitments
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#6E171B]">
            The 4 Pillars of SWADESH
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#6E171B] text-[#E0C496] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#6E171B]">
              1. GI Tag Integrity
            </h3>
            <p className="text-xs text-[#776B5E] leading-relaxed">
              Every weave is verified against its Geographical Indication origin. We defend traditional clusters against synthetic powerloom copies.
            </p>
          </div>

          <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#6E171B] text-[#E0C496] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#6E171B]">
              2. Direct-to-Loom Equity
            </h3>
            <p className="text-xs text-[#776B5E] leading-relaxed">
              By removing five tiers of commercial middlemen, over 80% of retail price returns directly to the weaving families and cooperative funds.
            </p>
          </div>

          <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#6E171B] text-[#E0C496] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#6E171B]">
              3. Silk Mark &amp; Lab Purity
            </h3>
            <p className="text-xs text-[#776B5E] leading-relaxed">
              Tested natural fibers only: pure mulberry Katan, 12-micron Changthangi cashmere, organic linen, and tested silver zari.
            </p>
          </div>

          <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#6E171B] text-[#E0C496] flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#6E171B]">
              4. 28 States Living Map
            </h3>
            <p className="text-xs text-[#776B5E] leading-relaxed">
              We document oral histories, craft songs, natural dye recipes, and generational techniques across all 28 states of the Indian republic.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The 7 Million Artisan Pledge Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#6E171B] text-[#FFF9F0] rounded-sm p-8 sm:p-14 border border-[#C7A46A]/50 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#E0C496]">
              A Pledge of Cultural Conscience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Wear Culture. Preserve Humanity.
            </h2>
            <p className="text-xs sm:text-sm text-[#F5EBDD]/90 leading-relaxed font-light">
              Fast fashion pollutes our waters and reduces weavers to factory labourers. When you choose a SWADESH handloom, you wear months of human meditation, protect riverbed dye traditions, and bless a weaver&apos;s hearth.
            </p>
            <div className="pt-2">
              <Link href="/products">
                <Button variant="gold" size="md">
                  <span>Explore Handcrafted Collections</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="p-6 bg-[#4F0E11] rounded-sm border border-[#C7A46A]/30 space-y-3 text-xs text-[#E0C496]">
            <h4 className="font-serif text-base font-bold text-[#FFF9F0]">
              Certified Governance
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">✓ Verified Geographical Indication Registry</li>
              <li className="flex items-center gap-2">✓ Ministry of Textiles Handloom Mark</li>
              <li className="flex items-center gap-2">✓ Silk Mark Organization of India</li>
              <li className="flex items-center gap-2">✓ UNESCO Cultural Heritage Recognition</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

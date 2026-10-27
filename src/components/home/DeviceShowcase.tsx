import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/ScrollAnimation";

export function DeviceShowcase() {
  return (
    <section className="py-14 sm:py-20 bg-[#FFF9F0] border-t border-[#E8DCCD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-10 h-[1px] bg-[#C7A46A]" />
            <span className="text-[10px] text-[#C7A46A] tracking-[0.3em] uppercase font-semibold">✦</span>
            <span className="w-10 h-[1px] bg-[#C7A46A]" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#282522] uppercase tracking-[0.12em]">
            Swadesh Traditional Wear
          </h2>
          <p className="text-xs sm:text-sm text-[#776B5E] mt-2">
            Seamless responsive craftsmanship engineered across every screen and device
          </p>
        </ScrollReveal>

        {/* 4 Device Mockups Row matching the reference image bottom section */}
        <StaggerGroup
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-end justify-center"
          staggerDelay={0.12}
        >
          {/* 1. Laptop: Homepage */}
          <StaggerItem yOffset={35}>
            <Link href="/" className="group flex flex-col items-center">
            <div className="relative w-full max-w-[280px] transition-transform duration-300 group-hover:-translate-y-1">
              {/* Laptop Screen Frame */}
              <div className="bg-[#1C1A18] rounded-t-lg p-1.5 pt-2 shadow-xl border border-[#3A3530]">
                {/* Camera dot */}
                <div className="w-1 h-1 bg-white/30 rounded-full mx-auto mb-1" />
                {/* Screen Content */}
                <div className="relative aspect-[16/10] bg-[#FFF9F0] rounded-xs overflow-hidden border border-[#282522]/30">
                  <Image
                    src="/images/hero-banner.jpg"
                    alt="Homepage preview"
                    fill
                    sizes="260px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-2 text-center">
                    <span className="font-serif text-[10px] font-bold text-white tracking-widest uppercase">
                      SWADESH
                    </span>
                    <span className="text-[7px] text-[#E0C496]">
                      Discover India. Wear Culture.
                    </span>
                  </div>
                </div>
              </div>
              {/* Laptop Base */}
              <div className="bg-[#2C2926] h-3 rounded-b-md shadow-md border-t border-[#4A4540] flex items-center justify-center">
                <div className="w-10 h-0.5 bg-[#4A4540] rounded-full" />
              </div>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#282522] mt-4 group-hover:text-[#6E171B] transition-colors">
              Homepage
            </span>
          </Link>
        </StaggerItem>

        {/* 2. Laptop: 28 States Explorer */}
        <StaggerItem yOffset={35}>
          <Link href="/states" className="group flex flex-col items-center">
            <div className="relative w-full max-w-[280px] transition-transform duration-300 group-hover:-translate-y-1">
              {/* Laptop Screen Frame */}
              <div className="bg-[#1C1A18] rounded-t-lg p-1.5 pt-2 shadow-xl border border-[#3A3530]">
                <div className="w-1 h-1 bg-white/30 rounded-full mx-auto mb-1" />
                {/* Screen Content: Mini 28-state grid mockup */}
                <div className="relative aspect-[16/10] bg-[#FAF4EB] rounded-xs overflow-hidden border border-[#282522]/30 p-1.5">
                  <div className="text-[6px] font-bold text-center text-[#282522] uppercase tracking-wider mb-1">
                    EXPLORE 28 STATES
                  </div>
                  <div className="grid grid-cols-7 gap-0.5">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-[4/3] bg-[#E8DCCD] rounded-[1px] overflow-hidden relative"
                      >
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundColor: [
                              "#C45538",
                              "#6E171B",
                              "#C7A46A",
                              "#282522",
                              "#776B5E",
                            ][i % 5],
                            opacity: 0.7,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Laptop Base */}
              <div className="bg-[#2C2926] h-3 rounded-b-md shadow-md border-t border-[#4A4540] flex items-center justify-center">
                <div className="w-10 h-0.5 bg-[#4A4540] rounded-full" />
              </div>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#282522] mt-4 group-hover:text-[#6E171B] transition-colors">
              28 States Explorer
            </span>
          </Link>
        </StaggerItem>

        {/* 3. Tablet: State Page (Kashmir) */}
        <StaggerItem yOffset={35}>
          <Link href="/states/jammu-and-kashmir" className="group flex flex-col items-center">
            <div className="relative w-full max-w-[240px] transition-transform duration-300 group-hover:-translate-y-1">
              {/* Tablet Frame */}
              <div className="bg-[#1C1A18] rounded-xl p-2.5 shadow-xl border border-[#3A3530]">
                <div className="w-1 h-1 bg-white/30 rounded-full mx-auto mb-1.5" />
                {/* Tablet Screen */}
                <div className="relative aspect-[4/3] bg-[#FFF9F0] rounded-sm overflow-hidden border border-[#282522]/30">
                  <Image
                    src="/images/kashmir-hero.jpg"
                    alt="Kashmir State Page Preview"
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-2">
                    <span className="font-serif text-[9px] font-bold text-white uppercase leading-tight">
                      JAMMU &amp; KASHMIR
                    </span>
                    <span className="text-[7px] text-[#E0C496]">
                      Heaven of Natural Beauty
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#282522] mt-4 group-hover:text-[#6E171B] transition-colors">
              State Page (Kashmir)
            </span>
          </Link>
        </StaggerItem>

        {/* 4. Mobile: Product Page */}
        <StaggerItem yOffset={35}>
          <Link href="/products/kashmiri-pheran" className="group flex flex-col items-center">
            <div className="relative w-full max-w-[170px] transition-transform duration-300 group-hover:-translate-y-1">
              {/* Mobile Phone Frame */}
              <div className="bg-[#1C1A18] rounded-2xl p-2 shadow-xl border border-[#3A3530]">
                {/* Dynamic Island / Speaker */}
                <div className="w-8 h-1 bg-black rounded-full mx-auto mb-1 border border-white/20" />
                {/* Phone Screen */}
                <div className="relative aspect-[9/16] bg-[#FFF9F0] rounded-lg overflow-hidden border border-[#282522]/30">
                  <Image
                    src="/images/kashmiri-pheran.jpg"
                    alt="Kashmiri Pheran Product Preview"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xs p-1.5 border-t border-[#E8DCCD]">
                    <p className="text-[8px] font-bold text-[#282522] truncate">
                      Kashmiri Pheran
                    </p>
                    <p className="text-[7px] text-[#6E171B] font-bold">
                      ₹2,499 <span className="line-through text-[#776B5E] text-[6px]">₹3,499</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#282522] mt-4 group-hover:text-[#6E171B] transition-colors">
              Product Page
            </span>
          </Link>
        </StaggerItem>
      </StaggerGroup>
    </div>
  </section>
);
}

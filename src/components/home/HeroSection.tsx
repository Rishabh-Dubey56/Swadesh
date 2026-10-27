"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { EASE_PREMIUM } from "@/components/ui/ScrollAnimation";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Subtle parallax on the background image during scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden h-[540px] sm:h-[620px] lg:h-[680px]"
    >
      {/* Background Image with subtle parallax */}
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : bgY,
          scale: shouldReduceMotion ? 1 : bgScale,
        }}
        className="absolute inset-0 z-0 origin-center"
      >
        <Image
          src="/images/hero-banner.jpg"
          alt="Indian cultural heritage landscape with majestic architecture and traditional attire"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle gradient vignette to ensure pristine text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18]/85 via-[#1C1A18]/35 to-[#1C1A18]/50" />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Centered Editorial Typography with staggered smooth entrance */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          {/* Top Filigree Ornament */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
            className="flex items-center justify-center gap-3"
          >
            <span className="w-12 h-[1px] bg-[#C7A46A]/80" />
            <span className="text-[#E0C496] text-sm sm:text-base font-serif">⚜</span>
            <span className="w-12 h-[1px] bg-[#C7A46A]/80" />
          </motion.div>

          {/* Brand Title */}
          <motion.h1
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease: EASE_PREMIUM }}
            className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[0.14em] text-[#FFF9F0] uppercase leading-none drop-shadow-md"
          >
            SWADESH
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease: EASE_PREMIUM }}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FFF9F0] font-normal italic tracking-wide drop-shadow-sm"
          >
            Discover India. Wear Culture.
          </motion.p>

          {/* Supporting Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.52, ease: EASE_PREMIUM }}
            className="text-xs sm:text-sm lg:text-base text-[#F5EBDD] font-light tracking-[0.2em] uppercase"
          >
            28 States. 28 Cultures. Infinite Stories.
          </motion.p>

          {/* Primary CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.68, ease: EASE_PREMIUM }}
            className="pt-4 sm:pt-6"
          >
            <Link href="/states">
              <motion.button
                type="button"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-[#6E171B] hover:bg-[#8A2529] text-white text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold border border-[#C7A46A]/60 shadow-lg hover:shadow-xl transition-colors cursor-pointer"
              >
                EXPLORE INDIA
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

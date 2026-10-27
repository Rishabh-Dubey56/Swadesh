"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Award,
  Users,
  ShieldCheck,
  Truck,
  Heart,
} from "lucide-react";
import { getTrendingProducts, getBestSellers } from "@/data/products";
import { INDIAN_STATES } from "@/data/states";
import { ARTISANS } from "@/data/artisans";
import { CULTURE_STORIES } from "@/data/stories";
import { ProductCard } from "@/components/products/ProductCard";
import { ArtisanCard } from "@/components/artisan/ArtisanCard";
import { Button } from "@/components/ui/Button";
import { HeroSection } from "@/components/home/HeroSection";
import { DeviceShowcase } from "@/components/home/DeviceShowcase";
import { useWishlistStore } from "@/store/wishlistStore";
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/ScrollAnimation";

// 28 States matching the exact row-by-row layout of the reference image
const REFERENCE_STATE_SLUGS = [
  // Row 1: North & Northwest
  "jammu-and-kashmir",
  "himachal-pradesh",
  "punjab",
  "uttarakhand",
  "haryana",
  "rajasthan",
  "uttar-pradesh",
  // Row 2: East & Northeast
  "bihar",
  "jharkhand",
  "west-bengal",
  "sikkim",
  "arunachal-pradesh",
  "assam",
  "nagaland",
  // Row 3: Northeast & South
  "manipur",
  "mizoram",
  "tripura",
  "meghalaya",
  "kerala",
  "tamil-nadu",
  "karnataka",
  // Row 4: West & Central & Deccan
  "goa",
  "maharashtra",
  "gujarat",
  "madhya-pradesh",
  "chhattisgarh",
  "odisha",
  "telangana",
  "andhra-pradesh",
];

export default function HomePage() {
  const [mounted, setMounted] = React.useState(false);
  const trendingProducts = getTrendingProducts().slice(0, 4);
  const bestSellers = getBestSellers().slice(0, 4);
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Map states in reference order, falling back to remaining states
  const orderedStates = REFERENCE_STATE_SLUGS.map((slug) =>
    INDIAN_STATES.find((s) => s.slug === slug || s.id === slug)
  ).filter((s): s is NonNullable<typeof s> => s !== undefined);

  return (
    <div className="pb-20 bg-[#FFF9F0] overflow-x-hidden">
      {/* 1. HERITAGE HERO BANNER with smooth fade-in, upward typography reveals, and subtle background parallax */}
      <HeroSection />

      {/* 2. EXPLORE 28 STATES — 7-Column Grid with staggered ripple animations */}
      <section className="py-12 sm:py-16 bg-[#FAF4EB]/70 border-b border-[#E8DCCD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Divider & Header */}
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="w-12 sm:w-16 h-[1px] bg-[#C7A46A]" />
              <span className="text-[#C7A46A] text-xs font-semibold tracking-widest">❖</span>
              <span className="w-12 sm:w-16 h-[1px] bg-[#C7A46A]" />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#282522] uppercase tracking-[0.18em]">
              EXPLORE 28 STATES
            </h2>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="w-12 sm:w-16 h-[1px] bg-[#C7A46A]" />
              <span className="text-[#C7A46A] text-xs font-semibold tracking-widest">❖</span>
              <span className="w-12 sm:w-16 h-[1px] bg-[#C7A46A]" />
            </div>
          </ScrollReveal>

          {/* 7-column grid on desktop, 4 on tablet, 2 on mobile with smooth progressive entrance */}
          <StaggerGroup
            className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4 lg:gap-5"
            staggerDelay={0.03}
          >
            {orderedStates.map((state) => {
              const wishlisted = mounted ? isInWishlist(state.id) : false;
              return (
                <StaggerItem key={state.id} yOffset={24} duration={0.5}>
                  <div className="group flex flex-col items-center">
                    <div className="relative w-full aspect-[16/11] rounded-lg overflow-hidden border border-[#E8DCCD] bg-[#F5EBDD] shadow-xs group-hover:border-[#6E171B] group-hover:shadow-md transition-all duration-300">
                      <Link href={`/states/${state.slug}`} className="block w-full h-full">
                        <Image
                          src={state.thumbImage}
                          alt={`${state.name} architectural heritage and landscape`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
                          className="object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                      </Link>

                      {/* Small Wishlist Heart Icon on Top-Right */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(state.id);
                        }}
                        aria-label={`Save ${state.name}`}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#776B5E] hover:text-[#6E171B] shadow-2xs transition-colors cursor-pointer"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            wishlisted ? "fill-[#6E171B] text-[#6E171B]" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* State Name */}
                    <Link
                      href={`/states/${state.slug}`}
                      className="mt-2 text-center text-xs font-medium text-[#282522] group-hover:text-[#6E171B] transition-colors leading-tight line-clamp-1"
                    >
                      {state.name}
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* 3. TRUST & SERVICE STRIP — 4 Service Pillars with smooth staggered entrance */}
      <section className="border-b border-[#E8DCCD] bg-[#FFF9F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerGroup
            className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E8DCCD]"
            staggerDelay={0.09}
          >
            {[
              {
                icon: ShieldCheck,
                title: "Authentic",
                subtitle: "Traditional & Original",
              },
              {
                icon: Users,
                title: "Support Artisans",
                subtitle: "Empowering Local Craftsmen",
              },
              {
                icon: Award,
                title: "Quality Assured",
                subtitle: "Premium Quality Products",
              },
              {
                icon: Truck,
                title: "Pan India Delivery",
                subtitle: "Delivering Culture to You",
              },
            ].map((item, idx) => (
              <StaggerItem key={idx} yOffset={20}>
                <div className="flex items-center gap-3.5 px-4 sm:px-6 py-5 sm:py-6">
                  <div className="w-10 h-10 rounded-full bg-[#FAF4EB] border border-[#E8DCCD] flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#C7A46A]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#282522]">
                      {item.title}
                    </p>
                    <p className="text-[10px] sm:text-xs text-[#776B5E]">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 4. RESPONSIVE DEVICE SHOWCASE ("SWADESH TRADITIONAL WEAR") */}
      <DeviceShowcase />

      {/* 5. FEATURED TRADITIONAL WEAR PRODUCTS */}
      <section className="py-14 sm:py-20 bg-[#FAF4EB]/50 border-t border-[#E8DCCD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-3 border-b border-[#E8DCCD]">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
                Living Heritage
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#6E171B] mt-1">
                Curated Regional Collections
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-semibold text-[#6E171B] hover:text-[#8A2529] flex items-center gap-1 group"
            >
              <span>Explore All Products</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>

          <StaggerGroup
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
            staggerDelay={0.08}
          >
            {trendingProducts.map((product) => (
              <StaggerItem key={product.id} yOffset={32}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 6. BESTSELLERS */}
      <section className="py-14 sm:py-20 bg-[#FFF9F0] border-t border-[#E8DCCD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-3 border-b border-[#E8DCCD]">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
                Treasured Heirlooms
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#6E171B] mt-1">
                Patron Bestsellers
              </h2>
            </div>
            <Link
              href="/products?sort=popular"
              className="text-xs font-semibold text-[#6E171B] hover:text-[#8A2529] flex items-center gap-1 group"
            >
              <span>View All Bestsellers</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>

          <StaggerGroup
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
            staggerDelay={0.08}
          >
            {bestSellers.map((product) => (
              <StaggerItem key={product.id} yOffset={32}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 7. MASTER ARTISAN SPOTLIGHT */}
      <section className="py-14 sm:py-20 bg-[#FAF4EB] border-t border-[#E8DCCD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
              The Hands Behind The Weaves
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6E171B]">
              Master Artisan Spotlight
            </h2>
            <p className="text-xs sm:text-sm text-[#776B5E] leading-relaxed">
              Meet the generational national awardees, loom masters, and cooperative leaders who uphold our cultural heritage.
            </p>
          </ScrollReveal>

          <StaggerGroup
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            staggerDelay={0.12}
          >
            {ARTISANS.slice(0, 3).map((artisan) => (
              <StaggerItem key={artisan.id} yOffset={30}>
                <ArtisanCard artisan={artisan} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 8. ARTISAN STORIES & CHRONICLES */}
      <section className="py-14 sm:py-20 bg-[#FFF9F0] border-t border-[#E8DCCD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
                The Cultural Chronicle
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6E171B] mt-1">
                Textile Narratives &amp; Weaving Lore
              </h2>
            </div>
            <Link href="/stories">
              <Button variant="outline" size="sm">
                <BookOpen className="w-4 h-4 mr-1 text-[#C7A46A]" />
                <span>Read All Stories</span>
              </Button>
            </Link>
          </ScrollReveal>

          <StaggerGroup
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            staggerDelay={0.12}
          >
            {CULTURE_STORIES.slice(0, 3).map((story) => (
              <StaggerItem key={story.id} yOffset={30}>
                <div className="group flex flex-col bg-[#FAF4EB] border border-[#E8DCCD] overflow-hidden hover:shadow-lg transition-all rounded-sm h-full">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5EBDD]">
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#4F0E11]/90 backdrop-blur-xs text-[#E0C496] text-[10px] font-bold px-2 py-0.5 rounded-xs">
                      {story.category}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-[#776B5E]">
                        {story.readingTimeMinutes} min read • By {story.author}
                      </span>
                      <h3 className="font-serif text-base font-semibold text-[#6E171B] group-hover:text-[#8A2529] mt-1 transition-colors">
                        <Link href={`/stories/${story.slug}`}>{story.title}</Link>
                      </h3>
                      <p className="text-xs text-[#776B5E] line-clamp-3 mt-2 leading-relaxed">
                        {story.summary}
                      </p>
                    </div>

                    <Link
                      href={`/stories/${story.slug}`}
                      className="text-xs font-semibold text-[#C7A46A] hover:text-[#9C7942] flex items-center gap-1 group/btn pt-2 border-t border-[#E8DCCD]/60"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 9. BRAND MISSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ScrollReveal
          yOffset={35}
          duration={0.75}
          className="relative overflow-hidden bg-[#6E171B] text-[#FFF9F0] p-8 sm:p-12 lg:p-16 border border-[#C7A46A]/40 shadow-xl rounded-sm"
        >
          <div className="max-w-2xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#E0C496]">
              The SWADESH Ethical Charter
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Fair Value directly to India&apos;s 7 Million Handloom Weavers
            </h2>
            <p className="text-xs sm:text-sm text-[#F5EBDD]/90 leading-relaxed font-light">
              We eliminate exploitative middlemen and powerloom counterfeits. Every rupee spent on SWADESH guarantees certified living wages, preserves endangered GI craft heritage, and nurtures the next generation of rural Indian artisans.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link href="/about">
                <Button variant="gold" size="md">
                  <span>Read The SWADESH Pledge</span>
                </Button>
              </Link>
              <Link href="/seller">
                <Button
                  variant="secondary"
                  size="md"
                  className="bg-[#FAF4EB]/10 text-white border-[#E0C496]/40 hover:bg-[#FAF4EB]/20"
                >
                  <span>Artisan Guild Registration</span>
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

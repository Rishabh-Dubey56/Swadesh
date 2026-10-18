"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Compass,
  ArrowRight,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { getTrendingProducts, getBestSellers } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { INDIAN_STATES, REGIONS } from "@/data/states";
import { ARTISANS } from "@/data/artisans";
import { CULTURE_STORIES } from "@/data/stories";
import { ProductCard } from "@/components/products/ProductCard";
import { StateCard } from "@/components/states/StateCard";
import { ArtisanCard } from "@/components/artisan/ArtisanCard";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const [selectedRegion, setSelectedRegion] = useState("All");

  const trendingProducts = getTrendingProducts().slice(0, 4);
  const bestSellers = getBestSellers().slice(0, 4);

  const displayedStates =
    selectedRegion === "All"
      ? INDIAN_STATES.slice(0, 6)
      : INDIAN_STATES.filter(
          (s) => s.region.toLowerCase() === selectedRegion.toLowerCase()
        ).slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#282522] text-[#FFF9F0]">
        {/* Background Image with Cultural Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85"
            alt="Handwoven Banarasi Silk Loom"
            fill
            priority
            className="object-cover opacity-35 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#282522] via-[#282522]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 lg:py-36">
          <div className="max-w-2xl space-y-6">
            {/* Cultural Badge */}
            <div className="inline-flex items-center gap-2 bg-[#6E171B]/90 backdrop-blur-xs border border-[#C7A46A]/50 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#E0C496]">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A46A]" />
              <span>28 States • 28 Cultures • Infinite Stories</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFF9F0] leading-[1.15]">
              Discover India. <br />
              <span className="text-[#C7A46A] italic font-normal">Wear Culture.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#F5EBDD]/90 leading-relaxed font-sans font-light">
              Enter a living treasury of authentic Indian cultural fashion. From sovereign Kanchipuram silks and gossamer Chanderi to certified Kashmiri Pashminas—handcrafted directly on ancient looms by generational master artisans.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/products">
                <Button variant="gold" size="lg" className="w-full sm:w-auto">
                  <span>Explore Handloom Collections</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/states">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-[#FFF9F0] border-[#E0C496]/60 hover:bg-[#FFF9F0]/10">
                  <Compass className="w-4 h-4 mr-1 text-[#C7A46A]" />
                  <span>Explore 28 States &amp; Crafts</span>
                </Button>
              </Link>
            </div>

            {/* Trust Micro-Metrics */}
            <div className="pt-8 border-t border-[#776B5E]/40 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <p className="font-serif text-2xl font-bold text-[#E0C496]">28</p>
                <p className="text-[11px] text-[#EAE2D5]/70">Indian States &amp; Weaves</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#E0C496]">100%</p>
                <p className="text-[11px] text-[#EAE2D5]/70">Silk Mark &amp; GI Tagged</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#E0C496]">500+</p>
                <p className="text-[11px] text-[#EAE2D5]/70">Master Artisan Families</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CURATED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
            Sacred Drapes &amp; Royal Silhouettes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6E171B]">
            Curated Cultural Categories
          </h2>
          <p className="text-xs sm:text-sm text-[#776B5E] leading-relaxed">
            Every garment tells a regional chronicle, woven with ancient thread count traditions and natural plant-based dyes.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative flex flex-col items-center bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm overflow-hidden p-3.5 hover:shadow-lg hover:border-[#C7A46A] transition-all text-center"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#E8DCCD] group-hover:border-[#6E171B] transition-colors mb-3">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="96px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-xs sm:text-sm font-semibold text-[#282522] group-hover:text-[#6E171B] transition-colors">
                {cat.name}
              </h3>
              <span className="text-[10px] text-[#776B5E] mt-0.5">
                {cat.itemCount} Weaves
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. TRENDING HANDLOOM MASTERPIECES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-3 border-b border-[#E8DCCD]">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
              Artisan Loom Spotlight
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#6E171B] mt-1">
              Trending Cultural Attire
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-[#6E171B] hover:text-[#8A2529] flex items-center gap-1 group"
          >
            <span>View All Products</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. DISCOVER 28 INDIAN STATES & CRAFTS */}
      <section className="bg-[#F5EBDD]/60 py-16 sm:py-20 border-y border-[#E8DCCD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
                Geographical Heritage Explorer
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6E171B] mt-1">
                28 States. Traditional Crafts Discovery.
              </h2>
              <p className="text-xs sm:text-sm text-[#776B5E] mt-1 max-w-xl">
                Embark on an artisanal pilgrimage across India. Each state harbors unique GI-certified textiles, embroidery techniques, and metalcrafts.
              </p>
            </div>
            <Link href="/states">
              <Button variant="outline" size="sm">
                <Compass className="w-4 h-4 mr-1 text-[#C7A46A]" />
                <span>View Full 28 States Directory</span>
              </Button>
            </Link>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedRegion("All")}
              className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                selectedRegion === "All"
                  ? "bg-[#6E171B] text-[#FFF9F0]"
                  : "bg-[#FFF9F0] text-[#776B5E] border border-[#E8DCCD] hover:border-[#C7A46A]"
              }`}
            >
              All Regions
            </button>
            {REGIONS.map((r) => (
              <button
                key={r.name}
                type="button"
                onClick={() => setSelectedRegion(r.name)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                  selectedRegion === r.name
                    ? "bg-[#6E171B] text-[#FFF9F0]"
                    : "bg-[#FFF9F0] text-[#776B5E] border border-[#E8DCCD] hover:border-[#C7A46A]"
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>

          {/* State Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedStates.map((st) => (
              <StateCard key={st.id} stateData={st} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. BESTSELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-3 border-b border-[#E8DCCD]">
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
            <span>Explore All Bestsellers</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. MASTER ARTISAN VOICES & WORKSHOPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
            The Hands Behind The Weaves
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6E171B]">
            Master Artisan Spotlight
          </h2>
          <p className="text-xs sm:text-sm text-[#776B5E] leading-relaxed">
            Meet the generational national awardees, loom masters, and cooperative leaders who uphold our cultural heritage without compromise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTISANS.slice(0, 3).map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      </section>

      {/* 7. ARTISAN STORIES & CHRONICLES */}
      <section className="bg-[#FAF4EB] py-16 sm:py-20 border-t border-[#E8DCCD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CULTURE_STORIES.slice(0, 3).map((story) => (
              <div
                key={story.id}
                className="group flex flex-col bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm overflow-hidden hover:shadow-lg transition-all"
              >
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
            ))}
          </div>
        </div>
      </section>

      {/* 8. BRAND MISSION & PLEDGE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-sm overflow-hidden bg-[#6E171B] text-[#FFF9F0] p-8 sm:p-12 lg:p-16 border border-[#C7A46A]/40 shadow-xl">
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
                <Button variant="secondary" size="md" className="bg-[#FAF4EB]/10 text-white border-[#E0C496]/40 hover:bg-[#FAF4EB]/20">
                  <span>Artisan Guild Registration</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStateBySlug } from "@/data/states";
import { getProductsByState } from "@/data/products";
import { getArtisansByState } from "@/data/artisans";
import { ProductCard } from "@/components/products/ProductCard";
import { ArtisanCard } from "@/components/artisan/ArtisanCard";
import { Compass, Sparkles, Shirt } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface StatePageProps {
  params: Promise<{ slug: string }>;
}

export default async function StateDetailPage({ params }: StatePageProps) {
  const { slug } = await params;
  const stateData = getStateBySlug(slug);

  if (!stateData) {
    notFound();
  }

  const stateProducts = getProductsByState(stateData.id);
  const stateArtisans = getArtisansByState(stateData.id);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* 1. Hero State Landscape Showcase */}
      <section className="relative overflow-hidden bg-[#282522] text-[#FFF9F0]">
        <div className="absolute inset-0 z-0">
          <Image
            src={stateData.heroImage}
            alt={`${stateData.name} heritage landscapes and architecture`}
            fill
            priority
            className="object-cover opacity-40 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#282522] via-[#282522]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#6E171B]/90 backdrop-blur-xs border border-[#C7A46A]/50 px-3 py-1 rounded-full text-xs font-medium text-[#E0C496]">
              <Compass className="w-3.5 h-3.5 text-[#C7A46A]" />
              <span>{stateData.region} • Capital: {stateData.capital}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFF9F0] leading-tight">
              {stateData.name}
            </h1>

            <p className="font-serif text-lg sm:text-xl text-[#E0C496] italic">
              &ldquo;{stateData.tagline}&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-[#F5EBDD]/90 leading-relaxed font-light pt-2 max-w-2xl">
              {stateData.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Traditional Attire & Weaving Heritage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Attire Card */}
          <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-[#6E171B]">
              <Shirt className="w-5 h-5 text-[#C7A46A]" />
              <h3 className="font-serif text-xl font-bold">
                Traditional Attire of {stateData.name}
              </h3>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3 bg-[#FFF9F0] border border-[#E8DCCD] rounded-xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#776B5E]">
                  Women&apos;s Royal Drapes
                </span>
                <p className="text-xs font-semibold text-[#6E171B] mt-0.5">
                  {stateData.traditionalAttire.women}
                </p>
              </div>

              <div className="p-3 bg-[#FFF9F0] border border-[#E8DCCD] rounded-xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#776B5E]">
                  Men&apos;s Heritage Ensemble
                </span>
                <p className="text-xs font-semibold text-[#6E171B] mt-0.5">
                  {stateData.traditionalAttire.men}
                </p>
              </div>

              <p className="text-xs text-[#776B5E] leading-relaxed pt-1">
                {stateData.traditionalAttire.description}
              </p>
            </div>
          </div>

          {/* Crafts & Key Textiles */}
          <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-[#6E171B]">
              <Sparkles className="w-5 h-5 text-[#C7A46A]" />
              <h3 className="font-serif text-xl font-bold">
                Renowned Crafts &amp; GI Weaves
              </h3>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#776B5E] block mb-2">
                  Key Textiles &amp; Handlooms
                </span>
                <div className="flex flex-wrap gap-2">
                  {stateData.keyTextiles.map((textile, idx) => (
                    <span
                      key={idx}
                      className="bg-[#6E171B] text-[#FFF9F0] text-xs font-medium px-3 py-1 rounded-xs"
                    >
                      {textile}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#776B5E] block mb-2">
                  Famous Handicrafts &amp; Metalworks
                </span>
                <div className="flex flex-wrap gap-2">
                  {stateData.famousCrafts.map((craft, idx) => (
                    <span
                      key={idx}
                      className="bg-[#FFF9F0] text-[#282522] border border-[#E8DCCD] text-xs font-medium px-3 py-1 rounded-xs"
                    >
                      {craft}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#776B5E] block mb-2">
                  Cultural Highlights
                </span>
                <ul className="text-xs text-[#776B5E] space-y-1 list-disc list-inside">
                  {stateData.culturalHighlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Products from this state */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DCCD]">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
              Loom Creations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#6E171B] mt-1">
              Handlooms Originating from {stateData.name}
            </h2>
          </div>
          <Link
            href={`/products?search=${encodeURIComponent(stateData.name)}`}
            className="text-xs font-semibold text-[#6E171B] hover:underline"
          >
            View All from {stateData.name} →
          </Link>
        </div>

        {stateProducts.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm text-xs text-[#776B5E]">
            Our curators are currently working with certified weaver co-operatives in {stateData.name} to digitize more heirlooms. Check back shortly.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stateProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Master Artisans from this State */}
      {stateArtisans.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="pb-3 border-b border-[#E8DCCD]">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
              Weaver Spotlights
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#6E171B] mt-1">
              Master Artisans of {stateData.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stateArtisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        </section>
      )}

      {/* 5. Back to all states CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <Link href="/states">
          <Button variant="outline" size="md">
            <span>← Explore Other Indian States &amp; Crafts</span>
          </Button>
        </Link>
      </section>
    </div>
  );
}

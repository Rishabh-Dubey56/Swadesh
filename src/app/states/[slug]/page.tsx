import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStateBySlug, INDIAN_STATES } from "@/data/states";
import { getProductsByState } from "@/data/products";
import { getArtisansByState } from "@/data/artisans";
import { ProductCard } from "@/components/products/ProductCard";
import { ArtisanCard } from "@/components/artisan/ArtisanCard";
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/ScrollAnimation";

/* 5 Category tiles matching reference design with photos */
const STATE_CATEGORY_TILES = [
  {
    name: "Men's Wear",
    slug: "Men",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Women's Wear",
    slug: "Women",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Shawls & Wraps",
    slug: "shawls-dupattas",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Accessories",
    slug: "heritage-jewellery",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Footwear",
    slug: "handcrafted-footwear",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80",
  },
];

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

  /* Hero image */
  const isKashmir = stateData.id === "jammu-and-kashmir";
  const heroImage = isKashmir ? "/images/kashmir-hero.jpg" : stateData.heroImage;

  return (
    <div className="pb-20 bg-[#FFF9F0]">
      {/* Breadcrumbs matching reference: Home > States > Jammu & Kashmir */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center gap-2 text-xs text-[#776B5E]">
          <Link href="/" className="hover:text-[#6E171B] transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/states" className="hover:text-[#6E171B] transition-colors">
            States
          </Link>
          <span>&gt;</span>
          <span className="text-[#282522] font-semibold">{stateData.name}</span>
        </div>
      </nav>

      {/* 1. HERO — Split Layout matching top-right of reference image */}
      <section className="border-b border-[#E8DCCD] bg-[#FAF4EB]/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px] sm:min-h-[440px] py-6 lg:py-0">
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-6">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#282522] uppercase tracking-[0.05em] leading-tight">
                {stateData.name.replace("and", "&")}
              </h1>

              <p className="font-serif text-base sm:text-lg text-[#6E171B] font-medium leading-snug">
                {stateData.tagline}
              </p>

              <p className="text-xs sm:text-sm text-[#776B5E] leading-relaxed">
                {stateData.shortDescription}
              </p>

              <div className="pt-2">
                <Link
                  href="#collection"
                  className="inline-block px-6 py-2.5 rounded-sm bg-[#6E171B] hover:bg-[#8A2529] text-[#FFF9F0] text-xs font-semibold uppercase tracking-[0.15em] transition-all shadow-xs"
                >
                  EXPLORE COLLECTION
                </Link>
              </div>
            </div>

            {/* Right Panoramic Imagery Column */}
            <div className="lg:col-span-7 relative h-[280px] sm:h-[360px] lg:h-[440px] rounded-sm overflow-hidden shadow-sm">
              <Image
                src={heroImage}
                alt={`${stateData.name} landscape and traditional attire`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF4EB]/40 via-transparent to-transparent hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY TILES STRIP — 5 items with photos matching reference */}
      <section className="py-8 sm:py-10 border-b border-[#E8DCCD] bg-[#FFF9F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerGroup className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-6 justify-center" staggerDelay={0.06}>
            {STATE_CATEGORY_TILES.map((cat) => (
              <StaggerItem key={cat.slug} yOffset={20}>
                <Link
                  href={`/products?search=${encodeURIComponent(stateData.name)}&category=${cat.slug}`}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative w-20 h-24 sm:w-28 sm:h-32 rounded-md overflow-hidden border border-[#E8DCCD] bg-[#F5EBDD] group-hover:border-[#6E171B] group-hover:shadow-md transition-all duration-300 mb-2">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 30vw, 120px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-[#282522] group-hover:text-[#6E171B] transition-colors leading-tight">
                    {cat.name}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 3. PRODUCTS FROM THIS STATE */}
      <section id="collection" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ScrollReveal className="flex items-center justify-between pb-3 border-b border-[#E8DCCD]">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
                Regional Collection
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#6E171B] mt-1">
                Authentic Crafts of {stateData.name}
              </h2>
            </div>
            <Link
              href={`/products?search=${encodeURIComponent(stateData.name)}`}
              className="text-xs font-semibold text-[#6E171B] hover:underline"
            >
              View All ({stateProducts.length}) →
            </Link>
          </ScrollReveal>

          {stateProducts.length === 0 ? (
            <div className="p-10 text-center bg-[#FAF4EB] border border-[#E8DCCD] text-xs text-[#776B5E]">
              Our curators are actively documenting authentic artisan cooperatives in {stateData.name}. Browse other regional collections below.
            </div>
          ) : (
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" staggerDelay={0.06}>
              {stateProducts.map((p) => (
                <StaggerItem key={p.id} yOffset={25}>
                  <ProductCard product={p} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>

      {/* 4. TRADITIONAL ATTIRE & CULTURAL HIGHLIGHTS */}
      <section className="py-12 bg-[#FAF4EB] border-y border-[#E8DCCD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8" yOffset={25}>
            {/* Attire Card */}
            <div className="bg-[#FFF9F0] border border-[#E8DCCD] p-6 sm:p-8 space-y-4 rounded-sm">
              <h3 className="font-serif text-xl font-bold text-[#6E171B]">
                Traditional Attire of {stateData.name}
              </h3>

              <div className="space-y-3">
                <div className="p-3 bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#776B5E]">
                    Women&apos;s Heritage Attire
                  </span>
                  <p className="text-xs font-semibold text-[#6E171B] mt-0.5">
                    {stateData.traditionalAttire.women}
                  </p>
                </div>

                <div className="p-3 bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#776B5E]">
                    Men&apos;s Heritage Ensemble
                  </span>
                  <p className="text-xs font-semibold text-[#6E171B] mt-0.5">
                    {stateData.traditionalAttire.men}
                  </p>
                </div>

                <p className="text-xs text-[#776B5E] leading-relaxed">
                  {stateData.traditionalAttire.description}
                </p>
              </div>
            </div>

            {/* Crafts & Weaves Card */}
            <div className="bg-[#FFF9F0] border border-[#E8DCCD] p-6 sm:p-8 space-y-4 rounded-sm">
              <h3 className="font-serif text-xl font-bold text-[#6E171B]">
                Renowned Crafts &amp; GI Weaves
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#776B5E] block mb-2">
                    Key Textiles &amp; Handlooms
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {stateData.keyTextiles.map((textile, idx) => (
                      <span key={idx} className="bg-[#6E171B] text-[#FFF9F0] text-xs font-medium px-3 py-1 rounded-xs">
                        {textile}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#776B5E] block mb-2">
                    Famous Handicrafts
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {stateData.famousCrafts.map((craft, idx) => (
                      <span key={idx} className="bg-[#FAF4EB] text-[#282522] border border-[#E8DCCD] text-xs font-medium px-3 py-1 rounded-xs">
                        {craft}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#776B5E] block mb-1">
                    Cultural Highlights
                  </span>
                  <ul className="text-xs text-[#776B5E] space-y-1 list-disc list-inside">
                    {stateData.culturalHighlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. ARTISANS */}
      {stateArtisans.length > 0 && (
        <section className="py-12 bg-[#FFF9F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="pb-3 border-b border-[#E8DCCD]">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
                Craftspeople
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
          </div>
        </section>
      )}

      {/* 6. EXPLORE OTHER STATES */}
      <section className="py-10 bg-[#FAF4EB] border-t border-[#E8DCCD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-serif text-lg font-bold text-[#282522] mb-6">
            Explore Other States &amp; Regions
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {INDIAN_STATES.filter((s) => s.id !== stateData.id).slice(0, 14).map((s) => (
              <Link
                key={s.id}
                href={`/states/${s.slug}`}
                className="text-xs px-3 py-1.5 border border-[#E8DCCD] bg-[#FFF9F0] text-[#282522] hover:border-[#6E171B] hover:text-[#6E171B] transition-colors rounded-xs"
              >
                {s.name}
              </Link>
            ))}
            <Link
              href="/states"
              className="text-xs px-3.5 py-1.5 bg-[#6E171B] text-[#FFF9F0] font-semibold hover:bg-[#8A2529] transition-colors rounded-xs"
            >
              All 28 States →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

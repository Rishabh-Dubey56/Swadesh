import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import { getSellerById } from "@/data/mockSellers";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductReviews } from "@/components/products/ProductReviews";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductActions } from "./ProductActions";
import { formatINR } from "@/lib/utils";
import { RatingStars } from "@/components/ui/RatingStars";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const seller = getSellerById(product.sellerId);
  const relatedProducts = PRODUCTS.filter(
    (p) => (p.categorySlug === product.categorySlug || p.stateId === product.stateId) && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      {/* Breadcrumb Navigation — Home > State > Category > Product matching reference */}
      <nav className="flex items-center gap-2 text-xs text-[#776B5E]">
        <Link href="/" className="hover:text-[#6E171B] transition-colors">
          Home
        </Link>
        <span>&gt;</span>
        <Link
          href={`/states/${product.stateId}`}
          className="hover:text-[#6E171B] transition-colors"
        >
          {product.stateName}
        </Link>
        <span>&gt;</span>
        <Link
          href={`/products?category=${product.categorySlug}`}
          className="hover:text-[#6E171B] transition-colors"
        >
          {product.categoryName}
        </Link>
        <span>&gt;</span>
        <span className="text-[#282522] font-semibold truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase Section — 2 Columns matching reference */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Image Gallery (55% on desktop) */}
        <div className="lg:col-span-7">
          <ProductGallery
            productId={product.id}
            images={product.images}
            productName={product.name}
            craftType={product.craftType}
            origin={product.origin}
          />
        </div>

        {/* Right: Product Details & Purchase Actions (45% on desktop) */}
        <div className="lg:col-span-5 space-y-4 text-[#282522]">
          {/* Title & Subtitle matching reference */}
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#282522] leading-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#776B5E] mt-1 font-medium">
              {product.craftType}
            </p>
          </div>

          {/* Pricing & Discount matching reference: ₹2,499  ₹3,499  29% OFF */}
          <div className="flex items-baseline gap-3 pt-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#282522]">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-sm text-[#776B5E] line-through">
                  {formatINR(product.originalPrice)}
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-sm">
                  {product.discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          {/* Ratings & Reviews matching reference: 4.7 ★★★★★ (128 Reviews) */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[#282522]">{product.rating}</span>
            <RatingStars
              rating={product.rating}
              count={product.reviewCount}
              showCount={false}
              size="sm"
            />
            <span className="text-[#776B5E]">({product.reviewCount} Reviews)</span>
          </div>

          {/* Short Narrative matching reference */}
          <p className="text-xs sm:text-sm text-[#776B5E] leading-relaxed pt-1">
            {product.shortDescription}
          </p>

          {/* Purchase Controls (Color, Size, Quantity, ADD TO CART, BUY NOW, Trust Icons) */}
          <ProductActions product={product} />
        </div>
      </div>

      {/* Secondary Information Tabs & Details */}
      <div className="pt-8 border-t border-[#E8DCCD]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#6E171B] mb-3">
                The Heritage &amp; Craftsmanship
              </h2>
              <p className="text-xs sm:text-sm text-[#776B5E] leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#FAF4EB] border border-[#E8DCCD]">
                <span className="font-bold text-[#776B5E] uppercase text-[10px] block">Fabric &amp; Weave</span>
                <p className="font-medium text-[#282522] mt-0.5">{product.fabric}</p>
              </div>
              <div className="p-3 bg-[#FAF4EB] border border-[#E8DCCD]">
                <span className="font-bold text-[#776B5E] uppercase text-[10px] block">Technique</span>
                <p className="font-medium text-[#282522] mt-0.5">{product.craftTechnique}</p>
              </div>
              <div className="p-3 bg-[#FAF4EB] border border-[#E8DCCD]">
                <span className="font-bold text-[#776B5E] uppercase text-[10px] block">Regional Origin</span>
                <p className="font-medium text-[#282522] mt-0.5">{product.origin}</p>
              </div>
              <div className="p-3 bg-[#FAF4EB] border border-[#E8DCCD]">
                <span className="font-bold text-[#776B5E] uppercase text-[10px] block">Care Directions</span>
                <p className="font-medium text-[#282522] mt-0.5">{product.careInstructions}</p>
              </div>
            </div>

            {/* Customer Reviews Section */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="pt-4">
                <ProductReviews
                  reviews={product.reviews}
                  productName={product.name}
                />
              </div>
            )}
          </div>

          {/* Artisan / Guild Card */}
          {seller && (
            <div className="p-6 bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm space-y-4 self-start">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C7A46A]">
                Certified Craft Guild
              </span>
              <h3 className="font-serif text-lg font-bold text-[#6E171B]">
                {seller.storeName}
              </h3>
              <p className="text-xs text-[#776B5E] leading-relaxed">
                {seller.description}
              </p>
              <div className="pt-2 border-t border-[#E8DCCD] flex items-center justify-between text-xs">
                <span className="text-[#776B5E]">Leader: {seller.artisanLeader}</span>
                <span className="font-bold text-emerald-800">Verified GI Producer</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-[#E8DCCD] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#6E171B]">
              Complementary Regional Heirlooms
            </h2>
            <Link
              href={`/states/${product.stateId}`}
              className="text-xs font-semibold text-[#6E171B] hover:underline"
            >
              Explore {product.stateName} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

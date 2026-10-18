import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import { getSellerById } from "@/data/mockSellers";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductReviews } from "@/components/products/ProductReviews";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductActions } from "./ProductActions";
import {
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  MapPin,
} from "lucide-react";
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
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#776B5E]">
        <Link href="/" className="hover:text-[#6E171B]">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#6E171B]">
          Catalogue
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${product.categorySlug}`}
          className="hover:text-[#6E171B]"
        >
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="text-[#282522] font-semibold truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Left: Image Gallery */}
        <div>
          <ProductGallery
            images={product.images}
            productName={product.name}
            craftType={product.craftType}
            origin={product.origin}
          />
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="space-y-6 text-[#282522]">
          {/* Origin & Craft Badge */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-[#6E171B] text-[#FFF9F0] px-2.5 py-0.5 rounded-xs font-semibold uppercase tracking-wider text-[10px]">
                {product.craftType}
              </span>
              <span className="text-[#776B5E]">•</span>
              <Link
                href={`/states/${product.stateId}`}
                className="text-[#9C7942] hover:underline font-semibold flex items-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C7A46A]" />
                <span>{product.origin}</span>
              </Link>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#6E171B] leading-tight">
              {product.name}
            </h1>

            {/* Ratings & SKU */}
            <div className="flex items-center gap-4 pt-1">
              <RatingStars
                rating={product.rating}
                count={product.reviewCount}
                showCount
                size="md"
              />
              <span className="text-xs font-mono text-[#776B5E]">
                SKU: {product.sku}
              </span>
            </div>
          </div>

          {/* Pricing & Offer */}
          <div className="p-4 bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm flex items-baseline gap-3">
            <span className="font-serif text-3xl font-bold text-[#6E171B]">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-sm text-[#776B5E] line-through">
                  {formatINR(product.originalPrice)}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-xs">
                  Save {product.discountPercent}% Off
                </span>
              </>
            )}
            <span className="ml-auto text-[11px] text-[#776B5E]">
              Inclusive of all taxes
            </span>
          </div>

          {/* Short Narrative */}
          <p className="text-xs sm:text-sm text-[#776B5E] leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Client Purchase Controls (Size, Color, AddToCart, BuyNow) */}
          <ProductActions product={product} />

          {/* Assurance Pills */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E8DCCD] text-xs text-[#282522]">
            <div className="flex items-center gap-2 p-2.5 rounded-xs bg-[#FAF4EB] border border-[#E8DCCD]">
              <ShieldCheck className="w-4 h-4 text-[#C7A46A] shrink-0" />
              <span>Silk Mark India &amp; GI Tag Authenticated</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xs bg-[#FAF4EB] border border-[#E8DCCD]">
              <Truck className="w-4 h-4 text-[#C7A46A] shrink-0" />
              <span>Direct Loom Insured Doorstep Delivery</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xs bg-[#FAF4EB] border border-[#E8DCCD]">
              <Award className="w-4 h-4 text-[#C7A46A] shrink-0" />
              <span>100% Value to Weaver Co-operative</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xs bg-[#FAF4EB] border border-[#E8DCCD]">
              <RotateCcw className="w-4 h-4 text-[#C7A46A] shrink-0" />
              <span>7-Day Cultural Heritage Exchange</span>
            </div>
          </div>

          {/* Weaver Collective Card */}
          {seller && (
            <div className="p-4 rounded-sm border border-[#E8DCCD] bg-[#F5EBDD]/50 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#9C7942]">
                  Crafted by Certified Guild
                </span>
                <h4 className="font-serif text-sm font-semibold text-[#6E171B]">
                  {seller.storeName}
                </h4>
                <p className="text-xs text-[#776B5E]">
                  Led by Master Artisan {seller.artisanLeader} • {seller.city}
                </p>
              </div>
              <Link
                href={`/states/${product.stateId}`}
                className="text-xs font-semibold text-[#6E171B] underline hover:text-[#8A2529] shrink-0"
              >
                State Heritage →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Specifications & Textile Lore Tab */}
      <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 sm:p-8 space-y-6">
        <h3 className="font-serif text-xl font-semibold text-[#6E171B]">
          Textile Anatomy &amp; Master Craftsmanship
        </h3>
        <p className="text-xs sm:text-sm text-[#282522] leading-relaxed">
          {product.fullDescription}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#E8DCCD]">
          <div>
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#776B5E]">
              Pure Fabric
            </h5>
            <p className="text-xs font-medium text-[#282522] mt-0.5">
              {product.fabric}
            </p>
          </div>
          <div>
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#776B5E]">
              Weaving Technique
            </h5>
            <p className="text-xs font-medium text-[#282522] mt-0.5">
              {product.craftTechnique}
            </p>
          </div>
          <div>
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#776B5E]">
              Preservation &amp; Care
            </h5>
            <p className="text-xs font-medium text-[#282522] mt-0.5">
              {product.careInstructions}
            </p>
          </div>
          <div>
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#776B5E]">
              Loom Origin
            </h5>
            <p className="text-xs font-medium text-[#282522] mt-0.5">
              {product.origin}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="pt-4">
        <ProductReviews
          reviews={product.reviews}
          productName={product.name}
        />
      </div>

      {/* Related Handloom Creactions */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-8 border-t border-[#E8DCCD]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
                Complementary Weaves
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#6E171B] mt-1">
                You May Also Admire
              </h3>
            </div>
            <Link
              href="/products"
              className="text-xs font-semibold text-[#6E171B] hover:underline"
            >
              View Full Gallery →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

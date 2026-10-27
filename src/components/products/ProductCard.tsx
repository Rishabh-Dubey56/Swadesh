"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { RatingStars } from "@/components/ui/RatingStars";

export interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const wishlisted = mounted ? isInWishlist(product.id) : false;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: `${product.id}-${product.sizes[0] || "Standard"}-${product.colors[0]?.name || "Original"}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: product.price,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0]?.name,
      stateName: product.stateName,
      craftType: product.craftType,
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#C7A46A]/60"
    >
      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5EBDD] block">
        {/* Main Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            isHovered && product.images[1] ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Alternate Image on Hover if available */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover transition-opacity duration-500 absolute inset-0 ${
              isHovered ? "opacity-100 scale-105" : "opacity-0"
            }`}
          />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="bg-[#6E171B] text-[#FFF9F0] text-[10px] font-bold px-2 py-0.5 rounded-xs tracking-wider uppercase shadow-xs">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#C7A46A] text-[#282522] text-[10px] font-bold px-2 py-0.5 rounded-xs tracking-wider uppercase shadow-xs">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[#FFF9F0]/90 backdrop-blur-xs flex items-center justify-center text-[#282522] hover:text-[#6E171B] shadow-sm transition-all z-10 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? "fill-[#6E171B] text-[#6E171B]" : "text-[#776B5E]"
            }`}
          />
        </button>

        {/* Quick Add To Bag Hover Pill */}
        <div className="absolute bottom-3 inset-x-3 transition-all duration-300 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full bg-[#6E171B]/95 hover:bg-[#8A2529] text-[#FFF9F0] text-xs font-semibold py-2.5 px-3 rounded-xs flex items-center justify-center gap-1.5 shadow-md backdrop-blur-xs transition-colors cursor-pointer"
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#E0C496]" />
                <span>Quick Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Origin & Craft Type */}
          <div className="flex items-center justify-between text-[11px] text-[#776B5E] mb-1">
            <span className="font-semibold text-[#9C7942] uppercase tracking-wider">
              {product.craftType}
            </span>
            <span className="text-[#776B5E]/80">{product.stateName}</span>
          </div>

          {/* Product Name */}
          <h4 className="font-serif text-sm font-semibold text-[#282522] line-clamp-1 group-hover:text-[#6E171B] transition-colors">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h4>

          {/* Short subtitle / fabric */}
          <p className="text-[11px] text-[#776B5E] line-clamp-1 mt-0.5">
            {product.fabric}
          </p>
        </div>

        {/* Rating and Price */}
        <div className="pt-2 border-t border-[#E8DCCD]/60 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-[#6E171B]">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-[#776B5E] line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <RatingStars rating={product.rating} count={product.reviewCount} size="sm" />
        </div>
      </div>
    </div>
  );
}

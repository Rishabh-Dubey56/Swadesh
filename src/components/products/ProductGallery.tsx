"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Award, Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";

export interface ProductGalleryProps {
  productId?: string;
  images: string[];
  productName: string;
  craftType?: string;
  origin?: string;
}

export function ProductGallery({
  productId,
  images,
  productName,
  craftType,
  origin,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const wishlisted = productId ? isInWishlist(productId) : false;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3 sm:gap-4">
      {/* Thumbnails — Left vertical column on desktop */}
      <div className="flex md:flex-col gap-2.5 sm:gap-3 overflow-x-auto md:overflow-visible pb-1 md:pb-0 shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedImage(idx)}
            className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-md overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
              selectedImage === idx
                ? "border-[#6E171B] ring-2 ring-[#C7A46A]/50 shadow-sm"
                : "border-[#E8DCCD] hover:border-[#C7A46A] opacity-80 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image Showcase */}
      <div className="relative flex-1 aspect-[3/4] rounded-lg overflow-hidden border border-[#E8DCCD] bg-[#F5EBDD] shadow-md group">
        <Image
          src={images[selectedImage] || images[0]}
          alt={productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-300 group-hover:scale-[1.02]"
        />

        {/* Wishlist Button — Top Right like Reference Design */}
        {productId && (
          <button
            type="button"
            onClick={() => toggleWishlist(productId)}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-[#E8DCCD] flex items-center justify-center text-[#282522] hover:text-[#6E171B] hover:scale-105 shadow-sm transition-all z-10 cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                wishlisted ? "fill-[#6E171B] text-[#6E171B]" : "text-[#776B5E]"
              }`}
            />
          </button>
        )}

        {/* Heritage Trust Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="bg-[#282522]/85 backdrop-blur-xs text-[#FFF9F0] text-[10px] sm:text-[11px] px-2.5 py-1.5 rounded-sm flex items-center gap-1.5 border border-[#C7A46A]/30 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C7A46A]" />
            <span>Silk Mark &amp; GI Tag Certified</span>
          </div>

          {origin && (
            <div className="hidden sm:flex bg-[#4F0E11]/85 backdrop-blur-xs text-[#E0C496] text-[10px] sm:text-[11px] px-2.5 py-1.5 rounded-sm items-center gap-1.5 border border-[#C7A46A]/30 shadow-xs">
              <Award className="w-3.5 h-3.5" />
              <span>{craftType ? `${craftType} • ${origin}` : origin}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

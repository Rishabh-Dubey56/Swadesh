"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Award } from "lucide-react";

export interface ProductGalleryProps {
  images: string[];
  productName: string;
  craftType?: string;
  origin?: string;
}

export function ProductGallery({
  images,
  productName,
  craftType,
  origin,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedImage(idx)}
            className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xs overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
              selectedImage === idx
                ? "border-[#6E171B] ring-2 ring-[#C7A46A]/50"
                : "border-[#E8DCCD] hover:border-[#C7A46A]"
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
      <div className="relative flex-1 aspect-[3/4] rounded-sm overflow-hidden border border-[#E8DCCD] bg-[#F5EBDD] shadow-md">
        <Image
          src={images[selectedImage] || images[0]}
          alt={productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-300"
        />

        {/* Heritage Trust Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="bg-[#282522]/85 backdrop-blur-xs text-[#FFF9F0] text-[11px] px-3 py-1.5 rounded-xs flex items-center gap-1.5 border border-[#C7A46A]/30">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C7A46A]" />
            <span>Silk Mark India &amp; GI Tag Certified</span>
          </div>

          {origin && (
            <div className="hidden sm:flex bg-[#4F0E11]/85 backdrop-blur-xs text-[#E0C496] text-[11px] px-3 py-1.5 rounded-xs items-center gap-1.5 border border-[#C7A46A]/30">
              <Award className="w-3.5 h-3.5" />
              <span>{craftType ? `${craftType} • ${origin}` : origin}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IndianState } from "@/types";
import { Compass, ArrowRight } from "lucide-react";

export interface StateCardProps {
  stateData: IndianState;
}

export function StateCard({ stateData }: StateCardProps) {
  return (
    <div className="group relative flex flex-col bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#C7A46A]/80">
      {/* State Image Banner */}
      <Link href={`/states/${stateData.slug}`} className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5EBDD] block">
        <Image
          src={stateData.thumbImage || stateData.heroImage}
          alt={stateData.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#282522]/90 via-[#282522]/20 to-transparent" />

        {/* Region Tag */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="bg-[#6E171B]/90 backdrop-blur-xs text-[#FFF9F0] text-[10px] font-bold px-2 py-0.5 rounded-xs tracking-wider uppercase border border-[#C7A46A]/30">
            {stateData.region}
          </span>
        </div>

        {/* State Title on Overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FFF9F0] drop-shadow-sm group-hover:text-[#E0C496] transition-colors">
            {stateData.name}
          </h3>
          <p className="text-[11px] text-[#E0C496] italic line-clamp-1">
            {stateData.tagline}
          </p>
        </div>
      </Link>

      {/* State Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <p className="text-xs text-[#776B5E] line-clamp-2 leading-relaxed">
            {stateData.shortDescription}
          </p>

          {/* Key Textiles & Crafts */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {stateData.keyTextiles.slice(0, 3).map((textile, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium bg-[#FAF4EB] text-[#6E171B] border border-[#E8DCCD] px-2 py-0.5 rounded-xs"
              >
                {textile}
              </span>
            ))}
            {stateData.keyTextiles.length > 3 && (
              <span className="text-[10px] text-[#776B5E] self-center">
                +{stateData.keyTextiles.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Link */}
        <div className="pt-2 border-t border-[#E8DCCD]/60 flex items-center justify-between">
          <span className="text-[11px] text-[#776B5E] flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-[#C7A46A]" />
            Cap: {stateData.capital}
          </span>
          <Link
            href={`/states/${stateData.slug}`}
            className="text-xs font-semibold text-[#6E171B] group-hover:text-[#8A2529] flex items-center gap-1 group/btn"
          >
            <span>Explore Crafts</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

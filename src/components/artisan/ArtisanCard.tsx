import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Artisan } from "@/types";
import { Award, Compass, ArrowRight } from "lucide-react";

export interface ArtisanCardProps {
  artisan: Artisan;
}

export function ArtisanCard({ artisan }: ArtisanCardProps) {
  return (
    <div className="group relative flex flex-col bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#C7A46A]/80">
      {/* Workshop Image Banner */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F5EBDD]">
        <Image
          src={artisan.workshopImage}
          alt={`${artisan.name}'s loom workshop`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#282522]/80 via-transparent to-transparent" />

        {/* Experience Pill */}
        <div className="absolute top-2.5 right-2.5 z-10 bg-[#4F0E11]/90 backdrop-blur-xs text-[#E0C496] text-[10px] font-bold px-2 py-0.5 rounded-xs border border-[#C7A46A]/30">
          {artisan.experienceYears}+ Years Master Loom
        </div>

        {/* Avatar Overlap */}
        <div className="absolute -bottom-5 left-4 z-10">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#FFF9F0] shadow-md bg-[#F5EBDD]">
            <Image
              src={artisan.avatar}
              alt={artisan.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content Details */}
      <div className="pt-7 px-4 pb-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#776B5E] mb-1">
            <Compass className="w-3.5 h-3.5 text-[#C7A46A]" />
            <span>{artisan.stateName}</span>
            <span>•</span>
            <span className="truncate">{artisan.community}</span>
          </div>

          <h4 className="font-serif text-base font-semibold text-[#6E171B] group-hover:text-[#8A2529] transition-colors">
            {artisan.name}
          </h4>

          <p className="text-xs font-medium text-[#9C7942] mt-0.5">
            {artisan.craftSpeciality}
          </p>

          <p className="text-xs text-[#776B5E] line-clamp-3 mt-2 leading-relaxed">
            {artisan.shortBio}
          </p>

          {/* Awards */}
          {artisan.recognizedAwards && artisan.recognizedAwards.length > 0 && (
            <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#4F0E11] font-semibold bg-[#F5EBDD] px-2.5 py-1 rounded-xs border border-[#C7A46A]/30">
              <Award className="w-3.5 h-3.5 text-[#C7A46A] shrink-0" />
              <span className="truncate">{artisan.recognizedAwards[0]}</span>
            </div>
          )}
        </div>

        {/* Link to State Crafts */}
        <div className="pt-2 border-t border-[#E8DCCD]/60 flex items-center justify-between">
          <span className="text-[11px] text-[#776B5E]">GI Craft Guardian</span>
          <Link
            href={`/states/${artisan.stateId}`}
            className="text-xs font-semibold text-[#6E171B] hover:text-[#8A2529] flex items-center gap-1 group/btn"
          >
            <span>View Creations</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

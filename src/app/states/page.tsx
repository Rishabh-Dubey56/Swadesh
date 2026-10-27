"use client";

import React, { useState, useMemo } from "react";
import { INDIAN_STATES, REGIONS } from "@/data/states";
import { StateCard } from "@/components/states/StateCard";
import { Compass, Search } from "lucide-react";
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/ScrollAnimation";

export default function StatesPage() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const filteredStates = useMemo(() => {
    return INDIAN_STATES.filter((s) => {
      // Region
      if (selectedRegion !== "All" && s.region.toLowerCase() !== selectedRegion.toLowerCase()) {
        return false;
      }
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = s.name.toLowerCase().includes(q);
        const matchesCraft = s.famousCrafts.some((c) => c.toLowerCase().includes(q));
        const matchesTextile = s.keyTextiles.some((t) => t.toLowerCase().includes(q));
        const matchesCapital = s.capital.toLowerCase().includes(q);
        if (!matchesName && !matchesCraft && !matchesTextile && !matchesCapital) {
          return false;
        }
      }
      return true;
    });
  }, [search, selectedRegion]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-[0.25em] text-[#C7A46A]">
          <Compass className="w-4 h-4" />
          <span>The Living Heritage Map</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#6E171B]">
          28 States of India. 28 Cultures.
        </h1>
        <p className="text-xs sm:text-sm text-[#776B5E] leading-relaxed">
          India&apos;s textile genius is deeply geographical. Journey across all 28 states to uncover ancient pit-loom weaves, GI-certified natural dye rituals, and sovereign regional attires.
        </p>
      </ScrollReveal>

      {/* Search & Region Filters */}
      <ScrollReveal yOffset={25} duration={0.6}>
        <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-4 sm:p-6 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Box */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#776B5E]" />
              <input
                type="text"
                placeholder="Search by state, craft (e.g. Kalamkari, Bandhani)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#FFF9F0] border border-[#E8DCCD] rounded-xs pl-9 pr-3 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
              />
            </div>

            <span className="text-xs text-[#776B5E] font-medium">
              Showing <strong className="text-[#6E171B]">{filteredStates.length}</strong> of 28 States
            </span>
          </div>

          {/* Region Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E8DCCD]/60">
            <button
              type="button"
              onClick={() => setSelectedRegion("All")}
              className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                selectedRegion === "All"
                  ? "bg-[#6E171B] text-[#FFF9F0]"
                  : "bg-[#FFF9F0] text-[#776B5E] border border-[#E8DCCD] hover:border-[#C7A46A]"
              }`}
            >
              All 28 States
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
                {r.name} ({r.count})
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* State Cards Grid */}
      {filteredStates.length === 0 ? (
        <div className="p-12 text-center bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm text-xs text-[#776B5E]">
          No Indian states match &ldquo;{search}&rdquo;. Try clearing your query to explore all 28 states.
        </div>
      ) : (
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.06}>
          {filteredStates.map((st) => (
            <StaggerItem key={st.id} yOffset={28}>
              <StateCard stateData={st} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  );
}

"use client";

import React from "react";
import { Filter, RotateCcw, Search, ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { REGIONS } from "@/data/states";

export interface FilterState {
  search: string;
  category: string;
  region: string;
  state: string;
  priceRange: [number, number];
  sortBy: string;
  inStockOnly: boolean;
}

export interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalMatches: number;
}

export function ProductFilters({
  filters,
  onChange,
  onReset,
  totalMatches,
}: ProductFiltersProps) {
  const handleSearchChange = (val: string) => {
    onChange({ ...filters, search: val });
  };

  const handleCategoryChange = (val: string) => {
    onChange({ ...filters, category: val });
  };

  const handleRegionChange = (val: string) => {
    onChange({ ...filters, region: val });
  };

  const handleSortChange = (val: string) => {
    onChange({ ...filters, sortBy: val });
  };

  const handleStockToggle = () => {
    onChange({ ...filters, inStockOnly: !filters.inStockOnly });
  };

  return (
    <div className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm p-4 sm:p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8DCCD]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#6E171B]" />
          <h3 className="font-serif text-base font-semibold text-[#6E171B]">
            Refine Collection
          </h3>
          <span className="text-xs bg-[#F5EBDD] text-[#776B5E] px-2 py-0.5 rounded-full font-medium">
            {totalMatches} Items
          </span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-[#776B5E] hover:text-[#6E171B] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#776B5E]">
          Search Keywords
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#776B5E]" />
          <input
            type="text"
            placeholder="Katan, Pashmina, Chanderi..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs pl-8 pr-3 py-1.5 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
          />
        </div>
      </div>

      {/* Sort Option */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#776B5E]">
          Sort By
        </label>
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full appearance-none bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-1.5 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A] cursor-pointer"
          >
            <option value="popular">Most Popular &amp; Bestsellers</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating">Top Rated by Patrons</option>
            <option value="newest">Newest Artisan Additions</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-[#776B5E] pointer-events-none" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#776B5E]">
          Categories
        </label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          <label className="flex items-center gap-2 text-xs text-[#282522] hover:text-[#6E171B] cursor-pointer py-1">
            <input
              type="radio"
              name="category"
              checked={filters.category === ""}
              onChange={() => handleCategoryChange("")}
              className="accent-[#6E171B]"
            />
            <span>All Categories</span>
          </label>
          {CATEGORIES.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center justify-between text-xs text-[#282522] hover:text-[#6E171B] cursor-pointer py-1"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat.slug}
                  onChange={() => handleCategoryChange(cat.slug)}
                  className="accent-[#6E171B]"
                />
                <span>{cat.name}</span>
              </div>
              <span className="text-[10px] text-[#776B5E]">({cat.itemCount})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Region Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#776B5E]">
          Indian Regions
        </label>
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-xs text-[#282522] hover:text-[#6E171B] cursor-pointer py-1">
            <input
              type="radio"
              name="region"
              checked={filters.region === ""}
              onChange={() => handleRegionChange("")}
              className="accent-[#6E171B]"
            />
            <span>All Regions (28 States)</span>
          </label>
          {REGIONS.map((r) => (
            <label
              key={r.name}
              className="flex items-center justify-between text-xs text-[#282522] hover:text-[#6E171B] cursor-pointer py-1"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="region"
                  checked={filters.region === r.name}
                  onChange={() => handleRegionChange(r.name)}
                  className="accent-[#6E171B]"
                />
                <span>{r.name}</span>
              </div>
              <span className="text-[10px] text-[#776B5E]">({r.count} states)</span>
            </label>
          ))}
        </div>
      </div>

      {/* In Stock Only Checkbox */}
      <div className="pt-2 border-t border-[#E8DCCD]">
        <label className="flex items-center gap-2 text-xs text-[#282522] cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={handleStockToggle}
            className="accent-[#6E171B] rounded-xs"
          />
          <span className="font-medium">In-Stock Only (Ready to Dispatch)</span>
        </label>
      </div>
    </div>
  );
}

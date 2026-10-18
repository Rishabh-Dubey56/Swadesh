"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters, FilterState } from "@/components/products/ProductFilters";
import { ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

function ProductListingContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";
  const initialRegion = searchParams.get("region") || "";

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: initialSearch,
    category: initialCategory,
    region: initialRegion,
    state: "",
    priceRange: [0, 50000],
    sortBy: "popular",
    inStockOnly: false,
  });

  const handleReset = () => {
    setFilters({
      search: "",
      category: "",
      region: "",
      state: "",
      priceRange: [0, 50000],
      sortBy: "popular",
      inStockOnly: false,
    });
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCraft = p.craftType.toLowerCase().includes(query);
        const matchesState = p.stateName.toLowerCase().includes(query);
        const matchesCategory = p.categoryName.toLowerCase().includes(query);
        if (!matchesName && !matchesCraft && !matchesState && !matchesCategory) return false;
      }

      // Category
      if (filters.category && p.categorySlug !== filters.category) return false;

      // Region
      if (filters.region && p.region.toLowerCase() !== filters.region.toLowerCase()) return false;

      // Stock
      if (filters.inStockOnly && !p.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "price-low-high") return a.price - b.price;
      if (filters.sortBy === "price-high-low") return b.price - a.price;
      if (filters.sortBy === "rating") return b.rating - a.rating;
      if (filters.sortBy === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title & Banner */}
      <div className="border-b border-[#E8DCCD] pb-6">
        <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
          Authentic Loom Catalogue
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#6E171B] mt-1">
          Indian Handloom &amp; Cultural Apparel
        </h1>
        <p className="text-xs sm:text-sm text-[#776B5E] mt-1 max-w-2xl leading-relaxed">
          Explore certified authentic weaves, pure Mulberry &amp; Muga silks, Awadhi Chikankari, and tribal craft jewellery directly from India&apos;s weaver cooperatives.
        </p>

        {/* Active Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#E8DCCD]/60">
          <span className="text-xs font-semibold text-[#776B5E]">Showing:</span>
          <span className="text-xs font-bold text-[#6E171B] bg-[#F5EBDD] px-2.5 py-1 rounded-xs border border-[#C7A46A]/30">
            {filteredProducts.length} Authenticated Items
          </span>

          {filters.category && (
            <span className="inline-flex items-center gap-1 text-xs bg-[#FAF4EB] text-[#282522] border border-[#E8DCCD] px-2.5 py-1 rounded-xs">
              Category: {filters.category}
              <button
                type="button"
                onClick={() => setFilters({ ...filters, category: "" })}
                className="hover:text-red-700 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.region && (
            <span className="inline-flex items-center gap-1 text-xs bg-[#FAF4EB] text-[#282522] border border-[#E8DCCD] px-2.5 py-1 rounded-xs">
              Region: {filters.region}
              <button
                type="button"
                onClick={() => setFilters({ ...filters, region: "" })}
                className="hover:text-red-700 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.search && (
            <span className="inline-flex items-center gap-1 text-xs bg-[#FAF4EB] text-[#282522] border border-[#E8DCCD] px-2.5 py-1 rounded-xs">
              Search: &ldquo;{filters.search}&rdquo;
              <button
                type="button"
                onClick={() => setFilters({ ...filters, search: "" })}
                className="hover:text-red-700 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(filters.category || filters.region || filters.search || filters.inStockOnly) && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-[#6E171B] underline hover:text-[#8A2529] ml-2 cursor-pointer"
            >
              Clear All
            </button>
          )}

          {/* Mobile Filter Button */}
          <div className="ml-auto lg:hidden">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setMobileFilterOpen(true)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-1.5" />
              <span>Filters ({filteredProducts.length})</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid & Filters Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              onReset={handleReset}
              totalMatches={filteredProducts.length}
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5EBDD] flex items-center justify-center mx-auto text-[#776B5E]">
                <ShoppingBag className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#282522]">
                No Handlooms Match Your Selected Filters
              </h3>
              <p className="text-xs text-[#776B5E] max-w-sm mx-auto">
                Try widening your price range, searching for different states or crafts, or clearing specific filter tags.
              </p>
              <Button variant="primary" size="sm" onClick={handleReset}>
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-y-auto bg-[#282522]/60 p-4">
          <div className="bg-[#FFF9F0] rounded-sm p-5 max-w-md mx-auto my-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DCCD]">
              <h3 className="font-serif text-lg font-semibold text-[#6E171B]">
                Filter Catalogue
              </h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-[#776B5E] hover:text-[#6E171B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              onReset={handleReset}
              totalMatches={filteredProducts.length}
            />
            <Button
              variant="primary"
              className="w-full"
              onClick={() => setMobileFilterOpen(false)}
            >
              Apply Filters ({filteredProducts.length} Items)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#776B5E]">Loading SWADESH Catalogue...</div>}>
      <ProductListingContent />
    </Suspense>
  );
}

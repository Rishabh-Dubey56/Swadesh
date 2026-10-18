"use client";

import React from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { getProductById } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();

  const wishlistedProducts = items
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DCCD]">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
            Curated Favorites
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#6E171B] mt-1">
            My Cultural Wishlist ({wishlistedProducts.length} Items)
          </h1>
        </div>

        {wishlistedProducts.length > 0 && (
          <button
            type="button"
            onClick={clearWishlist}
            className="text-xs text-[#776B5E] hover:text-red-700 underline cursor-pointer"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F5EBDD] flex items-center justify-center mx-auto text-[#776B5E]">
            <Heart className="w-8 h-8 opacity-40" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-semibold text-[#282522]">
              Your Wishlist is Empty
            </h3>
            <p className="text-xs text-[#776B5E]">
              Save authentic weaves, handcrafted mojaris, and heritage jewellery to revisit anytime.
            </p>
          </div>
          <Link href="/products">
            <Button variant="primary" size="md">
              <span>Explore Traditional Handlooms</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

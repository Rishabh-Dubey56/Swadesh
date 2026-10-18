"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Button } from "@/components/ui/Button";
import { ShoppingBag, Heart, Check, Plus, Minus, Zap } from "lucide-react";

export interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "Standard");
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || "Original"
  );
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(
      {
        id: `${product.id}-${selectedSize}-${selectedColor}`,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        image: product.images[0],
        price: product.price,
        selectedSize,
        selectedColor,
        stateName: product.stateName,
        craftType: product.craftType,
      },
      quantity
    );
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Size Variant Selector */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-[#776B5E]">
              Select Sizing / Dimensions
            </span>
            <span className="text-[#9C7942] font-medium">Authentic Draping</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setSelectedSize(sz)}
                className={`text-xs px-4 py-2 rounded-xs border font-medium transition-all cursor-pointer ${
                  selectedSize === sz
                    ? "border-[#6E171B] bg-[#6E171B] text-[#FFF9F0] shadow-xs"
                    : "border-[#E8DCCD] bg-[#FAF4EB] text-[#282522] hover:border-[#C7A46A]"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Swatches */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-[#776B5E]">
              Color Motif: <strong className="text-[#282522]">{selectedColor}</strong>
            </span>
            <span className="text-[11px] text-[#776B5E]">Natural Dye Variations</span>
          </div>
          <div className="flex items-center gap-3">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(c.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs border text-xs cursor-pointer transition-all ${
                  selectedColor === c.name
                    ? "border-[#6E171B] bg-[#F5EBDD] font-bold text-[#6E171B] ring-1 ring-[#6E171B]"
                    : "border-[#E8DCCD] bg-[#FAF4EB] text-[#282522] hover:border-[#C7A46A]"
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/20"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & CTA Buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#776B5E]">
            Quantity:
          </span>
          <div className="flex items-center border border-[#E8DCCD] rounded-xs bg-[#FAF4EB]">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-[#776B5E] hover:text-[#6E171B] cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-[#282522]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-[#776B5E] hover:text-[#6E171B] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-xs text-emerald-700 font-medium">
            {product.stockCount} Handcrafted Pieces Available
          </span>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleAddToCart}
            className="w-full font-serif font-semibold"
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 text-emerald-300 mr-2" />
                <span>Added to Artisan Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#E0C496] mr-2" />
                <span>Add to Artisan Bag</span>
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="gold"
            size="lg"
            onClick={handleBuyNow}
            className="w-full font-serif font-semibold text-[#282522]"
          >
            <Zap className="w-4 h-4 mr-1.5" />
            <span>Express Direct Buy</span>
          </Button>
        </div>

        {/* Wishlist button */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className="inline-flex items-center gap-1.5 text-xs text-[#776B5E] hover:text-[#6E171B] cursor-pointer transition-colors"
          >
            <Heart
              className={`w-4 h-4 ${
                wishlisted ? "fill-[#6E171B] text-[#6E171B]" : "text-[#776B5E]"
              }`}
            />
            <span>
              {wishlisted ? "Saved in Your Wishlist" : "Save to Personal Wishlist"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

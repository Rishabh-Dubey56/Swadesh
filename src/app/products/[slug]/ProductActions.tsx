"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Plus, Minus, Check, ShieldCheck, Award, RotateCcw, Lock } from "lucide-react";

export interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(
    product.sizes[0] || "M"
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || "Grey"
  );
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

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
    setTimeout(() => {
      setAddedAnimation(false);
      openCart();
    }, 600);
  };

  const handleBuyNow = () => {
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
    router.push("/checkout");
  };

  return (
    <div className="space-y-5 pt-1">
      {/* Color Swatches — "Color: Grey" matching reference */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs text-[#282522]">
            <span className="text-[#776B5E]">Color: </span>
            <span className="font-semibold text-[#282522]">{selectedColor}</span>
          </div>
          <div className="flex items-center gap-2.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(c.name)}
                title={c.name}
                className={`w-7 h-7 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                  selectedColor === c.name
                    ? "ring-2 ring-offset-2 ring-[#6E171B] border-transparent scale-110"
                    : "border-black/20 hover:scale-105"
                }`}
                style={{ backgroundColor: c.hex }}
                aria-label={`Select color ${c.name}`}
              >
                {selectedColor === c.name && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      c.hex === "#FFF9F0" || c.hex === "#FAF4EB" ? "bg-black" : "bg-white"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Variant Selector — "Size:" matching reference */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs text-[#776B5E]">
            <span>Size:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setSelectedSize(sz)}
                className={`min-w-10 h-10 px-3 flex items-center justify-center rounded-sm border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedSize === sz
                    ? "border-[#282522] bg-[#282522] text-[#FFF9F0] shadow-xs"
                    : "border-[#E8DCCD] bg-[#FFF9F0] text-[#282522] hover:border-[#6E171B]"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector — [-] 1 [+] matching reference */}
      <div className="flex items-center gap-3 pt-1">
        <div className="flex items-center border border-[#E8DCCD] rounded-sm bg-[#FFF9F0] shadow-2xs">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-9 h-9 flex items-center justify-center text-[#776B5E] hover:text-[#282522] hover:bg-[#FAF4EB] transition-colors cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center text-xs font-bold text-[#282522]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-9 h-9 flex items-center justify-center text-[#776B5E] hover:text-[#282522] hover:bg-[#FAF4EB] transition-colors cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <span className="text-[11px] text-[#776B5E]">
          {product.stockCount} handcrafted pieces in stock
        </span>
      </div>

      {/* Action Buttons — ADD TO CART and BUY NOW matching reference */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full h-12 px-4 rounded-sm border border-[#282522] bg-[#FFF9F0] hover:bg-[#FAF4EB] text-[#282522] font-semibold text-xs uppercase tracking-[0.15em] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
        >
          {addedAnimation ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Added</span>
            </>
          ) : (
            <span>ADD TO CART</span>
          )}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="w-full h-12 px-4 rounded-sm bg-[#6E171B] hover:bg-[#8A2529] text-[#FFF9F0] font-semibold text-xs uppercase tracking-[0.15em] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
        >
          <span>BUY NOW</span>
        </button>
      </div>

      {/* Trust & Guarantee Strip matching reference: Authentic craft, Quality Assured, Easy Returns, Secure Payment */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-[#E8DCCD] text-[#776B5E]">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px]">
          <ShieldCheck className="w-4 h-4 text-[#C7A46A] shrink-0" />
          <span className="leading-tight">Authentic {product.stateName ? `${product.stateName} Craft` : "Craft"}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px]">
          <Award className="w-4 h-4 text-[#C7A46A] shrink-0" />
          <span className="leading-tight">Quality Assured</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px]">
          <RotateCcw className="w-4 h-4 text-[#C7A46A] shrink-0" />
          <span className="leading-tight">Easy Returns</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px]">
          <Lock className="w-4 h-4 text-[#C7A46A] shrink-0" />
          <span className="leading-tight">Secure Payment</span>
        </div>
      </div>
    </div>
  );
}

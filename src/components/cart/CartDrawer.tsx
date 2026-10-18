"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";
import { useCartStore, VALID_COUPONS } from "@/store/cartStore";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscount,
    getShippingFee,
    getTotal,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShippingFee();
  const total = getTotal();

  const freeShippingThreshold = 2500;
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (code: string) => {
    setCouponError("");
    setCouponSuccess("");
    const result = applyCoupon(code);
    if (result.success) {
      setCouponSuccess(result.message);
      setCouponInput("");
    } else {
      setCouponError(result.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-[#282522]/60 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Slide-over panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#FFF9F0] border-l border-[#E8DCCD] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-[#E8DCCD] flex items-center justify-between bg-[#F5EBDD]/60">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#6E171B]" />
                  <h3 className="font-serif text-lg font-semibold text-[#6E171B]">
                    Artisan Bag ({items.reduce((s, i) => s + i.quantity, 0)})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="p-1.5 text-[#776B5E] hover:text-[#6E171B] hover:bg-[#E8DCCD] rounded-xs transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress */}
              <div className="px-5 py-3 bg-[#FAF4EB] border-b border-[#E8DCCD] text-xs">
                {subtotal >= freeShippingThreshold ? (
                  <p className="text-emerald-700 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    You unlocked Complimentary Handloom Shipping!
                  </p>
                ) : (
                  <div>
                    <p className="text-[#776B5E]">
                      Add{" "}
                      <span className="font-semibold text-[#6E171B]">
                        {formatINR(amountNeededForFreeShipping)}
                      </span>{" "}
                      more for free direct-to-loom delivery.
                    </p>
                    <div className="w-full bg-[#E8DCCD] h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="bg-[#C7A46A] h-full transition-all duration-300"
                        style={{ width: `${freeShippingProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#F5EBDD] flex items-center justify-center text-[#776B5E]">
                      <ShoppingBag className="w-8 h-8 opacity-40" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-[#282522]">
                        Your bag is empty
                      </h4>
                      <p className="text-xs text-[#776B5E] mt-1 max-w-xs">
                        Explore handloom sarees, royal kurtas, and artisanal jewellery from 28 states.
                      </p>
                    </div>
                    <Link
                      href="/products"
                      onClick={closeCart}
                      className="bg-[#6E171B] text-[#FFF9F0] text-xs font-semibold px-6 py-2.5 rounded-sm hover:bg-[#8A2529] transition-colors"
                    >
                      Start Exploring Culture
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3.5 p-3 rounded-sm border border-[#E8DCCD] bg-[#FAF4EB]/80"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 h-24 rounded-xs overflow-hidden shrink-0 border border-[#E8DCCD] bg-[#F5EBDD]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h5 className="text-xs font-medium text-[#282522] line-clamp-2 leading-tight">
                              <Link
                                href={`/products/${item.slug}`}
                                onClick={closeCart}
                                className="hover:text-[#6E171B]"
                              >
                                {item.name}
                              </Link>
                            </h5>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-[#776B5E] hover:text-red-700 p-1 cursor-pointer shrink-0"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[10px] text-[#776B5E] mt-0.5">
                            {item.craftType} • {item.stateName}
                          </p>
                          {item.selectedSize && (
                            <p className="text-[10px] text-[#282522] mt-0.5 font-medium">
                              Size: {item.selectedSize}
                            </p>
                          )}
                          {item.selectedColor && (
                            <p className="text-[10px] text-[#282522] font-medium">
                              Color: {item.selectedColor}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[#E8DCCD]/60 mt-1">
                          {/* Quantity Counter */}
                          <div className="flex items-center border border-[#E8DCCD] rounded-xs bg-[#FFF9F0]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-[#776B5E] hover:text-[#6E171B] cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-semibold text-[#282522]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-[#776B5E] hover:text-[#6E171B] cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Item Price */}
                          <span className="text-xs font-bold text-[#6E171B]">
                            {formatINR(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Calculations & Checkout */}
              {items.length > 0 && (
                <div className="p-4 sm:p-5 bg-[#F5EBDD]/60 border-t border-[#E8DCCD] space-y-3">
                  {/* Coupon Code Section */}
                  <div className="space-y-1.5">
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xs text-xs text-emerald-800">
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>
                            Code <strong className="font-mono">{appliedCoupon.code}</strong> applied ({appliedCoupon.type === "percent" ? `${appliedCoupon.value}% off` : `₹${appliedCoupon.value} off`})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={removeCoupon}
                          className="text-xs text-red-600 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Coupon code (e.g. SWADESH10)"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                            className="flex-1 bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-1.5 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
                          />
                          <button
                            type="button"
                            onClick={() => handleApplyCoupon(couponInput)}
                            className="bg-[#6E171B] hover:bg-[#8A2529] text-white text-xs px-3 py-1.5 rounded-xs font-semibold cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                        {/* Sample pills */}
                        <div className="flex items-center gap-1.5 text-[10px] text-[#776B5E] pt-0.5">
                          <span>Try:</span>
                          {Object.keys(VALID_COUPONS).map((code) => (
                            <button
                              key={code}
                              type="button"
                              onClick={() => handleApplyCoupon(code)}
                              className="font-mono text-[#6E171B] underline hover:text-[#8A2529] cursor-pointer"
                            >
                              {code}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                    {couponSuccess && !appliedCoupon && <p className="text-[11px] text-emerald-600">{couponSuccess}</p>}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#776B5E] pt-2 border-t border-[#E8DCCD]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#282522] font-medium">{formatINR(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Heritage Discount</span>
                        <span>-{formatINR(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Artisan Direct Shipping</span>
                      <span>{shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : formatINR(shipping)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#6E171B] pt-1.5 border-t border-[#E8DCCD]">
                      <span>Estimated Total</span>
                      <span>{formatINR(total)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-1">
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="w-full flex items-center justify-center gap-2 bg-[#6E171B] hover:bg-[#8A2529] text-[#FFF9F0] py-3 rounded-sm text-sm font-semibold transition-all shadow-sm group"
                    >
                      <span>Proceed to Artisan Checkout</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/cart"
                      onClick={closeCart}
                      className="block text-center text-xs text-[#776B5E] hover:text-[#6E171B] py-1 transition-colors"
                    >
                      View Detailed Cart Page →
                    </Link>
                  </div>

                  {/* Micro reassurance */}
                  <p className="text-[10px] text-center text-[#776B5E] flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#C7A46A]" />
                    Simulated payment • 100% Handloom Authenticity Guarantee
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  ArrowLeft,
} from "lucide-react";
import { useCartStore, VALID_COUPONS } from "@/store/cartStore";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart,
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

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#FAF4EB] border border-[#E8DCCD] flex items-center justify-center mx-auto text-[#776B5E]">
          <ShoppingBag className="w-10 h-10 opacity-40" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-[#6E171B]">
            Your Artisan Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#776B5E] max-w-md mx-auto">
            Discover sovereign silks, handspun pashminas, and royal kurtas from 28 states and support India&apos;s master artisans.
          </p>
        </div>
        <div>
          <Link href="/products">
            <Button variant="primary" size="lg">
              <span>Start Exploring Collections</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DCCD]">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
            Selected Heirlooms
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#6E171B] mt-1">
            Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)} Items)
          </h1>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-[#776B5E] hover:text-red-700 underline cursor-pointer"
        >
          Clear All Items
        </button>
      </div>

      {/* Free Shipping Banner */}
      <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-4 text-xs">
        {subtotal >= freeShippingThreshold ? (
          <p className="text-emerald-800 font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            You qualify for Complimentary Handloom Shipping!
          </p>
        ) : (
          <div className="space-y-2">
            <p className="text-[#282522]">
              Add{" "}
              <strong className="text-[#6E171B]">
                {formatINR(amountNeededForFreeShipping)}
              </strong>{" "}
              more to qualify for free direct-to-loom delivery.
            </p>
            <div className="w-full bg-[#E8DCCD] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#C7A46A] h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Items Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm divide-y divide-[#E8DCCD]/60 overflow-hidden">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Thumbnail & Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-24 rounded-xs overflow-hidden border border-[#E8DCCD] bg-[#F5EBDD] shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-semibold text-[#282522]">
                      <Link
                        href={`/products/${item.slug}`}
                        className="hover:text-[#6E171B]"
                      >
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#776B5E] mt-0.5">
                      {item.craftType} • {item.stateName}
                    </p>
                    <div className="flex gap-3 text-xs text-[#282522] mt-1 font-medium">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    </div>
                    <p className="text-xs font-bold text-[#6E171B] mt-1 sm:hidden">
                      {formatINR(item.price)} each
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Price */}
                <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-[#E8DCCD]/40">
                  <div className="flex items-center border border-[#E8DCCD] rounded-xs bg-[#FAF4EB]">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 text-[#776B5E] hover:text-[#6E171B] cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#282522]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 text-[#776B5E] hover:text-[#6E171B] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-sm font-bold text-[#6E171B] min-w-[80px] text-right">
                    {formatINR(item.price * item.quantity)}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-[#776B5E] hover:text-red-700 p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs text-[#6E171B] font-semibold hover:underline pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Exploring Traditional Handlooms</span>
          </Link>
        </div>

        {/* Right: Order Summary & Checkout Card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-5 shadow-xs">
            <h3 className="font-serif text-lg font-semibold text-[#6E171B] pb-3 border-b border-[#E8DCCD]">
              Order Summary
            </h3>

            {/* Coupon Section */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E]">
                Artisan Promotion Coupon
              </label>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xs text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      <strong className="font-mono">{appliedCoupon.code}</strong> Applied
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
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 bg-[#FFF9F0] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon(couponInput)}
                      className="bg-[#6E171B] hover:bg-[#8A2529] text-white text-xs px-3.5 py-2 rounded-xs font-semibold cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-[#776B5E]">
                    <span>Sample Codes:</span>
                    {Object.keys(VALID_COUPONS).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => handleApplyCoupon(c)}
                        className="font-mono text-[#6E171B] underline hover:text-[#8A2529] cursor-pointer"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
              {couponSuccess && !appliedCoupon && <p className="text-[11px] text-emerald-600">{couponSuccess}</p>}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-[#776B5E] pt-3 border-t border-[#E8DCCD]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#282522]">{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Artisan Discount</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Artisan Direct Shipping</span>
                <span>{shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : formatINR(shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#6E171B] pt-2 border-t border-[#E8DCCD]">
                <span>Total Amount</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <div className="pt-2">
              <Link href="/checkout">
                <Button variant="primary" size="lg" className="w-full font-serif font-semibold">
                  <span>Proceed to Artisan Checkout</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <p className="text-[10px] text-center text-[#776B5E] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C7A46A]" />
              Direct Value to Indian Weaver Guilds • Simulated Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

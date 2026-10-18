"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { AddressForm, AddressFormData } from "@/components/checkout/AddressForm";
import { DeliveryMethodSelector } from "@/components/checkout/DeliveryMethodSelector";
import { PaymentSelector, PaymentMethodType } from "@/components/checkout/PaymentSelector";
import { formatINR } from "@/lib/utils";
import { ShieldCheck, MapPin, Truck, CreditCard, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDiscount, getShippingFee, clearCart } = useCartStore();
  const { addresses } = useAuthStore();

  const [step, setStep] = useState<"address" | "delivery" | "payment">("address");
  const [shippingAddress, setShippingAddress] = useState<AddressFormData>({
    fullName: addresses[0]?.fullName || "Ananya Sharma",
    phone: addresses[0]?.phone || "9876543210",
    street: addresses[0]?.street || "Flat 402, Nilgiri Heritage Heights, 12th Main Road, Indiranagar",
    landmark: addresses[0]?.landmark || "Near Defense Colony Club",
    city: addresses[0]?.city || "Bengaluru",
    state: addresses[0]?.state || "Karnataka",
    pincode: addresses[0]?.pincode || "560038",
    addressType: addresses[0]?.addressType || "Home",
  });
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("UPI");
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const baseShipping = getShippingFee();
  const deliveryExtra = deliveryMethod === "express" ? 250 : 0;
  const shipping = baseShipping + deliveryExtra;
  const total = Math.max(0, subtotal - discount + shipping);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#6E171B]">
          No Items in Checkout Bag
        </h2>
        <p className="text-xs text-[#776B5E]">
          Please select handloom apparel or handcrafted items before proceeding to checkout.
        </p>
        <Link
          href="/products"
          className="inline-block bg-[#6E171B] text-white px-5 py-2.5 rounded-xs text-xs font-semibold"
        >
          Browse Catalogue
        </Link>
      </div>
    );
  }

  const handleAddressSubmit = (data: AddressFormData) => {
    setShippingAddress(data);
    setStep("delivery");
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    // Simulate verification delay
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      router.push("/checkout/success");
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Checkout Stepper Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-[#E8DCCD]">
        <div>
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs text-[#776B5E] hover:text-[#6E171B] mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Bag</span>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#6E171B]">
            Artisan Direct Checkout
          </h1>
        </div>

        {/* Steps indicator */}
        <div className="hidden sm:flex items-center gap-2 text-xs">
          <button
            onClick={() => setStep("address")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xs font-semibold ${
              step === "address"
                ? "bg-[#6E171B] text-white"
                : "bg-[#FAF4EB] text-[#776B5E]"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>1. Address</span>
          </button>
          <span>→</span>
          <button
            onClick={() => setStep("delivery")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xs font-semibold ${
              step === "delivery"
                ? "bg-[#6E171B] text-white"
                : "bg-[#FAF4EB] text-[#776B5E]"
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>2. Delivery</span>
          </button>
          <span>→</span>
          <button
            onClick={() => setStep("payment")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xs font-semibold ${
              step === "payment"
                ? "bg-[#6E171B] text-white"
                : "bg-[#FAF4EB] text-[#776B5E]"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>3. Payment</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Step Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Address */}
          <div className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DCCD]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#6E171B]" />
                <h3 className="font-serif text-lg font-semibold text-[#6E171B]">
                  1. Delivery Destination
                </h3>
              </div>
              {step !== "address" && (
                <button
                  type="button"
                  onClick={() => setStep("address")}
                  className="text-xs text-[#6E171B] underline hover:text-[#8A2529] font-medium cursor-pointer"
                >
                  Edit Address
                </button>
              )}
            </div>

            {step === "address" ? (
              <AddressForm
                initialValues={shippingAddress}
                onSubmitAddress={handleAddressSubmit}
              />
            ) : (
              <div className="text-xs text-[#776B5E] space-y-1 bg-[#FAF4EB] p-3.5 rounded-xs">
                <p className="font-semibold text-[#282522]">
                  {shippingAddress.fullName} ({shippingAddress.phone})
                </p>
                <p>{shippingAddress.street}</p>
                {shippingAddress.landmark && <p>Landmark: {shippingAddress.landmark}</p>}
                <p>
                  {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
                </p>
              </div>
            )}
          </div>

          {/* Step 2: Delivery Method */}
          <div className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DCCD]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#6E171B]" />
                <h3 className="font-serif text-lg font-semibold text-[#6E171B]">
                  2. Dispatch &amp; Packaging
                </h3>
              </div>
              {step === "payment" && (
                <button
                  type="button"
                  onClick={() => setStep("delivery")}
                  className="text-xs text-[#6E171B] underline hover:text-[#8A2529] font-medium cursor-pointer"
                >
                  Change Method
                </button>
              )}
            </div>

            {step === "delivery" ? (
              <div className="space-y-4">
                <DeliveryMethodSelector
                  selectedId={deliveryMethod}
                  onSelect={(id) => setDeliveryMethod(id)}
                />
                <button
                  type="button"
                  onClick={() => setStep("payment")}
                  className="w-full bg-[#6E171B] hover:bg-[#8A2529] text-white py-2.5 rounded-xs text-xs font-semibold transition-colors cursor-pointer"
                >
                  Confirm Dispatch &amp; Proceed to Payment
                </button>
              </div>
            ) : step === "payment" ? (
              <div className="text-xs text-[#776B5E] bg-[#FAF4EB] p-3.5 rounded-xs flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#282522]">
                    {deliveryMethod === "express" ? "Express Heritage Courier" : "Artisan Direct Loom Dispatch"}
                  </p>
                  <p className="text-[11px]">
                    {deliveryMethod === "express" ? "1-2 Business Days" : "3-5 Business Days"}
                  </p>
                </div>
                <span className="font-bold text-[#6E171B]">
                  {deliveryExtra === 0 ? "FREE" : formatINR(deliveryExtra)}
                </span>
              </div>
            ) : (
              <p className="text-xs text-[#776B5E] italic">
                Please complete the shipping address step first.
              </p>
            )}
          </div>

          {/* Step 3: Payment */}
          <div className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E8DCCD]">
              <CreditCard className="w-4 h-4 text-[#6E171B]" />
              <h3 className="font-serif text-lg font-semibold text-[#6E171B]">
                3. Payment Method (Demo Simulation)
              </h3>
            </div>

            {step === "payment" ? (
              <PaymentSelector
                selectedMethod={paymentMethod}
                onSelectMethod={setPaymentMethod}
                totalAmount={total}
                onCompleteOrder={handleCompleteOrder}
                isProcessing={isProcessing}
              />
            ) : (
              <p className="text-xs text-[#776B5E] italic">
                Step unlocks after selecting delivery options.
              </p>
            )}
          </div>
        </div>

        {/* Right Col: Order Review */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-5 space-y-4 shadow-xs sticky top-28">
            <h4 className="font-serif text-base font-semibold text-[#6E171B] pb-2 border-b border-[#E8DCCD]">
              Artisan Bag Items ({items.length})
            </h4>

            {/* Micro items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-2.5 text-xs">
                  <div className="relative w-12 h-14 rounded-xs overflow-hidden border border-[#E8DCCD] bg-[#F5EBDD] shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#282522] truncate">{item.name}</p>
                    <p className="text-[10px] text-[#776B5E]">
                      Qty: {item.quantity} {item.selectedSize ? `• ${item.selectedSize}` : ""}
                    </p>
                    <p className="font-bold text-[#6E171B] mt-0.5">
                      {formatINR(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-[#776B5E] pt-3 border-t border-[#E8DCCD]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#282522]">{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Heritage Discount</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping &amp; Insurance</span>
                <span>{shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : formatINR(shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#6E171B] pt-2 border-t border-[#E8DCCD]">
                <span>Total Payable</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-[#776B5E] space-y-1">
              <p className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C7A46A]" />
                100% Authentic Handloom Guarantee
              </p>
              <p className="text-center italic mt-1 text-[#6E171B]">
                *Simulated test transaction. No real money charged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CheckoutSuccessPage() {
  const orderNumber = "SWD-2026-98214";
  const trackingNumber = "SWD-EXP-78921045IN";

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center space-y-8">
      {/* Success Icon */}
      <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-600 shadow-lg animate-in zoom-in duration-300">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C7A46A]">
          Dhanyavaad • Order Successfully Placed
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#6E171B]">
          Your Artisan Handloom Order is Confirmed
        </h1>
        <p className="text-xs sm:text-sm text-[#776B5E] max-w-lg mx-auto leading-relaxed">
          The master weavers have been notified to hand-inspect, fold in organic muslin, and dispatch your authenticated craft pieces.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 text-left space-y-4 max-w-xl mx-auto shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8DCCD] gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#776B5E]">
              Order Number
            </span>
            <p className="font-mono text-sm font-bold text-[#6E171B]">{orderNumber}</p>
          </div>
          <div className="sm:text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#776B5E]">
              Tracking Airway Bill
            </span>
            <p className="font-mono text-xs font-semibold text-[#282522]">{trackingNumber}</p>
          </div>
        </div>

        {/* Tracking Stepper Preview */}
        <div className="space-y-3 pt-1">
          <p className="text-xs font-semibold text-[#6E171B] flex items-center gap-1.5">
            <Package className="w-4 h-4 text-[#C7A46A]" />
            <span>Fulfillment Lifecycle:</span>
          </p>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="bg-[#FFF9F0] border border-emerald-300 p-2 rounded-xs text-emerald-800 font-semibold">
              ✓ Order Placed
            </div>
            <div className="bg-[#FFF9F0] border border-[#C7A46A] p-2 rounded-xs text-[#9C7942] font-semibold">
              Loom Dispatch
            </div>
            <div className="bg-[#FFF9F0] border border-[#E8DCCD] p-2 rounded-xs text-[#776B5E]">
              Doorstep Delivery
            </div>
          </div>
        </div>

        {/* Prototype Assurance */}
        <div className="pt-3 border-t border-[#E8DCCD] text-[11px] text-[#776B5E] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C7A46A] shrink-0" />
          <span>
            *Simulated payment &amp; reservation completed. You can view this order in your customer dashboard.
          </span>
        </div>
      </div>

      {/* Navigation CTAs */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
        <Link href="/account">
          <Button variant="primary" size="md">
            <span>View in My Account &amp; Track</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
        <Link href="/products">
          <Button variant="outline" size="md">
            <span>Continue Cultural Discovery</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

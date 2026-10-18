import React from "react";
import Link from "next/link";
import { Compass, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 sm:py-32 text-center space-y-6">
      <div className="inline-block p-4 rounded-full bg-[#FAF4EB] border border-[#E8DCCD] text-[#6E171B] mb-2">
        <Compass className="w-12 h-12 text-[#C7A46A] animate-spin-slow" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C7A46A]">
          404 • Cultural Path Not Found
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#6E171B]">
          This Loom Has Wandered Off The Map
        </h1>
        <p className="text-xs sm:text-sm text-[#776B5E] max-w-md mx-auto leading-relaxed">
          The heritage weave, state craft page, or story you are searching for might have been moved or archived. Let us guide you back to our living collections.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
        <Link href="/">
          <Button variant="primary" size="md">
            <span>Return to SWADESH Home</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
        <Link href="/products">
          <Button variant="outline" size="md">
            <ShoppingBag className="w-4 h-4 mr-1 text-[#C7A46A]" />
            <span>Explore Handloom Sarees &amp; Kurtas</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

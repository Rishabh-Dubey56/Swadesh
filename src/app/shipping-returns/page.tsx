import React from "react";
import { Truck, RotateCcw, PackageCheck, AlertCircle } from "lucide-react";

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C7A46A]">
          Care, Transit &amp; Protection
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#6E171B]">
          Shipping, Packaging &amp; Returns Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#776B5E] max-w-xl mx-auto leading-relaxed">
          How we protect your authentic handlooms from the weaver&apos;s loom to your doorstep.
        </p>
      </div>

      <div className="space-y-8 text-xs text-[#282522]">
        {/* Section 1: Packaging */}
        <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#6E171B]">
            <PackageCheck className="w-5 h-5 text-[#C7A46A]" />
            <h2 className="font-serif text-xl font-bold">1. Museum-Grade Heirloom Packaging</h2>
          </div>
          <p className="leading-relaxed text-[#776B5E]">
            Handloom textiles are living, breathing natural fabrics. We do not use plastic covers. Every saree, shawl, and kurta is wrapped in unbleached organic cotton muslin, nestled alongside natural Himalayan cedar blocks to protect pure silk and wool against moisture. Packages are sealed in rigid gold-foiled craft boxes bearing the official Silk Mark hologram.
          </p>
        </div>

        {/* Section 2: Delivery Timeline */}
        <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#6E171B]">
            <Truck className="w-5 h-5 text-[#C7A46A]" />
            <h2 className="font-serif text-xl font-bold">2. Domestic &amp; International Delivery</h2>
          </div>
          <div className="space-y-2 text-[#776B5E]">
            <p>
              <strong className="text-[#282522]">Complimentary Domestic Shipping:</strong> Orders above ₹2,500 qualify for complimentary insured courier dispatch across all pincodes in India. Orders below ₹2,500 carry a nominal flat rate of ₹150.
            </p>
            <p>
              <strong className="text-[#282522]">Transit Duration:</strong> Standard artisan loom dispatch requires 3 to 5 business days. Express priority air courier delivers within 1 to 2 business days.
            </p>
            <p>
              <strong className="text-[#282522]">International Shipping:</strong> We ship to 42 countries via DHL Express. International transit takes 4 to 8 business days.
            </p>
          </div>
        </div>

        {/* Section 3: Returns & Exchanges */}
        <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#6E171B]">
            <RotateCcw className="w-5 h-5 text-[#C7A46A]" />
            <h2 className="font-serif text-xl font-bold">3. 7-Day Cultural Heritage Exchange</h2>
          </div>
          <div className="space-y-2 text-[#776B5E]">
            <p>
              We want you to treasure your handcrafted attire. If you wish to exchange your piece or request a return:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Submit a return request via your account within 7 days of delivery.</li>
              <li>Garments must remain unworn, unwashed, and with all original Silk Mark and GI barcode tags intact.</li>
              <li>Reverse pickup is arranged from your doorstep free of charge.</li>
              <li>Refunds are processed to the original payment source within 3 business days of loom inspection.</li>
            </ul>
          </div>
        </div>

        {/* Section 4: Handloom Characteristics */}
        <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#6E171B]">
            <AlertCircle className="w-5 h-5 text-[#C7A46A]" />
            <h2 className="font-serif text-xl font-bold">4. Nature of Handcrafted Variations</h2>
          </div>
          <p className="leading-relaxed text-[#776B5E]">
            Authentic handloom fabrics often display minute irregularities in the weave, minor slubs in the silk yarn, and subtle variations in natural vegetable-dye shades. These are not manufacturing defects—they are the sacred fingerprint of human hands on a wooden pit loom.
          </p>
        </div>
      </div>
    </div>
  );
}

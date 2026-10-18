import React from "react";
import { ShieldCheck, Scale, Award, HeartHandshake } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C7A46A]">
          Legal &amp; Cultural Charter
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#6E171B]">
          Terms of Service &amp; Artisan Code of Ethics
        </h1>
        <p className="text-xs sm:text-sm text-[#776B5E] max-w-xl mx-auto leading-relaxed">
          The mutual agreement between SWADESH, our master weaving guilds, and conscious patrons.
        </p>
      </div>

      <div className="space-y-6 text-xs text-[#282522]">
        <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#6E171B]">
            <HeartHandshake className="w-5 h-5 text-[#C7A46A]" />
            <h2 className="font-serif text-xl font-bold">1. The Fair Trade Artisan Covenant</h2>
          </div>
          <p className="leading-relaxed text-[#776B5E]">
            All sellers on the SWADESH platform represent verified generational artisan guilds, cooperative societies, or self-help groups. By purchasing on SWADESH, patrons support genuine living wages, health insurance allocations, and educational funds for weaver children in rural clusters.
          </p>
        </div>

        <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#6E171B]">
            <Scale className="w-5 h-5 text-[#C7A46A]" />
            <h2 className="font-serif text-xl font-bold">2. Intellectual Property &amp; GI Tag Protection</h2>
          </div>
          <p className="leading-relaxed text-[#776B5E]">
            Traditional motifs, such as Kashmiri Sozni florals, Jamnagar Bandhani patterns, and Paithani peacock tapestries, represent indigenous communal intellectual property protected under Indian GI legislation. Any commercial piracy or automated machine copying of listed handcrafted designs is strictly prohibited.
          </p>
        </div>

        <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#6E171B]">
            <ShieldCheck className="w-5 h-5 text-[#C7A46A]" />
            <h2 className="font-serif text-xl font-bold">3. Demonstration Environment Notice</h2>
          </div>
          <p className="leading-relaxed text-[#776B5E]">
            SWADESH is presented as an interactive cultural commerce demonstration. Orders, checkout flows, tracking simulations, and seller payouts function as prototype features. No real banking debits or financial transactions are executed.
          </p>
        </div>

        <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#6E171B]">
            <Award className="w-5 h-5 text-[#C7A46A]" />
            <h2 className="font-serif text-xl font-bold">4. Governing Law</h2>
          </div>
          <p className="leading-relaxed text-[#776B5E]">
            These terms are governed by the laws of India, under the jurisdiction of the courts of New Delhi, in alignment with Ministry of Textiles guidelines and the Geographical Indications of Goods Act, 1999.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: "Authenticity & GI Tags",
    question: "How does SWADESH guarantee authentic handloom rather than powerloom replicas?",
    answer:
      "Every piece on SWADESH is certified by the Silk Mark Organization of India, Handloom Mark, and official GI registry tags. Our curator team audits the physical pit-loom workshops, verifies thread counts, tests zari purity, and verifies that no automatic jacquard powerlooms are employed.",
  },
  {
    category: "Authenticity & GI Tags",
    question: "What is a Geographical Indication (GI) tag and why does it matter?",
    answer:
      "A Geographical Indication (GI) is a prestigious intellectual property recognition issued by the Government of India acknowledging that a craft's quality, reputation, and characteristics are inextricably linked to its origin (such as Banarasi brocades from Varanasi or Pashmina from Kashmir). It legally protects traditional weavers from industrial counterfeiters.",
  },
  {
    category: "Shipping & Delivery",
    question: "How are garments packaged and when will my artisan piece arrive?",
    answer:
      "All textiles are wrapped in breathable, unbleached organic cotton muslin, sealed with cedarwood protection, and shipped inside rigid heritage gift boxes. Standard direct-from-loom dispatch takes 3 to 5 business days across India. Express courier delivers in 1 to 2 business days.",
  },
  {
    category: "Shipping & Delivery",
    question: "Do you ship internationally to cultural connoisseurs abroad?",
    answer:
      "Yes. SWADESH ships to patrons across 42 countries worldwide using DHL Express Artisan Logistics with certified export documentation and customs-cleared handloom declarations.",
  },
  {
    category: "Returns & Exchanges",
    question: "What is the 7-day cultural exchange and return policy?",
    answer:
      "If your handcrafted item does not match your expectations or sizing requirements, you can request an exchange or full refund within 7 calendar days of doorstep delivery. The piece must remain unused with its authentic Silk Mark tags intact.",
  },
  {
    category: "Artisan Welfare",
    question: "How does SWADESH ensure direct fair value for weavers?",
    answer:
      "By eliminating commercial wholesale middlemen, more than 80% of retail purchase value flows directly into the verified bank accounts of our partner weaver cooperative societies and artisan families, ensuring fair living wages.",
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C7A46A]">
          Help &amp; Knowledge Base
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#6E171B]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#776B5E] leading-relaxed max-w-xl mx-auto">
          Everything you need to know about our Silk Mark certifications, direct loom dispatch, and fair trade guarantees.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF4EB] transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#9C7942]">
                    {faq.category}
                  </span>
                  <h3 className="font-serif text-base font-semibold text-[#6E171B]">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#776B5E] transition-transform duration-200 shrink-0 ml-4 ${
                    isOpen ? "rotate-180 text-[#6E171B]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-[#282522] leading-relaxed border-t border-[#E8DCCD]/60 pt-3 bg-[#FAF4EB]/60">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

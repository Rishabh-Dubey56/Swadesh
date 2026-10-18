"use client";

import React from "react";
import { Clock } from "lucide-react";
import { formatINR } from "@/lib/utils";

export interface DeliveryMethod {
  id: "standard" | "express";
  name: string;
  description: string;
  estimate: string;
  fee: number;
}

export const DELIVERY_OPTIONS: DeliveryMethod[] = [
  {
    id: "standard",
    name: "Artisan Direct Loom Dispatch",
    description: "Hand-packaged in organic cotton muslin with certified Silk Mark tag.",
    estimate: "3-5 Business Days",
    fee: 0,
  },
  {
    id: "express",
    name: "Express Heritage Courier",
    description: "Expedited priority air delivery with live doorstep GPS tracking.",
    estimate: "1-2 Business Days",
    fee: 250,
  },
];

export interface DeliveryMethodSelectorProps {
  selectedId: "standard" | "express";
  onSelect: (id: "standard" | "express") => void;
}

export function DeliveryMethodSelector({
  selectedId,
  onSelect,
}: DeliveryMethodSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E]">
        Select Dispatch Method
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DELIVERY_OPTIONS.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`p-4 rounded-sm border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                isSelected
                  ? "border-[#6E171B] bg-[#F5EBDD]/60 ring-1 ring-[#6E171B]"
                  : "border-[#E8DCCD] bg-[#FAF4EB] hover:border-[#C7A46A]"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? "border-[#6E171B] bg-[#6E171B]"
                        : "border-[#776B5E]"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-[#282522]">
                    {opt.name}
                  </h4>
                </div>
                <span className="text-xs font-bold text-[#6E171B]">
                  {opt.fee === 0 ? "FREE" : formatINR(opt.fee)}
                </span>
              </div>

              <p className="text-[11px] text-[#776B5E] leading-relaxed">
                {opt.description}
              </p>

              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#4F0E11] pt-1 border-t border-[#E8DCCD]/60">
                <Clock className="w-3.5 h-3.5 text-[#C7A46A]" />
                <span>Estimated Arrival: {opt.estimate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

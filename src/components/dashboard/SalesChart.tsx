"use client";

import React, { useState } from "react";
import { formatINR } from "@/lib/utils";

export interface MonthlyDataPoint {
  month: string;
  sales: number; // in INR
  orders: number;
}

export const SAMPLE_MONTHLY_SALES: MonthlyDataPoint[] = [
  { month: "Oct", sales: 245000, orders: 38 },
  { month: "Nov", sales: 310000, orders: 49 },
  { month: "Dec", sales: 480000, orders: 74 },
  { month: "Jan", sales: 395000, orders: 61 },
  { month: "Feb", sales: 420000, orders: 68 },
  { month: "Mar", sales: 560000, orders: 92 },
];

export function SalesChart() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const maxSales = Math.max(...SAMPLE_MONTHLY_SALES.map((d) => d.sales));

  return (
    <div className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8DCCD]">
        <div>
          <h4 className="font-serif text-base font-semibold text-[#6E171B]">
            Artisan Handloom Revenue (Last 6 Months)
          </h4>
          <p className="text-xs text-[#776B5E]">
            Direct-to-loom transactions &amp; craft sales performance
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase font-bold tracking-wider text-[#776B5E]">
            Current Month Peak
          </span>
          <p className="text-base font-bold text-[#6E171B]">
            {formatINR(SAMPLE_MONTHLY_SALES[SAMPLE_MONTHLY_SALES.length - 1].sales)}
          </p>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="pt-4 pb-2">
        <div className="h-44 flex items-end justify-between gap-2 sm:gap-6 px-2">
          {SAMPLE_MONTHLY_SALES.map((d, idx) => {
            const heightPercent = Math.round((d.sales / maxSales) * 100);
            const isHovered = activeIdx === idx;

            return (
              <div
                key={d.month}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative"
              >
                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-12 bg-[#282522] text-[#FFF9F0] text-[10px] py-1 px-2.5 rounded-xs shadow-lg whitespace-nowrap z-20 pointer-events-none">
                    <p className="font-bold">{formatINR(d.sales)}</p>
                    <p className="text-[#C7A46A]">{d.orders} Handcrafted Orders</p>
                  </div>
                )}

                {/* Bar */}
                <div className="w-full max-w-[42px] bg-[#FAF4EB] rounded-t-xs h-full flex items-end overflow-hidden border border-[#E8DCCD]">
                  <div
                    className={`w-full transition-all duration-300 rounded-t-xs ${
                      isHovered
                        ? "bg-[#6E171B]"
                        : idx === SAMPLE_MONTHLY_SALES.length - 1
                        ? "bg-[#C7A46A]"
                        : "bg-[#8A2529]/80"
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Month Label */}
                <span className="text-xs font-semibold text-[#776B5E] group-hover:text-[#6E171B]">
                  {d.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footnote */}
      <div className="pt-2 border-t border-[#E8DCCD]/60 flex items-center justify-between text-[11px] text-[#776B5E]">
        <span>*Verified direct settlement through artisan bank accounts</span>
        <span className="text-emerald-700 font-semibold">+18.4% vs Previous Cycle</span>
      </div>
    </div>
  );
}

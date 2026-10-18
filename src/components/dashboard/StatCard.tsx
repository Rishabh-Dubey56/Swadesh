import React, { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: ReactNode;
  subtitle?: string;
}

export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  icon,
  subtitle,
}: StatCardProps) {
  return (
    <div className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:border-[#C7A46A]/50 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#776B5E]">
            {title}
          </p>
          <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#6E171B] mt-1">
            {value}
          </h4>
        </div>
        <div className="p-2.5 rounded-sm bg-[#F5EBDD] text-[#6E171B]">
          {icon}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-[#E8DCCD]/60 flex items-center justify-between text-xs">
        {change && (
          <span
            className={`flex items-center font-semibold ${
              isPositive ? "text-emerald-700" : "text-red-700"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            {change}
          </span>
        )}
        {subtitle && <span className="text-[#776B5E] text-[11px]">{subtitle}</span>}
      </div>
    </div>
  );
}

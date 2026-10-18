"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: number | string;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "flex border-b border-[#E8DCCD] overflow-x-auto no-scrollbar gap-2 sm:gap-6",
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-2 py-3 px-1 text-sm font-medium tracking-wide whitespace-nowrap border-b-2 transition-all cursor-pointer relative",
              isActive
                ? "border-[#6E171B] text-[#6E171B] font-semibold"
                : "border-transparent text-[#776B5E] hover:text-[#282522] hover:border-[#C7A46A]/50"
            )}
          >
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                  isActive
                    ? "bg-[#6E171B] text-[#FFF9F0]"
                    : "bg-[#F5EBDD] text-[#776B5E]"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

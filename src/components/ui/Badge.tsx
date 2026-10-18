import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "maroon" | "terracotta" | "cream" | "green" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "gold",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    gold: "bg-[#F5EBDD] text-[#9C7942] border border-[#C7A46A]/30 font-medium",
    maroon: "bg-[#6E171B] text-[#FFF9F0] font-medium",
    terracotta: "bg-[#C45538] text-white font-medium",
    cream: "bg-[#FAF4EB] text-[#282522] border border-[#E8DCCD]",
    green: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    outline: "bg-transparent border border-[#C7A46A] text-[#6E171B]",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 tracking-wider uppercase",
    md: "text-xs px-2.5 py-1 tracking-normal",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-sm font-sans select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

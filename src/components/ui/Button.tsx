"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-sm tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A46A] focus-visible:ring-offset-2";

    const variantStyles = {
      primary:
        "bg-[#6E171B] text-[#FFF9F0] hover:bg-[#8A2529] active:bg-[#4F0E11] shadow-sm",
      secondary:
        "bg-[#F5EBDD] text-[#282522] hover:bg-[#FAF4EB] border border-[#E8DCCD] active:bg-[#E2D2BD]",
      outline:
        "border border-[#C7A46A] text-[#6E171B] bg-transparent hover:bg-[#FAF4EB] active:bg-[#F5EBDD]",
      ghost:
        "text-[#282522] hover:bg-[#F5EBDD] active:bg-[#E8DCCD]",
      gold:
        "bg-[#C7A46A] text-[#282522] font-semibold hover:bg-[#DEC284] active:bg-[#9C7942] shadow-sm",
      danger:
        "bg-red-700 text-white hover:bg-red-800 active:bg-red-900",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5 h-8",
      md: "text-sm px-5 py-2.5 gap-2 h-10",
      lg: "text-base px-7 py-3 gap-2.5 h-12",
      icon: "p-2 h-10 w-10 justify-center",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

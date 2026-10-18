"use client";

import React, { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wider text-[#776B5E]"
          >
            {label}
            {props.required && <span className="text-[#8A2529] ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-[#776B5E] pointer-events-none flex items-center">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full rounded-sm border bg-[#FAF4EB] text-[#282522] placeholder-[#776B5E]/60 text-sm px-3.5 py-2.5 transition-colors focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C7A46A] focus:border-[#C7A46A] disabled:opacity-50 disabled:bg-[#F5EBDD]",
              icon ? "pl-10" : "pl-3.5",
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-[#E8DCCD]",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-[#776B5E] mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

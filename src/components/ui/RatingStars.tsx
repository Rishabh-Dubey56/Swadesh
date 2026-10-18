import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  count?: number;
  className?: string;
}

export function RatingStars({
  rating,
  max = 5,
  size = "sm",
  showCount = false,
  count,
  className,
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center text-[#C7A46A]">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const half = !filled && i < rating;
          return (
            <Star
              key={i}
              className={cn(
                sizeClasses[size],
                filled
                  ? "fill-[#C7A46A] text-[#C7A46A]"
                  : half
                  ? "fill-[#C7A46A]/50 text-[#C7A46A]"
                  : "text-[#E8DCCD] fill-transparent"
              )}
            />
          );
        })}
      </div>
      <span className="text-xs font-semibold text-[#282522]">
        {rating.toFixed(1)}
      </span>
      {showCount && count !== undefined && (
        <span className="text-xs text-[#776B5E]">({count})</span>
      )}
    </div>
  );
}

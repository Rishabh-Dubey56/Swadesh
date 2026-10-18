"use client";

import React, { useState } from "react";
import { ProductReview } from "@/types";
import { RatingStars } from "@/components/ui/RatingStars";
import { CheckCircle2, MessageSquarePlus, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface ProductReviewsProps {
  reviews?: ProductReview[];
  productName: string;
}

export function ProductReviews({
  reviews = [],
  productName,
}: ProductReviewsProps) {
  const [reviewList, setReviewList] = useState<ProductReview[]>(reviews);
  const [showAddForm, setShowAddForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      rating,
      date: new Date().toISOString().split("T")[0],
      title: title.trim() || "Authentic Craftsmanship",
      comment: comment.trim(),
      verifiedBuyer: true,
    };

    setReviewList([newRev, ...reviewList]);
    setSubmitted(true);
    setAuthor("");
    setTitle("");
    setComment("");
    setTimeout(() => {
      setSubmitted(false);
      setShowAddForm(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DCCD]">
        <div>
          <h3 className="font-serif text-xl font-semibold text-[#6E171B]">
            Patron Reviews &amp; Testimonials
          </h3>
          <p className="text-xs text-[#776B5E] mt-0.5">
            Verified opinions from collectors of authentic Indian handlooms
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <MessageSquarePlus className="w-4 h-4 mr-1.5" />
          {showAddForm ? "Cancel Review" : "Write a Patron Review"}
        </Button>
      </div>

      {/* Add Review Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-5 space-y-4 animate-in fade-in duration-200"
        >
          <h4 className="font-serif text-base font-semibold text-[#6E171B]">
            Share Your Experience with {productName}
          </h4>

          {/* Star selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1.5">
              Your Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 cursor-pointer"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? "fill-[#C7A46A] text-[#C7A46A]"
                        : "text-[#E8DCCD]"
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-semibold text-[#282522] ml-2">
                {rating} out of 5 stars
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Priyadarshini Sen"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-[#FFF9F0] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
                Headline / Title
              </label>
              <input
                type="text"
                placeholder="e.g. Breathtaking weave and royal drape"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#FFF9F0] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
              Your Detailed Review *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe the fabric texture, zari luster, comfort, packaging, and authenticity..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-[#FFF9F0] border border-[#E8DCCD] rounded-xs p-3 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-[#776B5E]">
              *Demo review will be added directly to this product view.
            </span>
            <Button type="submit" size="sm" variant="primary">
              Submit Review
            </Button>
          </div>

          {submitted && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Dhanyavaad! Your review has been added successfully.</span>
            </div>
          )}
        </form>
      )}

      {/* Review List */}
      <div className="space-y-4">
        {reviewList.length === 0 ? (
          <p className="text-xs text-[#776B5E] italic">
            Be the first patron to share a review of this exquisite handloom.
          </p>
        ) : (
          reviewList.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-sm border border-[#E8DCCD] bg-[#FAF4EB]/60 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#282522]">
                    {rev.author}
                  </span>
                  {rev.verifiedBuyer && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Patron
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-[#776B5E]">{rev.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <RatingStars rating={rev.rating} size="sm" />
                <h5 className="text-xs font-semibold text-[#6E171B]">
                  {rev.title}
                </h5>
              </div>

              <p className="text-xs text-[#282522] leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

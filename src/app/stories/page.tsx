"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CULTURE_STORIES } from "@/data/stories";
import { BookOpen, Clock, ArrowRight, User } from "lucide-react";

export default function StoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Textiles",
    "Weaving Traditions",
    "Craft Heritage",
    "Artisan Spotlight",
  ];

  const filteredStories =
    selectedCategory === "All"
      ? CULTURE_STORIES
      : CULTURE_STORIES.filter((s) => s.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-[0.25em] text-[#C7A46A]">
          <BookOpen className="w-4 h-4" />
          <span>The Cultural Chronicle</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#6E171B]">
          Artisan Narratives &amp; Textile Lore
        </h1>
        <p className="text-xs sm:text-sm text-[#776B5E] leading-relaxed">
          Behind every thread lies sacred mythology, centuries of oral wisdom, and the tireless hands of generational masters. Read our curated dispatches from India&apos;s weaving heartlands.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-4 py-2 rounded-full font-medium transition-colors cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#6E171B] text-[#FFF9F0]"
                : "bg-[#FAF4EB] text-[#776B5E] border border-[#E8DCCD] hover:border-[#C7A46A]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className="group flex flex-col bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm overflow-hidden hover:shadow-xl transition-all"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5EBDD]">
              <Image
                src={story.coverImage}
                alt={story.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 bg-[#4F0E11]/90 backdrop-blur-xs text-[#E0C496] text-[10px] font-bold px-2 py-0.5 rounded-xs border border-[#C7A46A]/30">
                {story.category}
              </div>
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-[#776B5E]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C7A46A]" />
                    {story.readingTimeMinutes} min read
                  </span>
                  <span>•</span>
                  <span>{story.publishDate}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#6E171B] group-hover:text-[#8A2529] mt-2 leading-snug transition-colors">
                  <Link href={`/stories/${story.slug}`}>{story.title}</Link>
                </h3>

                <p className="text-xs text-[#776B5E] line-clamp-3 mt-2 leading-relaxed">
                  {story.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8DCCD]/60 flex items-center justify-between">
                <span className="text-[11px] text-[#282522] font-medium flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#C7A46A]" />
                  {story.author}
                </span>
                <Link
                  href={`/stories/${story.slug}`}
                  className="text-xs font-semibold text-[#6E171B] hover:text-[#8A2529] flex items-center gap-1 group/btn"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryBySlug } from "@/data/stories";
import { getProductById } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const relatedProducts = story.relatedProductIds
    ?.map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      {/* Back navigation */}
      <div>
        <Link
          href="/stories"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E171B] hover:text-[#8A2529] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cultural Chronicles</span>
        </Link>
      </div>

      {/* Header & Meta */}
      <div className="space-y-4">
        <div className="inline-block bg-[#F5EBDD] text-[#9C7942] border border-[#C7A46A]/30 px-3 py-1 rounded-xs text-xs font-bold uppercase tracking-wider">
          {story.category}
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#6E171B] leading-tight">
          {story.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-[#776B5E] pt-2 border-y border-[#E8DCCD] py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#6E171B] text-[#FFF9F0] flex items-center justify-center font-bold text-[10px]">
              {story.author.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-[#282522]">{story.author}</p>
              <p className="text-[10px] text-[#776B5E]">{story.authorRole}</p>
            </div>
          </div>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#C7A46A]" />
            {story.readingTimeMinutes} Minutes Deep Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Published on {story.publishDate}</span>
        </div>
      </div>

      {/* Hero Cover Image */}
      <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden border border-[#E8DCCD] shadow-md bg-[#F5EBDD]">
        <Image
          src={story.coverImage}
          alt={story.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover"
        />
      </div>

      {/* Narrative Lead Summary Callout */}
      <div className="bg-[#FAF4EB] border-l-4 border-[#C7A46A] p-5 rounded-r-sm italic font-serif text-base text-[#282522] leading-relaxed">
        &ldquo;{story.summary}&rdquo;
      </div>

      {/* Story Content Paragraphs */}
      <div className="prose prose-stone max-w-none text-sm sm:text-base text-[#282522] leading-relaxed space-y-6">
        {story.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Related Products from Story */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-[#E8DCCD] space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A46A]">
              From Loom To Patron
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#6E171B] mt-1">
              Featured Weaves from this Chronicle
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-[#E8DCCD] flex justify-between items-center text-xs">
        <Link
          href="/stories"
          className="text-[#6E171B] font-semibold hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Chronicles</span>
        </Link>
        <Link
          href="/products"
          className="bg-[#6E171B] text-[#FFF9F0] px-4 py-2 rounded-xs font-semibold hover:bg-[#8A2529] flex items-center gap-1"
        >
          <span>Explore Authentic Collections</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}

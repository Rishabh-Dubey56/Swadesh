import { ProductCategory } from "@/types";

export const CATEGORIES: ProductCategory[] = [
  {
    id: "handloom-sarees",
    name: "Handloom Sarees",
    slug: "handloom-sarees",
    description: "Centuries of weaving artistry—Banarasi, Kanjeevaram, Paithani, Sambalpuri, and Chanderi.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    itemCount: 42,
    featured: true,
  },
  {
    id: "kurtas-sets",
    name: "Kurtas & Tunics",
    slug: "kurtas-sets",
    description: "Royal Chikankari, hand-blocked Ajrakh, Bagru prints, and handspun Khadi tunics.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    itemCount: 36,
    featured: true,
  },
  {
    id: "lehengas-anarkalis",
    name: "Lehengas & Anarkalis",
    slug: "lehengas-anarkalis",
    description: "Celebratory silhouettes adorned with Gota Patti, Zardozi, Bandhani, and mirror embroidery.",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80",
    itemCount: 28,
    featured: true,
  },
  {
    id: "shawls-dupattas",
    name: "Shawls & Dupattas",
    slug: "shawls-dupattas",
    description: "Pure Kashmiri Pashmina, Punjab Phulkari baghs, and Kantha embroidered stoles.",
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80",
    itemCount: 24,
    featured: true,
  },
  {
    id: "heritage-jewellery",
    name: "Heritage Jewellery",
    slug: "heritage-jewellery",
    description: "Antique temple gold, tribal Dhokra brass, Kundan meenakari, and silver filigree.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    itemCount: 31,
    featured: true,
  },
  {
    id: "handcrafted-footwear",
    name: "Handcrafted Mojaris",
    slug: "handcrafted-footwear",
    description: "Authentic Kolhapuri leather chappals and Rajasthani thread-embroidered juttis.",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    itemCount: 19,
    featured: false,
  },
  {
    id: "cultural-home",
    name: "Cultural Accents",
    slug: "cultural-home",
    description: "Brass diyas, Madhubani wall tapestries, blue pottery, and handwoven throws.",
    image: "https://images.unsplash.com/photo-1578925518470-4def7a0f08bb?auto=format&fit=crop&w=800&q=80",
    itemCount: 22,
    featured: false,
  },
];

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return CATEGORIES.find((c) => c.slug === slug || c.id === slug);
}

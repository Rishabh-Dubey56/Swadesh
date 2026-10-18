import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const cormorant = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SWADESH — Discover India. Wear Culture.",
  description:
    "SWADESH is India's premier cultural fashion and artisan marketplace celebrating 28 States, 28 Cultures, and Infinite Stories. Explore authentic regional weaves, handcrafted jewellery, and indigenous craftsmanship.",
  keywords: [
    "Indian Fashion",
    "Handloom Sarees",
    "Banarasi Silk",
    "Kanjeevaram",
    "Kashmiri Pashmina",
    "Phulkari",
    "Chikankari",
    "Indian Handicrafts",
    "Artisan Marketplace",
    "Swadesh",
  ],
  authors: [{ name: "SWADESH Cultural Marketplace" }],
  openGraph: {
    title: "SWADESH — Discover India. Wear Culture.",
    description:
      "28 States. 28 Cultures. Infinite Stories. Handcrafted luxury from India's master artisans.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FFF9F0] text-[#282522] antialiased selection:bg-[#C7A46A] selection:text-white">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}

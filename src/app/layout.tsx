import type { Metadata } from "next";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
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

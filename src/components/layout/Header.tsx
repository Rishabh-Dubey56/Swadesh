"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  Compass,
  ArrowRight,
  LogOut,
  Store,
  ShieldAlert,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";
import { PRODUCTS } from "@/data/products";
import { formatINR } from "@/lib/utils";

export function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cartItemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistItems = useWishlistStore((s) => s.items);
  const { user, isAuthenticated, logout } = useAuthStore();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered search results
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.craftType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.stateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F0]/95 backdrop-blur-md border-b border-[#E8DCCD] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#282522] hover:text-[#6E171B] transition-colors rounded-sm"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo & Tagline */}
          <div className="flex flex-col items-center sm:items-start shrink-0">
            <Link href="/" className="group flex flex-col items-center sm:items-start">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#6E171B] uppercase group-hover:text-[#8A2529] transition-colors">
                SWADESH
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#C7A46A] font-medium hidden sm:block">
                Discover India. Wear Culture.
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#282522]">
            <Link
              href="/products"
              className="hover:text-[#6E171B] transition-colors py-1 relative group"
            >
              Shop All
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C7A46A] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/states"
              className="hover:text-[#6E171B] transition-colors py-1 flex items-center gap-1.5 relative group"
            >
              <Compass className="w-3.5 h-3.5 text-[#C7A46A]" />
              28 States &amp; Crafts
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C7A46A] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/products?category=handloom-sarees"
              className="hover:text-[#6E171B] transition-colors py-1 relative group"
            >
              Handlooms
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C7A46A] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/products?category=kurtas-sets"
              className="hover:text-[#6E171B] transition-colors py-1 relative group"
            >
              Royal Kurtas
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C7A46A] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/stories"
              className="hover:text-[#6E171B] transition-colors py-1 relative group"
            >
              Artisan Stories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C7A46A] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/about"
              className="hover:text-[#6E171B] transition-colors py-1 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C7A46A] transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Right Action Icons (Search, Wishlist, Account, Cart) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Toggle */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-[#282522] hover:text-[#6E171B] hover:bg-[#F5EBDD] rounded-full transition-colors cursor-pointer"
                aria-label="Search traditional crafts"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Search Dropdown / Bar */}
              {searchOpen && (
                <div className="absolute right-0 top-12 w-80 sm:w-96 bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search sarees, pashmina, states, crafts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm py-2 pl-3 pr-9 text-xs sm:text-sm focus:outline-none focus:border-[#C7A46A]"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 text-[#6E171B] hover:text-[#8A2529] p-1 cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Search Autocomplete Suggestions */}
                  {searchResults.length > 0 && (
                    <div className="mt-2 divide-y divide-[#E8DCCD]/60 border-t border-[#E8DCCD]/60 pt-2">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-[#776B5E] mb-1.5">
                        Suggested Crafts &amp; Products
                      </p>
                      {searchResults.map((p) => (
                        <Link
                          key={p.id}
                          href={`/products/${p.slug}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-2.5 py-1.5 hover:bg-[#F5EBDD] px-1.5 rounded-xs transition-colors"
                        >
                          <div className="relative w-9 h-9 rounded-xs overflow-hidden shrink-0 border border-[#E8DCCD]">
                            <Image
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              sizes="36px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-[#282522] truncate">
                              {p.name}
                            </p>
                            <p className="text-[10px] text-[#776B5E]">
                              {p.craftType} • {p.stateName}
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-[#6E171B] shrink-0">
                            {formatINR(p.price)}
                          </span>
                        </Link>
                      ))}
                      <Link
                        href={`/products?search=${encodeURIComponent(searchQuery)}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="block text-center text-xs font-medium text-[#6E171B] hover:underline pt-2"
                      >
                        View all results for &ldquo;{searchQuery}&rdquo; →
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Link with counter */}
            <Link
              href="/wishlist"
              className="relative p-2 text-[#282522] hover:text-[#6E171B] hover:bg-[#F5EBDD] rounded-full transition-colors"
              aria-label="View Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#C45538] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* User Account Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-2 text-[#282522] hover:text-[#6E171B] hover:bg-[#F5EBDD] rounded-full transition-colors cursor-pointer flex items-center gap-1"
                aria-label="User Account"
              >
                {user?.avatar ? (
                  <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#C7A46A]">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <UserIcon className="w-5 h-5" />
                )}
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-12 w-64 bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm shadow-xl p-2 z-50 text-left">
                  {isAuthenticated && user ? (
                    <div>
                      <div className="px-3 py-2 border-b border-[#E8DCCD] mb-1">
                        <p className="text-xs font-semibold text-[#282522]">{user.name}</p>
                        <p className="text-[11px] text-[#776B5E] truncate">{user.email}</p>
                        <span className="inline-block mt-1 uppercase text-[10px] font-bold px-1.5 py-0.2 bg-[#F5EBDD] text-[#6E171B] rounded-xs border border-[#C7A46A]/30">
                          Role: {user.role}
                        </span>
                      </div>

                      <Link
                        href="/account"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#282522] hover:bg-[#F5EBDD] rounded-xs transition-colors"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-[#C7A46A]" />
                        My Account &amp; Orders
                      </Link>

                      <Link
                        href="/seller"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#282522] hover:bg-[#F5EBDD] rounded-xs transition-colors"
                      >
                        <Store className="w-3.5 h-3.5 text-[#C45538]" />
                        Seller Dashboard
                      </Link>

                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#282522] hover:bg-[#F5EBDD] rounded-xs transition-colors"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-[#6E171B]" />
                        Admin Portal
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-700 hover:bg-red-50 rounded-xs transition-colors border-t border-[#E8DCCD] mt-1 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out (Demo)
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="p-3 text-center border-b border-[#E8DCCD]">
                        <p className="text-xs font-semibold text-[#282522]">Welcome to SWADESH</p>
                        <p className="text-[11px] text-[#776B5E] mt-0.5">
                          Discover authentic Indian weaves &amp; crafts
                        </p>
                      </div>
                      <Link
                        href="/auth/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block w-full text-center bg-[#6E171B] text-[#FFF9F0] text-xs font-semibold py-2 rounded-xs mt-2 hover:bg-[#8A2529]"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/auth/register"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block w-full text-center border border-[#C7A46A] text-[#6E171B] text-xs font-medium py-1.5 rounded-xs mt-1.5 hover:bg-[#FAF4EB]"
                      >
                        Create Account
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex items-center gap-1.5 bg-[#6E171B] hover:bg-[#8A2529] text-[#FFF9F0] px-3 sm:px-4 py-2 rounded-sm text-xs font-medium transition-colors shadow-sm cursor-pointer"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#E0C496]" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-[#4F0E11] text-[#E0C496] px-1.5 py-0.2 rounded-full text-[11px] font-bold">
                {cartItemCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DCCD] bg-[#FFF9F0] px-4 py-5 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 font-medium text-sm text-[#282522]">
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8DCCD]/60 flex items-center justify-between hover:text-[#6E171B]"
            >
              <span>Explore All Handcrafted Items</span>
              <ArrowRight className="w-4 h-4 text-[#C7A46A]" />
            </Link>
            <Link
              href="/states"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8DCCD]/60 flex items-center justify-between hover:text-[#6E171B]"
            >
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C7A46A]" />
                28 States &amp; Regional Crafts
              </span>
              <ArrowRight className="w-4 h-4 text-[#C7A46A]" />
            </Link>
            <Link
              href="/products?category=handloom-sarees"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8DCCD]/60 flex items-center justify-between hover:text-[#6E171B]"
            >
              <span>Handloom Sarees (Banarasi, Kanjeevaram, etc.)</span>
              <ArrowRight className="w-4 h-4 text-[#C7A46A]" />
            </Link>
            <Link
              href="/products?category=kurtas-sets"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8DCCD]/60 flex items-center justify-between hover:text-[#6E171B]"
            >
              <span>Royal Kurtas &amp; Tunics</span>
              <ArrowRight className="w-4 h-4 text-[#C7A46A]" />
            </Link>
            <Link
              href="/stories"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8DCCD]/60 flex items-center justify-between hover:text-[#6E171B]"
            >
              <span>Artisan Stories &amp; Weaving Chronicles</span>
              <ArrowRight className="w-4 h-4 text-[#C7A46A]" />
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8DCCD]/60 flex items-center justify-between hover:text-[#6E171B]"
            >
              <span>About SWADESH Mission</span>
              <ArrowRight className="w-4 h-4 text-[#C7A46A]" />
            </Link>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-semibold text-[#6E171B]"
              >
                <UserIcon className="w-4 h-4" />
                Customer Account &amp; Order History
              </Link>
              <Link
                href="/seller"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-semibold text-[#C45538]"
              >
                <Store className="w-4 h-4" />
                Artisan Seller Dashboard
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-semibold text-[#776B5E]"
              >
                <ShieldAlert className="w-4 h-4" />
                Admin Portal
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

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
  ChevronDown,
  ArrowRight,
  LogOut,
  Store,
  ShieldAlert,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";
import { PRODUCTS } from "@/data/products";
import { INDIAN_STATES } from "@/data/states";
import { formatINR } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "States", href: "/states", hasDropdown: true },
  { label: "Men", href: "/products?gender=Men" },
  { label: "Women", href: "/products?gender=Women" },
  { label: "Accessories", href: "/products?category=heritage-jewellery" },
  { label: "Artisans", href: "/stories" },
  { label: "Stories", href: "/stories" },
  { label: "About Us", href: "/about" },
];

export function Header() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [statesDropdownOpen, setStatesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const statesDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const cartItemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistItems = useWishlistStore((s) => s.items);
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (statesDropdownRef.current && !statesDropdownRef.current.contains(e.target as Node)) {
        setStatesDropdownOpen(false);
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

  // Filter states for search
  const stateResults = searchQuery.trim()
    ? INDIAN_STATES.filter(
        (s) => s.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F0] border-b border-[#E8DCCD] shadow-sm">
      {/* Top Row: Logo, Search, Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px] gap-3">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#282522] hover:text-[#6E171B] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Brand Logo & Tagline */}
          <div className="shrink-0">
            <Link href="/" className="group flex items-center gap-2.5">
              {/* Mandala Emblem Icon matching reference */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 text-[#C7A46A] shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" stroke="currentColor">
                  {/* Central flower / sun mandala */}
                  <circle cx="20" cy="20" r="4" fill="#C7A46A" />
                  <circle cx="20" cy="20" r="8" strokeWidth="1" strokeDasharray="1 1.5" />
                  <circle cx="20" cy="20" r="14" strokeWidth="1" />
                  {/* 8 petals */}
                  <path d="M20 4 C22 10 22 10 20 16 C18 10 18 10 20 4 Z" fill="#C7A46A" opacity="0.8" />
                  <path d="M20 36 C22 30 22 30 20 24 C18 30 18 30 20 36 Z" fill="#C7A46A" opacity="0.8" />
                  <path d="M4 20 C10 22 10 22 16 20 C10 18 10 18 4 20 Z" fill="#C7A46A" opacity="0.8" />
                  <path d="M36 20 C30 22 30 22 24 20 C30 18 30 18 36 20 Z" fill="#C7A46A" opacity="0.8" />
                  <path d="M8.7 8.7 C14 13 14 13 17.2 17.2 C13 14 13 14 8.7 8.7 Z" fill="#C7A46A" opacity="0.6" />
                  <path d="M31.3 31.3 C26 27 26 27 22.8 22.8 C27 26 27 26 31.3 31.3 Z" fill="#C7A46A" opacity="0.6" />
                  <path d="M8.7 31.3 C14 27 14 27 17.2 22.8 C13 26 13 26 8.7 31.3 Z" fill="#C7A46A" opacity="0.6" />
                  <path d="M31.3 8.7 C26 13 26 13 22.8 17.2 C27 14 27 14 31.3 8.7 Z" fill="#C7A46A" opacity="0.6" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.06em] text-[#6E171B] capitalize leading-none group-hover:text-[#8A2529] transition-colors">
                  Sawdesh
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.18em] uppercase text-[#776B5E] font-medium leading-none mt-1 hidden sm:block">
                  Discover India. Wear Culture.
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar — Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6 relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for states, dresses, products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="w-full bg-[#FAF4EB] border border-[#E8DCCD] py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-[#C7A46A] focus:ring-1 focus:ring-[#C7A46A]/30 transition-colors text-[#282522] placeholder:text-[#776B5E]/60"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 w-10 bg-[#6E171B] text-white flex items-center justify-center hover:bg-[#8A2529] transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Search Dropdown Results */}
            {searchFocused && (searchResults.length > 0 || stateResults.length > 0) && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-[#FFF9F0] border border-[#E8DCCD] shadow-xl z-50 max-h-80 overflow-auto">
                {stateResults.length > 0 && (
                  <div className="p-2 border-b border-[#E8DCCD]">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-[#776B5E] px-2 mb-1">States</p>
                    {stateResults.map((s) => (
                      <Link
                        key={s.id}
                        href={`/states/${s.slug}`}
                        className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#F5EBDD] text-xs text-[#282522]"
                      >
                        <span className="w-6 h-6 bg-[#6E171B] rounded-full text-[#C7A46A] flex items-center justify-center text-[9px] font-bold shrink-0">
                          {s.name.charAt(0)}
                        </span>
                        <span className="font-medium">{s.name}</span>
                        <span className="text-[#776B5E] ml-auto text-[10px]">{s.region}</span>
                      </Link>
                    ))}
                  </div>
                )}
                {searchResults.length > 0 && (
                  <div className="p-2">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-[#776B5E] px-2 mb-1">Products</p>
                    {searchResults.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.slug}`}
                        className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-[#F5EBDD] transition-colors"
                      >
                        <div className="relative w-8 h-8 rounded overflow-hidden shrink-0 border border-[#E8DCCD]">
                          <Image src={p.images[0]} alt={p.name} fill sizes="32px" className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-[#282522] truncate">{p.name}</p>
                          <p className="text-[10px] text-[#776B5E]">{p.stateName}</p>
                        </div>
                        <span className="text-xs font-semibold text-[#6E171B] shrink-0">{formatINR(p.price)}</span>
                      </Link>
                    ))}
                    <Link
                      href={`/products?search=${encodeURIComponent(searchQuery)}`}
                      className="block text-center text-xs font-medium text-[#6E171B] hover:underline pt-2 mt-1 border-t border-[#E8DCCD]"
                    >
                      View all results →
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Mobile Search */}
            <button
              type="button"
              onClick={() => searchInputRef.current?.focus()}
              className="md:hidden p-2 text-[#282522] hover:text-[#6E171B] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Login / Account */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex flex-col items-center gap-0.5 px-2 py-1 text-[#282522] hover:text-[#6E171B] transition-colors cursor-pointer"
                aria-label="User Account"
              >
                <UserIcon className="w-5 h-5" />
                <span className="text-[9px] font-medium hidden sm:block">Login</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-[#FFF9F0] border border-[#E8DCCD] shadow-xl z-50 text-left">
                  {mounted && isAuthenticated && user ? (
                    <div>
                      <div className="px-4 py-3 border-b border-[#E8DCCD]">
                        <p className="text-xs font-semibold text-[#282522]">{user.name}</p>
                        <p className="text-[11px] text-[#776B5E] truncate">{user.email}</p>
                        <span className="inline-block mt-1 uppercase text-[10px] font-bold px-1.5 py-0.5 bg-[#F5EBDD] text-[#6E171B] border border-[#C7A46A]/30">
                          Role: {user.role}
                        </span>
                      </div>
                      <Link href="/account" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#282522] hover:bg-[#F5EBDD] transition-colors">
                        <UserIcon className="w-3.5 h-3.5 text-[#C7A46A]" />My Account & Orders
                      </Link>
                      <Link href="/seller" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#282522] hover:bg-[#F5EBDD] transition-colors">
                        <Store className="w-3.5 h-3.5 text-[#C45538]" />Seller Dashboard
                      </Link>
                      <Link href="/admin" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#282522] hover:bg-[#F5EBDD] transition-colors">
                        <ShieldAlert className="w-3.5 h-3.5 text-[#6E171B]" />Admin Portal
                      </Link>
                      <button type="button" onClick={() => { logout(); setUserDropdownOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-700 hover:bg-red-50 transition-colors border-t border-[#E8DCCD] cursor-pointer">
                        <LogOut className="w-3.5 h-3.5" />Sign Out (Demo)
                      </button>
                    </div>
                  ) : (
                    <div className="p-4">
                      <p className="text-xs font-semibold text-[#282522] text-center">Welcome to SWADESH</p>
                      <p className="text-[11px] text-[#776B5E] mt-0.5 text-center">Discover authentic Indian weaves</p>
                      <Link href="/auth/login" onClick={() => setUserDropdownOpen(false)} className="block w-full text-center bg-[#6E171B] text-[#FFF9F0] text-xs font-semibold py-2 mt-3 hover:bg-[#8A2529]">
                        Sign In
                      </Link>
                      <Link href="/auth/register" onClick={() => setUserDropdownOpen(false)} className="block w-full text-center border border-[#C7A46A] text-[#6E171B] text-xs font-medium py-1.5 mt-1.5 hover:bg-[#FAF4EB]">
                        Create Account
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-[#282522] hover:text-[#6E171B] transition-colors relative"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              <span className="text-[9px] font-medium hidden sm:block">Wishlist</span>
              {mounted && wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 right-0 w-4 h-4 rounded-full bg-[#C45538] text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              type="button"
              onClick={openCart}
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-[#282522] hover:text-[#6E171B] transition-colors relative cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-[9px] font-medium hidden sm:block">Cart</span>
              {mounted && cartItemCount > 0 && (
                <span className="absolute -top-0.5 right-0 w-4 h-4 rounded-full bg-[#6E171B] text-[#C7A46A] text-[9px] font-bold flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Second Row: Navigation Links */}
      <div className="hidden lg:block border-t border-[#E8DCCD]/60 bg-[#FFF9F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative" ref={link.hasDropdown ? statesDropdownRef : undefined}>
                {link.hasDropdown ? (
                  <button
                    type="button"
                    onClick={() => setStatesDropdownOpen(!statesDropdownOpen)}
                    className="flex items-center gap-1 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#282522] hover:text-[#6E171B] hover:bg-[#FAF4EB] transition-colors cursor-pointer"
                  >
                    {link.label}
                    <ChevronDown className={`w-3 h-3 transition-transform ${statesDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="block px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#282522] hover:text-[#6E171B] hover:bg-[#FAF4EB] transition-colors"
                  >
                    {link.label}
                  </Link>
                )}

                {/* States Mega Dropdown */}
                {link.hasDropdown && statesDropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-[640px] bg-[#FFF9F0] border border-[#E8DCCD] shadow-xl z-50 p-5">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E8DCCD]">
                      <h3 className="font-serif text-base font-bold text-[#6E171B]">Explore 28 Indian States</h3>
                      <Link
                        href="/states"
                        onClick={() => setStatesDropdownOpen(false)}
                        className="text-xs font-semibold text-[#C7A46A] hover:text-[#9C7942] flex items-center gap-1"
                      >
                        View All <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {INDIAN_STATES.slice(0, 16).map((state) => (
                        <Link
                          key={state.id}
                          href={`/states/${state.slug}`}
                          onClick={() => setStatesDropdownOpen(false)}
                          className="px-2.5 py-1.5 text-xs text-[#282522] hover:bg-[#F5EBDD] hover:text-[#6E171B] transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C7A46A] shrink-0" />
                          {state.name}
                        </Link>
                      ))}
                    </div>
                    {INDIAN_STATES.length > 16 && (
                      <div className="mt-3 pt-2 border-t border-[#E8DCCD] text-center">
                        <Link
                          href="/states"
                          onClick={() => setStatesDropdownOpen(false)}
                          className="text-xs font-semibold text-[#6E171B] hover:underline"
                        >
                          + {INDIAN_STATES.length - 16} more states →
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DCCD] bg-[#FFF9F0] px-4 py-5 shadow-lg">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              placeholder="Search for states, dresses, products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF4EB] border border-[#E8DCCD] py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-[#C7A46A]"
            />
            <button type="submit" className="absolute right-0 top-0 bottom-0 w-10 bg-[#6E171B] text-white flex items-center justify-center cursor-pointer">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <nav className="flex flex-col space-y-1 font-medium text-sm text-[#282522]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-2 border-b border-[#E8DCCD]/40 flex items-center justify-between hover:text-[#6E171B] hover:bg-[#FAF4EB] transition-colors text-xs uppercase tracking-wider font-semibold"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C7A46A]" />
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-xs font-semibold text-[#6E171B] px-2">
                <UserIcon className="w-4 h-4" />My Account
              </Link>
              <Link href="/seller" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-xs font-semibold text-[#C45538] px-2">
                <Store className="w-4 h-4" />Seller Dashboard
              </Link>
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-xs font-semibold text-[#776B5E] px-2">
                <ShieldAlert className="w-4 h-4" />Admin Portal
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

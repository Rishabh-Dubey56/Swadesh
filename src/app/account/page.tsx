"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { MOCK_ORDERS } from "@/data/mockOrders";
import { OrderTable } from "@/components/dashboard/OrderTable";
import { Tabs } from "@/components/ui/Tabs";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  Package,
  MapPin,
  Heart,
  Settings,
  Plus,
  Trash2,
  CheckCircle2,
  LogOut,
} from "lucide-react";

export default function AccountPage() {
  const { user, addresses, addAddress, removeAddress, setDefaultAddress, logout, updateProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState("orders");
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  // Address form states
  const [name, setName] = useState(user?.name || "Ananya Sharma");
  const [phone, setPhone] = useState(user?.phone || "+91 98765 43210");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Karnataka");
  const [pincode, setPincode] = useState("");
  const [addressType, setAddressType] = useState<"Home" | "Work">("Home");

  // Profile edit states
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profilePhone, setProfilePhone] = useState(user?.phone || "");
  const [profileSavedMsg, setProfileSavedMsg] = useState("");

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!street || !city || !pincode) return;

    addAddress({
      fullName: name,
      phone,
      street,
      city,
      state,
      pincode,
      addressType,
      isDefault: addresses.length === 0,
    });

    setShowAddAddressModal(false);
    setStreet("");
    setCity("");
    setPincode("");
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: profileName, phone: profilePhone });
    setProfileSavedMsg("Profile updated successfully in demo storage!");
    setTimeout(() => setProfileSavedMsg(""), 3500);
  };

  const tabs = [
    { id: "orders", label: "My Orders & Tracking", icon: <Package className="w-4 h-4" /> },
    { id: "addresses", label: "Saved Addresses", icon: <MapPin className="w-4 h-4" /> },
    { id: "settings", label: "Profile & Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Profile Header */}
      <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#C7A46A] bg-[#FFF9F0] shadow-sm">
            <Image
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
              alt={user?.name || "Customer"}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#6E171B]">
                {user?.name || "Valued Patron"}
              </h1>
              <span className="uppercase text-[10px] font-bold px-2 py-0.5 bg-[#6E171B] text-[#FFF9F0] rounded-xs">
                {user?.role || "Patron"}
              </span>
            </div>
            <p className="text-xs text-[#776B5E] mt-0.5">{user?.email}</p>
            <p className="text-xs text-[#9C7942] font-medium mt-1">
              Member of SWADESH Cultural Connoisseurs Guild
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <Link href="/wishlist">
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4 mr-1 text-[#6E171B]" />
              <span>Wishlist</span>
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={logout} className="text-red-700 hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-1" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab 1: Orders */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-semibold text-[#6E171B]">
              Artisan Orders &amp; Fulfillment History
            </h3>
            <span className="text-xs text-[#776B5E]">
              {MOCK_ORDERS.length} Orders Recorded
            </span>
          </div>
          <OrderTable orders={MOCK_ORDERS} />
        </div>
      )}

      {/* Tab 2: Saved Addresses */}
      {activeTab === "addresses" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#6E171B]">
                Delivery Addresses
              </h3>
              <p className="text-xs text-[#776B5E]">
                Manage verified doorstep delivery locations across India
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowAddAddressModal(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              <span>Add New Address</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm p-5 space-y-3 relative hover:border-[#C7A46A] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#6E171B]">
                      {addr.fullName}
                    </span>
                    <span className="text-[10px] uppercase font-bold bg-[#FAF4EB] text-[#776B5E] px-1.5 py-0.2 rounded-xs border border-[#E8DCCD]">
                      {addr.addressType}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-xs">
                        Default
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAddress(addr.id)}
                    className="text-[#776B5E] hover:text-red-700 p-1 cursor-pointer"
                    title="Delete address"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-xs text-[#282522] leading-relaxed">
                  <p>{addr.street}</p>
                  {addr.landmark && <p className="text-[#776B5E]">Landmark: {addr.landmark}</p>}
                  <p>
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-[#776B5E] mt-1">Phone: {addr.phone}</p>
                </div>

                {!addr.isDefault && (
                  <button
                    type="button"
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-xs text-[#6E171B] font-semibold underline hover:text-[#8A2529] cursor-pointer pt-1"
                  >
                    Set as Default Delivery Address
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Profile Settings */}
      {activeTab === "settings" && (
        <div className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm p-6 max-w-xl space-y-5">
          <h3 className="font-serif text-xl font-semibold text-[#6E171B] pb-2 border-b border-[#E8DCCD]">
            Profile &amp; Cultural Preferences
          </h3>

          {profileSavedMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{profileSavedMsg}</span>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
                Full Patron Name
              </label>
              <input
                type="text"
                required
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ""}
                className="w-full bg-[#F5EBDD] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs text-[#776B5E] cursor-not-allowed"
              />
              <span className="text-[10px] text-[#776B5E]">Demo account email cannot be altered.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={profilePhone}
                onChange={(e) => setProfilePhone(e.target.value)}
                className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="sm">
                Save Profile Changes
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Add Address Modal */}
      <Modal
        isOpen={showAddAddressModal}
        onClose={() => setShowAddAddressModal(false)}
        title="Add New Delivery Address"
        description="Enter authentic Indian postal address"
        maxWidth="md"
      >
        <form onSubmit={handleCreateAddress} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-xs font-semibold text-[#776B5E] mb-1">
              Recipient Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#776B5E] mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#776B5E] mb-1">
              Street / Flat / Colony *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 102 Green Acres, Lavelle Road"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-[#776B5E] mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#776B5E] mb-1">
                State *
              </label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#776B5E] mb-1">
                Pincode *
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#776B5E] mb-1">
              Address Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  checked={addressType === "Home"}
                  onChange={() => setAddressType("Home")}
                  className="accent-[#6E171B]"
                />
                <span>Home</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  checked={addressType === "Work"}
                  onChange={() => setAddressType("Work")}
                  className="accent-[#6E171B]"
                />
                <span>Work</span>
              </label>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setShowAddAddressModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Address
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

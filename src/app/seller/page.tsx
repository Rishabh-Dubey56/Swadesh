"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { MOCK_ORDERS } from "@/data/mockOrders";
import { MOCK_SELLERS } from "@/data/mockSellers";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { OrderTable } from "@/components/dashboard/OrderTable";
import { ProductManageTable } from "@/components/dashboard/ProductManageTable";
import { Tabs } from "@/components/ui/Tabs";
import {
  DollarSign,
  Package,
  Layers,
  Award,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export default function SellerDashboardPage() {
  const seller = MOCK_SELLERS[0]; // Varanasi Bunkar Weavers Co-operative
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Artisan Guild Overview", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "inventory", label: "Loom Products & Stock", icon: <Layers className="w-4 h-4" /> },
    { id: "orders", label: "Orders & Dispatch", icon: <Package className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Guild Banner Header */}
      <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#C7A46A] bg-[#FFF9F0] shadow-sm shrink-0">
            <Image
              src={seller.logoImage}
              alt={seller.storeName}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#6E171B]">
                {seller.storeName}
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                GI Tag Verified Guild
              </span>
            </div>
            <p className="text-xs text-[#776B5E] mt-1">
              Master Artisan: <strong className="text-[#282522]">{seller.artisanLeader}</strong> • {seller.city}, {seller.stateName}
            </p>
            <p className="text-xs text-[#9C7942] font-medium mt-0.5">
              Speciality: {seller.craftSpeciality} (180 Pit-Loom Families)
            </p>
          </div>
        </div>

        {/* Demo status badge */}
        <div className="bg-[#FFF9F0] border border-[#C7A46A]/50 p-3 rounded-xs text-xs text-[#776B5E] max-w-xs">
          <span className="font-semibold text-[#6E171B] block mb-0.5">
            Seller Portal (Demo Mode)
          </span>
          Simulating real-time loom inventory, direct settlement payouts, and artisan dispatch operations.
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Gross Revenue"
          value={formatINR(2485000)}
          change="+18.4%"
          isPositive={true}
          icon={<DollarSign className="w-5 h-5 text-[#6E171B]" />}
          subtitle="Direct to artisan bank"
        />
        <StatCard
          title="Total Handcrafted Orders"
          value="1,240"
          change="+12.2%"
          isPositive={true}
          icon={<Package className="w-5 h-5 text-[#C7A46A]" />}
          subtitle="All 28 States Delivered"
        />
        <StatCard
          title="Active Loom Listings"
          value={PRODUCTS.length}
          change="3 Pending Verification"
          isPositive={true}
          icon={<Layers className="w-5 h-5 text-[#9C7942]" />}
          subtitle="Kadhwa Brocades"
        />
        <StatCard
          title="Patron Quality Rating"
          value="4.9 / 5.0"
          change="100% Handloom Verified"
          isPositive={true}
          icon={<Award className="w-5 h-5 text-emerald-700" />}
          subtitle="Silk Mark Audited"
        />
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <SalesChart />

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DCCD]">
              <h3 className="font-serif text-lg font-semibold text-[#6E171B]">
                Recent Artisan Dispatches &amp; Loom Orders
              </h3>
              <span className="text-xs text-[#776B5E]">Simulated fulfillment status</span>
            </div>
            <OrderTable orders={MOCK_ORDERS} />
          </div>
        </div>
      )}

      {/* Tab 2: Inventory */}
      {activeTab === "inventory" && (
        <ProductManageTable products={PRODUCTS} isSellerView={true} />
      )}

      {/* Tab 3: Orders */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8DCCD]">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#6E171B]">
                Artisan Orders &amp; Doorstep Tracking
              </h3>
              <p className="text-xs text-[#776B5E]">
                Update dispatch statuses from &ldquo;Packed&rdquo; to &ldquo;Shipped&rdquo;
              </p>
            </div>
          </div>
          <OrderTable orders={MOCK_ORDERS} />
        </div>
      )}
    </div>
  );
}

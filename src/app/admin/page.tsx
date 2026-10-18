"use client";

import React, { useState } from "react";
import { PRODUCTS } from "@/data/products";
import { MOCK_ORDERS } from "@/data/mockOrders";
import { MOCK_SELLERS } from "@/data/mockSellers";
import { INDIAN_STATES } from "@/data/states";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { OrderTable } from "@/components/dashboard/OrderTable";
import { ProductManageTable } from "@/components/dashboard/ProductManageTable";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import {
  Users,
  Store,
  DollarSign,
  Package,
  Layers,
  Award,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "National GMV & Metrics", icon: <DollarSign className="w-4 h-4" /> },
    { id: "products", label: "Catalog Moderation", icon: <Layers className="w-4 h-4" /> },
    { id: "sellers", label: "Artisan Guilds Verification", icon: <Store className="w-4 h-4" /> },
    { id: "orders", label: "Platform Orders", icon: <Package className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#6E171B]">
              SWADESH Platform Governance
            </span>
            <span className="bg-[#6E171B] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase">
              Admin Portal
            </span>
          </div>
          <p className="text-xs text-[#776B5E] mt-1">
            Supervising 28 States, 500+ Weaver Cooperatives, and National GI Certification Compliance
          </p>
        </div>

        <div className="text-xs text-[#776B5E] bg-[#FFF9F0] border border-[#C7A46A]/40 px-3 py-2 rounded-xs">
          <strong className="text-[#6E171B]">Demo Administrator:</strong> Vikramaditya Roy
        </div>
      </div>

      {/* Top 4 Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Gross Merchandise Value"
          value={formatINR(14250000)}
          change="+24.8% YoY"
          isPositive={true}
          icon={<DollarSign className="w-5 h-5 text-[#6E171B]" />}
          subtitle="All 28 States GMV"
        />
        <StatCard
          title="Verified Weaver Guilds"
          value="48"
          change="+6 this quarter"
          isPositive={true}
          icon={<Store className="w-5 h-5 text-[#C7A46A]" />}
          subtitle="100% Silk Mark Audited"
        />
        <StatCard
          title="GI Tagged Products"
          value="340"
          change="98.5% Authentic Ratio"
          isPositive={true}
          icon={<Award className="w-5 h-5 text-emerald-700" />}
          subtitle="Lab Micron Tested"
        />
        <StatCard
          title="Active Cultural Patrons"
          value="18,450"
          change="+3,200 this month"
          isPositive={true}
          icon={<Users className="w-5 h-5 text-[#9C7942]" />}
          subtitle="Across 42 Countries"
        />
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <SalesChart />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Registered Regional Guilds */}
            <div className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DCCD]">
                <h4 className="font-serif text-base font-semibold text-[#6E171B]">
                  Verified Artisan Collectives
                </h4>
                <span className="text-xs text-[#776B5E]">GI Audited</span>
              </div>
              <div className="divide-y divide-[#E8DCCD]/60">
                {MOCK_SELLERS.map((seller) => (
                  <div key={seller.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-[#282522]">{seller.storeName}</p>
                      <p className="text-[10px] text-[#776B5E]">
                        {seller.city}, {seller.stateName} • Leader: {seller.artisanLeader}
                      </p>
                    </div>
                    <Badge variant="green" size="sm">
                      Verified
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional State Coverage */}
            <div className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DCCD]">
                <h4 className="font-serif text-base font-semibold text-[#6E171B]">
                  Regional States Distribution
                </h4>
                <span className="text-xs text-[#776B5E]">28 of 28 Active</span>
              </div>
              <div className="space-y-2 text-xs">
                {["Northern India", "Southern India", "Western India", "Eastern India", "Central India", "North-Eastern India"].map((reg) => {
                  const count = INDIAN_STATES.filter((s) => s.region === reg).length;
                  return (
                    <div key={reg} className="flex items-center justify-between py-1">
                      <span className="font-medium text-[#282522]">{reg}</span>
                      <span className="font-mono text-[11px] text-[#6E171B] bg-[#F5EBDD] px-2 py-0.5 rounded-xs">
                        {count} States Enrolled
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Products Catalog */}
      {activeTab === "products" && (
        <ProductManageTable products={PRODUCTS} isSellerView={false} />
      )}

      {/* Tab 3: Sellers Guilds */}
      {activeTab === "sellers" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-[#6E171B]">
              Artisan Cooperative Guild Applications
            </h3>
            <span className="text-xs text-[#776B5E]">
              {MOCK_SELLERS.length} Cooperative Guilds Approved
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_SELLERS.map((s) => (
              <div
                key={s.id}
                className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-bold text-[#6E171B]">
                    {s.storeName}
                  </h4>
                  <Badge variant="green" size="sm">
                    GI Tag Certified
                  </Badge>
                </div>
                <p className="text-xs text-[#776B5E] leading-relaxed">
                  {s.description}
                </p>
                <div className="pt-2 border-t border-[#E8DCCD] text-xs flex justify-between text-[#776B5E]">
                  <span>Contact: {s.contactPhone}</span>
                  <span className="font-semibold text-[#282522]">
                    {s.totalSales} Orders Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Orders */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-[#6E171B]">
              National Orders Fulfillment
            </h3>
            <span className="text-xs text-[#776B5E]">
              Monitoring direct loom dispatches
            </span>
          </div>
          <OrderTable orders={MOCK_ORDERS} />
        </div>
      )}
    </div>
  );
}

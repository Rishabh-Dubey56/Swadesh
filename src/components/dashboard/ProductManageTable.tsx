"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export interface ProductManageTableProps {
  products: Product[];
  onAddProduct?: (newProd: Partial<Product>) => void;
  onDeleteProduct?: (id: string) => void;
  isSellerView?: boolean;
}

export function ProductManageTable({
  products,
  onAddProduct,
  onDeleteProduct,
  isSellerView = true,
}: ProductManageTableProps) {
  const [productList, setProductList] = useState<Product[]>(products);
  const [showAddModal, setShowAddModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Add form fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("handloom-sarees");
  const [craftType, setCraftType] = useState("");
  const [stateName, setStateName] = useState("Uttar Pradesh");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("10");
  const [fabric, setFabric] = useState("");

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    const newProduct: Product = {
      id: `prod-custom-${Date.now()}`,
      name: name.trim(),
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      stateId: stateName.toLowerCase().replace(/\s+/g, "-"),
      stateName,
      region: "Northern India",
      categorySlug: category,
      categoryName: category.replace("-", " ").toUpperCase(),
      craftType: craftType.trim() || "Traditional Loom Weave",
      gender: "Women",
      price: Number(price),
      originalPrice: Math.round(Number(price) * 1.25),
      discountPercent: 20,
      rating: 5.0,
      reviewCount: 1,
      images: [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      ],
      shortDescription: `Artisanal creation crafted in ${stateName}.`,
      fullDescription: `Handmade by our collective weavers in ${stateName} using traditional indigenous heritage techniques.`,
      fabric: fabric.trim() || "100% Pure Handspun Silk",
      craftTechnique: craftType.trim() || "Handloom Weaving",
      careInstructions: "Dry Clean Only.",
      origin: stateName,
      sellerId: "seller-bunkar-samiti",
      sellerName: "Varanasi Bunkar Weavers Co-operative",
      sizes: ["Free Size"],
      colors: [{ name: "Artisan Natural", hex: "#C7A46A" }],
      inStock: true,
      stockCount: Number(stock) || 5,
      sku: `SWD-NEW-${Date.now().toString().slice(-4)}`,
    };

    setProductList([newProduct, ...productList]);
    if (onAddProduct) onAddProduct(newProduct);
    setSuccessMessage(`Product "${name}" added to catalog successfully!`);
    setShowAddModal(false);
    setName("");
    setPrice("");
    setCraftType("");
    setFabric("");
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this artisan product from catalog?")) {
      setProductList(productList.filter((p) => p.id !== id));
      if (onDeleteProduct) onDeleteProduct(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="font-serif text-base font-semibold text-[#6E171B]">
            {isSellerView ? "Artisan Loom Inventory" : "All Platform Master Products"}
          </h4>
          <p className="text-xs text-[#776B5E]">
            {productList.length} handcrafted products listed across 28 states
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          <span>Add New Loom Product</span>
        </Button>
      </div>

      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Table */}
      <div className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5EBDD] text-[#776B5E] uppercase tracking-wider font-semibold border-b border-[#E8DCCD]">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">State &amp; Craft</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock Units</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DCCD]/60 text-[#282522]">
              {productList.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#FAF4EB] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-10 h-12 rounded-xs overflow-hidden shrink-0 border border-[#E8DCCD] bg-[#F5EBDD]">
                        <Image
                          src={prod.images[0]}
                          alt={prod.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[#282522] line-clamp-1 max-w-[200px]">
                          {prod.name}
                        </p>
                        <span className="font-mono text-[10px] text-[#776B5E]">
                          SKU: {prod.sku}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{prod.stateName}</p>
                    <p className="text-[10px] text-[#9C7942]">{prod.craftType}</p>
                  </td>
                  <td className="px-4 py-3 font-bold text-[#6E171B]">
                    {formatINR(prod.price)}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {prod.stockCount} in stock
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={prod.inStock ? "green" : "outline"} size="sm">
                      {prod.inStock ? "Active" : "Out of Stock"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDelete(prod.id)}
                        className="text-[#776B5E] hover:text-red-700 p-1 cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Handcrafted Product"
        description="List an authentic handloom or GI craft for verification"
        maxWidth="lg"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Royal Baluchari Narrative Silk Saree"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
              >
                <option value="handloom-sarees">Handloom Sarees</option>
                <option value="kurtas-sets">Kurtas &amp; Tunics</option>
                <option value="lehengas-anarkalis">Lehengas &amp; Anarkalis</option>
                <option value="shawls-dupattas">Shawls &amp; Dupattas</option>
                <option value="heritage-jewellery">Heritage Jewellery</option>
                <option value="handcrafted-footwear">Handcrafted Mojaris</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
                State of Origin *
              </label>
              <input
                type="text"
                required
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                placeholder="e.g. West Bengal"
                className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
                Craft / Technique *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Baluchari Tapestry"
                value={craftType}
                onChange={(e) => setCraftType(e.target.value)}
                className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
                Price (INR) *
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 15000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
                Initial Stock Units
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
              Fabric Composition &amp; Material
            </label>
            <input
              type="text"
              placeholder="e.g. 100% Pure Murshidabad Mulberry Silk"
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
              className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Confirm &amp; Publish Listing
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

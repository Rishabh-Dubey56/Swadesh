"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Order, OrderTrackingStatus } from "@/types";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Eye, CheckCircle2, Clock } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

export interface OrderTableProps {
  orders: Order[];
  onUpdateStatus?: (orderId: string, newStatus: OrderTrackingStatus) => void;
  showActions?: boolean;
}

export function OrderTable({
  orders,
  onUpdateStatus,
  showActions = true,
}: OrderTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusBadgeVariant = (status: OrderTrackingStatus) => {
    switch (status) {
      case "Delivered":
        return "green";
      case "Shipped":
      case "Out for Delivery":
        return "gold";
      case "Packed":
      case "Confirmed":
        return "cream";
      case "Order Placed":
      default:
        return "outline";
    }
  };

  return (
    <>
      <div className="bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5EBDD] text-[#776B5E] uppercase tracking-wider font-semibold border-b border-[#E8DCCD]">
              <tr>
                <th className="px-4 py-3">Order Number</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Customer / Items</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">Status</th>
                {showActions && <th className="px-4 py-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DCCD]/60 text-[#282522]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FAF4EB] transition-colors">
                  <td className="px-4 py-3 font-mono font-medium text-[#6E171B]">
                    {order.orderNumber}
                  </td>
                  <td className="px-4 py-3 text-[#776B5E]">{order.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-xs overflow-hidden shrink-0 border border-[#E8DCCD]">
                        <Image
                          src={order.items[0]?.productImage || "https://images.unsplash.com/photo-1610030469983-98e550d6193c"}
                          alt={order.items[0]?.productName || "Product"}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium line-clamp-1 max-w-[180px]">
                          {order.items[0]?.productName}
                        </p>
                        {order.items.length > 1 && (
                          <span className="text-[10px] text-[#776B5E]">
                            +{order.items.length - 1} more item(s)
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-[#6E171B]">
                    {formatINR(order.total)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={getStatusBadgeVariant(order.status)} size="sm">
                      {order.status}
                    </Badge>
                  </td>
                  {showActions && (
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1 text-xs text-[#6E171B] hover:text-[#8A2529] font-medium p-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <Modal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title={`Order ${selectedOrder.orderNumber}`}
          description={`Placed on ${selectedOrder.date} • Direct Loom Fulfillment`}
          maxWidth="lg"
        >
          <div className="space-y-5 text-xs text-[#282522]">
            {/* Tracking Progress */}
            <div className="bg-[#FAF4EB] p-4 rounded-sm border border-[#E8DCCD] space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DCCD]">
                <span className="font-semibold text-[#6E171B]">Fulfillment Status</span>
                <span className="text-[11px] text-[#776B5E]">
                  AWB: <strong className="font-mono text-[#282522]">{selectedOrder.trackingNumber}</strong>
                </span>
              </div>
              <div className="space-y-2 pt-1">
                {selectedOrder.trackingSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                          step.completed
                            ? "bg-emerald-600 text-white"
                            : "bg-[#E8DCCD] text-[#776B5E]"
                        }`}
                      >
                        {step.completed ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-2.5 h-2.5" />}
                      </div>
                      <span className={step.completed ? "font-semibold text-[#282522]" : "text-[#776B5E]"}>
                        {step.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#776B5E]">{step.date || "Pending"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2">
              <h5 className="font-semibold uppercase tracking-wider text-[#776B5E]">
                Ordered Handcrafted Items
              </h5>
              <div className="divide-y divide-[#E8DCCD]/60 border border-[#E8DCCD] rounded-xs bg-[#FAF4EB]">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-12 h-14 rounded-xs overflow-hidden border border-[#E8DCCD] bg-[#F5EBDD] shrink-0">
                        <Image
                          src={item.productImage}
                          alt={item.productName}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-[10px] text-[#776B5E]">
                          {item.stateName} • Qty: {item.quantity}
                          {item.selectedSize ? ` • Size: ${item.selectedSize}` : ""}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-[#6E171B]">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address & Payment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="bg-[#FAF4EB] p-3 rounded-xs border border-[#E8DCCD]">
                <h6 className="font-semibold text-[#6E171B] mb-1">Shipping Address</h6>
                <p className="font-medium">{selectedOrder.shippingAddress.fullName}</p>
                <p className="text-[#776B5E]">{selectedOrder.shippingAddress.street}</p>
                <p className="text-[#776B5E]">
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                </p>
                <p className="text-[#776B5E] mt-1">Phone: {selectedOrder.shippingAddress.phone}</p>
              </div>

              <div className="bg-[#FAF4EB] p-3 rounded-xs border border-[#E8DCCD] space-y-1">
                <h6 className="font-semibold text-[#6E171B] mb-1">Financial Summary</h6>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-medium">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatINR(selectedOrder.subtotal)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount:</span>
                    <span>-{formatINR(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-[#6E171B] pt-1 border-t border-[#E8DCCD]">
                  <span>Total Paid:</span>
                  <span>{formatINR(selectedOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Simulated Action if seller/admin updating */}
            {onUpdateStatus && (
              <div className="pt-2 flex items-center justify-between border-t border-[#E8DCCD]">
                <span className="text-[11px] text-[#776B5E]">Simulate Loom Dispatch Status:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(selectedOrder.id, "Packed")}
                    className="px-2.5 py-1 bg-[#F5EBDD] text-[#6E171B] rounded-xs font-semibold hover:bg-[#E8DCCD]"
                  >
                    Mark Packed
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(selectedOrder.id, "Shipped")}
                    className="px-2.5 py-1 bg-[#6E171B] text-white rounded-xs font-semibold hover:bg-[#8A2529]"
                  >
                    Mark Shipped
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

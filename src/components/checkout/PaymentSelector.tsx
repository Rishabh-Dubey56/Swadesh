"use client";

import React, { useState } from "react";
import { QrCode, CreditCard, Building2, Banknote, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export type PaymentMethodType =
  | "UPI"
  | "Credit / Debit Card"
  | "Net Banking"
  | "Cash on Delivery";

export interface PaymentSelectorProps {
  selectedMethod: PaymentMethodType;
  onSelectMethod: (method: PaymentMethodType) => void;
  totalAmount: number;
  onCompleteOrder: () => void;
  isProcessing: boolean;
}

export function PaymentSelector({
  selectedMethod,
  onSelectMethod,
  totalAmount,
  onCompleteOrder,
  isProcessing,
}: PaymentSelectorProps) {
  const [upiId, setUpiId] = useState("patron@okhdfcbank");
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8821");
  const [cardExpiry, setCardExpiry] = useState("09/28");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  const methods: {
    id: PaymentMethodType;
    label: string;
    sublabel: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "UPI",
      label: "UPI Instant Payment",
      sublabel: "Google Pay, PhonePe, Paytm, BHIM UPI ID / QR",
      icon: <QrCode className="w-4 h-4 text-[#C7A46A]" />,
    },
    {
      id: "Credit / Debit Card",
      label: "Credit / Debit Card",
      sublabel: "RuPay, Visa, MasterCard, American Express",
      icon: <CreditCard className="w-4 h-4 text-[#6E171B]" />,
    },
    {
      id: "Net Banking",
      label: "Net Banking",
      sublabel: "All major Indian scheduled banks supported",
      icon: <Building2 className="w-4 h-4 text-[#9C7942]" />,
    },
    {
      id: "Cash on Delivery",
      label: "Cash on Delivery (COD)",
      sublabel: "Verify authenticity upon doorstep arrival before payment",
      icon: <Banknote className="w-4 h-4 text-emerald-700" />,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Explicit Simulated Payment Banner */}
      <div className="bg-[#FAF4EB] border border-[#C7A46A]/50 rounded-sm p-3.5 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-[#9C7942] shrink-0 mt-0.5" />
        <div className="text-xs text-[#282522]">
          <strong className="text-[#6E171B] font-semibold">Simulated Prototype Environment:</strong>{" "}
          This is an interactive demonstration checkout. No actual bank charge, card deduction, or money transfer will take place.
        </div>
      </div>

      {/* Methods List */}
      <div className="space-y-2.5">
        {methods.map((m) => {
          const isSelected = selectedMethod === m.id;
          return (
            <div
              key={m.id}
              onClick={() => onSelectMethod(m.id)}
              className={`p-3.5 rounded-sm border transition-all cursor-pointer ${
                isSelected
                  ? "border-[#6E171B] bg-[#F5EBDD]/70 ring-1 ring-[#6E171B]"
                  : "border-[#E8DCCD] bg-[#FAF4EB] hover:border-[#C7A46A]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? "border-[#6E171B] bg-[#6E171B]"
                        : "border-[#776B5E]"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {m.icon}
                    <span className="text-xs font-bold text-[#282522]">
                      {m.label}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-[#776B5E] hidden sm:inline">
                  {m.sublabel}
                </span>
              </div>

              {/* Sub-inputs if selected */}
              {isSelected && m.id === "UPI" && (
                <div className="mt-3 pt-3 border-t border-[#E8DCCD] space-y-2 text-xs">
                  <p className="text-[11px] text-[#776B5E]">
                    Simulated UPI ID:
                  </p>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-[#FFF9F0] border border-[#E8DCCD] rounded-xs px-3 py-1.5 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
                  />
                  <div className="flex gap-2 text-[10px] text-[#776B5E]">
                    <span>Popular Apps:</span>
                    <span className="text-[#6E171B] font-medium">Google Pay</span> •{" "}
                    <span className="text-[#6E171B] font-medium">PhonePe</span> •{" "}
                    <span className="text-[#6E171B] font-medium">Paytm UPI</span>
                  </div>
                </div>
              )}

              {isSelected && m.id === "Credit / Debit Card" && (
                <div className="mt-3 pt-3 border-t border-[#E8DCCD] space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[11px] text-[#776B5E] mb-1">
                        Demo Card Number
                      </p>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#FFF9F0] border border-[#E8DCCD] rounded-xs px-3 py-1.5 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
                      />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#776B5E] mb-1">
                        Valid Thru
                      </p>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#FFF9F0] border border-[#E8DCCD] rounded-xs px-3 py-1.5 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {isSelected && m.id === "Net Banking" && (
                <div className="mt-3 pt-3 border-t border-[#E8DCCD] space-y-2 text-xs">
                  <p className="text-[11px] text-[#776B5E]">
                    Select Bank:
                  </p>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-[#FFF9F0] border border-[#E8DCCD] rounded-xs px-3 py-1.5 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="State Bank of India">State Bank of India (SBI)</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Punjab National Bank">Punjab National Bank</option>
                  </select>
                </div>
              )}

              {isSelected && m.id === "Cash on Delivery" && (
                <div className="mt-3 pt-3 border-t border-[#E8DCCD] text-[11px] text-[#776B5E] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Doorstep cash or UPI payment supported on delivery.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Complete Order Action */}
      <div className="pt-4">
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="w-full font-serif text-base font-semibold"
          isLoading={isProcessing}
          onClick={onCompleteOrder}
        >
          {isProcessing
            ? "Verifying Artisan Loom Reservation..."
            : `Place Simulated Order (₹${totalAmount.toLocaleString("en-IN")})`}
        </Button>
      </div>
    </div>
  );
}

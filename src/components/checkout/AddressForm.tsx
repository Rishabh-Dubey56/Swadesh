"use client";

import React, { useState } from "react";
import * as z from "zod";
import { SavedAddress } from "@/types";
import { Button } from "@/components/ui/Button";
import { INDIAN_STATES } from "@/data/states";

export const addressSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  phone: z
    .string()
    .min(10, "Enter a valid 10-digit mobile number")
    .regex(/^[0-9+\s-]{10,14}$/, "Enter a valid phone number"),
  street: z.string().min(8, "Please enter full street address & house number"),
  landmark: z.string().optional(),
  city: z.string().min(2, "City name is required"),
  state: z.string().min(2, "Please select state"),
  pincode: z
    .string()
    .length(6, "PIN code must be exactly 6 digits")
    .regex(/^[0-9]{6}$/, "Enter a valid 6-digit postal code"),
  addressType: z.enum(["Home", "Work"]),
});

export type AddressFormData = z.infer<typeof addressSchema>;

export interface AddressFormProps {
  initialValues?: Partial<SavedAddress>;
  onSubmitAddress: (data: AddressFormData) => void;
  isLoading?: boolean;
}

export function AddressForm({
  initialValues,
  onSubmitAddress,
  isLoading = false,
}: AddressFormProps) {
  const [formData, setFormData] = useState<AddressFormData>({
    fullName: initialValues?.fullName || "Ananya Sharma",
    phone: initialValues?.phone || "9876543210",
    street: initialValues?.street || "Flat 402, Nilgiri Heritage Heights, 12th Main Road, Indiranagar",
    landmark: initialValues?.landmark || "Near Defense Colony Club",
    city: initialValues?.city || "Bengaluru",
    state: initialValues?.state || "Karnataka",
    pincode: initialValues?.pincode || "560038",
    addressType: (initialValues?.addressType as "Home" | "Work") || "Home",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AddressFormData, string>>>({});

  const handleChange = (
    field: keyof AddressFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = addressSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof AddressFormData, string>> = {};
      result.error.issues.forEach((err) => {
        const path = err.path[0] as keyof AddressFormData;
        if (path) fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmitAddress(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
            Recipient Full Name *
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3.5 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
            placeholder="e.g. Radhika Iyer"
          />
          {errors.fullName && (
            <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
            Contact Mobile Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3.5 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
            placeholder="10-digit mobile number"
          />
          {errors.phone && (
            <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Street Address */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
          Street Address / House No. / Heritage Lane *
        </label>
        <input
          type="text"
          value={formData.street}
          onChange={(e) => handleChange("street", e.target.value)}
          className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3.5 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
          placeholder="House/Apartment, Street Name, Area"
        />
        {errors.street && (
          <p className="text-[11px] text-red-600 mt-1">{errors.street}</p>
        )}
      </div>

      {/* Landmark */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
          Nearby Landmark (Optional)
        </label>
        <input
          type="text"
          value={formData.landmark || ""}
          onChange={(e) => handleChange("landmark", e.target.value)}
          className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3.5 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
          placeholder="e.g. Near Temple / Opposite Bunkar Bhavan"
        />
      </div>

      {/* City, State, Pincode */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
            City / Town *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3.5 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
            placeholder="e.g. Bengaluru"
          />
          {errors.city && (
            <p className="text-[11px] text-red-600 mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
            State *
          </label>
          <select
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
            className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3.5 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A] cursor-pointer"
          >
            {INDIAN_STATES.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-[11px] text-red-600 mt-1">{errors.state}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
            6-Digit Pincode *
          </label>
          <input
            type="text"
            maxLength={6}
            value={formData.pincode}
            onChange={(e) => handleChange("pincode", e.target.value)}
            className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3.5 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
            placeholder="e.g. 560038"
          />
          {errors.pincode && (
            <p className="text-[11px] text-red-600 mt-1">{errors.pincode}</p>
          )}
        </div>
      </div>

      {/* Address Type */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-2">
          Address Classification
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-xs text-[#282522] cursor-pointer">
            <input
              type="radio"
              name="addressType"
              value="Home"
              checked={formData.addressType === "Home"}
              onChange={() => handleChange("addressType", "Home")}
              className="accent-[#6E171B]"
            />
            <span>Home (All day delivery)</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-[#282522] cursor-pointer">
            <input
              type="radio"
              name="addressType"
              value="Work"
              checked={formData.addressType === "Work"}
              onChange={() => handleChange("addressType", "Work")}
              className="accent-[#6E171B]"
            />
            <span>Work (10 AM - 6 PM delivery)</span>
          </label>
        </div>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isLoading}
        >
          Confirm Delivery Address &amp; Proceed
        </Button>
      </div>
    </form>
  );
}

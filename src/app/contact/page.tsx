"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("Loom Concierge (Patron)");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C7A46A]">
          Weaver Concierge &amp; Guild Enquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#6E171B]">
          Connect With SWADESH
        </h1>
        <p className="text-xs sm:text-sm text-[#776B5E] leading-relaxed">
          Whether you are an artisan collective seeking GI onboarding or a cultural patron inquiring about custom loom weaving, our curators are at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Column */}
        <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 sm:p-8 space-y-6">
          <h3 className="font-serif text-xl font-bold text-[#6E171B]">
            Heritage Studios
          </h3>

          <div className="space-y-4 text-xs text-[#282522]">
            <div className="flex gap-3">
              <MapPin className="w-4 h-4 text-[#C7A46A] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#6E171B]">Varanasi Artisan Liaison</p>
                <p className="text-[#776B5E]">Bunkar Bhavan, Madanpura Heritage Lane, Varanasi, UP - 221001</p>
              </div>
            </div>

            <div className="flex gap-3">
              <MapPin className="w-4 h-4 text-[#C7A46A] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#6E171B]">Central Cultural Office</p>
                <p className="text-[#776B5E]">Mehrauli Heritage Complex, Near Qutub Minar, New Delhi - 110030</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone className="w-4 h-4 text-[#C7A46A] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#6E171B]">Artisan Concierge Desk</p>
                <p className="text-[#776B5E]">+91 11 2680 9400 (Mon - Sat, 10 AM - 6 PM IST)</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Mail className="w-4 h-4 text-[#C7A46A] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#6E171B]">Electronic Inquiries</p>
                <p className="text-[#776B5E]">curator@swadesh.crafts • guild@swadesh.crafts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-[#FFF9F0] border border-[#E8DCCD] rounded-sm p-6 sm:p-8 space-y-6 shadow-xs">
          <h3 className="font-serif text-xl font-bold text-[#6E171B]">
            Send an Inquiry to Our Curators
          </h3>

          {submitted && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-4 rounded-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Dhanyavaad! Your message has been received by our curator team. We will respond within 24 business hours.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alokita Roy"
                  className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3.5 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alokita@domain.com"
                  className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3.5 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
                Subject &amp; Nature of Inquiry
              </label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs px-3.5 py-2 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
              >
                <option value="Loom Concierge (Patron)">Patron Loom Concierge &amp; Saree Inquiries</option>
                <option value="Artisan Partnership">Weaver Cooperative / Guild Partnership (Sell on SWADESH)</option>
                <option value="Silk Mark Verification">Silk Mark &amp; GI Tag Verification Inquiry</option>
                <option value="Bulk Order">Custom Bridal &amp; Festive Trousseau Orders</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#776B5E] mb-1">
                Your Message *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your requirements or questions regarding regional handloom crafts..."
                className="w-full bg-[#FAF4EB] border border-[#E8DCCD] rounded-xs p-3.5 text-xs text-[#282522] focus:outline-none focus:border-[#C7A46A]"
              />
            </div>

            <div>
              <Button type="submit" variant="primary" size="md">
                <span>Submit Inquiry</span>
                <Send className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

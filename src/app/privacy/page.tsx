import React from "react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C7A46A]">
          Trust &amp; Transparency
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#6E171B]">
          Privacy Policy &amp; Patron Data Protection
        </h1>
        <p className="text-xs sm:text-sm text-[#776B5E] max-w-xl mx-auto leading-relaxed">
          How SWADESH safeguards your personal information and respects your privacy.
        </p>
      </div>

      <div className="space-y-6 text-xs text-[#282522]">
        <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#6E171B]">
            1. Information We Collect
          </h2>
          <p className="leading-relaxed text-[#776B5E]">
            When you purchase handcrafted items, create a cultural patron account, or subscribe to The Heritage Chronicle newsletter, we collect necessary contact information (name, email, shipping address, mobile number). In this prototype environment, all payment transactions and credentials are demo simulations.
          </p>
        </div>

        <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#6E171B]">
            2. How We Use Your Information
          </h2>
          <p className="leading-relaxed text-[#776B5E]">
            Your delivery address is shared exclusively with our logistics courier partners to fulfill handloom dispatches directly from weaving clusters. We never sell, rent, or trade your personal data to commercial third parties.
          </p>
        </div>

        <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#6E171B]">
            3. Data Security &amp; Encryption
          </h2>
          <p className="leading-relaxed text-[#776B5E]">
            We apply industry-standard 256-bit SSL encryption to all digital communication channels. Demo sessions preserve local preferences (such as shopping cart and wishlist items) directly within your browser&apos;s localStorage for responsive, private browsing.
          </p>
        </div>

        <div className="bg-[#FAF4EB] border border-[#E8DCCD] rounded-sm p-6 space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#6E171B]">
            4. Your Rights &amp; Contact
          </h2>
          <p className="leading-relaxed text-[#776B5E]">
            You have the right to request deletion, inspection, or correction of your profile data at any time. For privacy inquiries, contact our data protection officer at <span className="text-[#6E171B] font-semibold">privacy@swadesh.crafts</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

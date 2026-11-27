import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, HelpCircle, ArrowLeft, Mail } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How do I track my order status?",
      a: "You can track your order at any time using our Live Order Tracker page or directly from your Profile > My Orders section using your Order ID.",
    },
    {
      q: "What is the delivery timeline?",
      a: "Standard shipping typically takes 3 to 5 business days across India. Express orders are delivered within 48 to 72 hours.",
    },
    {
      q: "What is your return & exchange policy?",
      a: "ShopNest provides a 10-day hassle-free return policy. If you are not satisfied with the fit or quality, you can initiate a return or exchange provided the item is unused with original tags.",
    },
    {
      q: "How can I apply promo codes like WELCOME15?",
      a: "In your Shopping Cart, look for the 'Have a Promo Code?' card. Type WELCOME15 and click 'Apply' to get an instant 15% discount on your order.",
    },
    {
      q: "What payment methods are supported?",
      a: "We support Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm), and major Debit & Credit Cards (Visa, MasterCard, RuPay).",
    },
    {
      q: "Can I cancel my order after placing it?",
      a: "Yes! You can cancel your order directly from your Profile > My Orders before it is marked as 'Delivered'.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDECE2] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#11231e] font-medium mb-6 hover:underline"
        >
          <ArrowLeft size={18} /> Back to Store
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold font-['Cormorant_Garamond'] text-[#11231e]">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Find answers to commonly asked questions about orders, payments, and returns.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#ead8cc] p-6 sm:p-10 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-[#ead8cc] rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-5 text-left font-semibold text-[#11231e] hover:bg-[#FAF6F3] transition cursor-pointer text-base sm:text-lg"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle size={20} className="text-[#255347] flex-shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-[#11231e]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 bg-[#FAF6F3]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still need help? */}
        <div className="mt-8 bg-[#255347] text-white rounded-3xl p-8 text-center flex flex-col items-center gap-3 shadow-md">
          <Mail size={36} className="text-emerald-200" />
          <h3 className="text-2xl font-bold font-['Cormorant_Garamond']">Still have questions?</h3>
          <p className="text-emerald-100 text-sm max-w-md">
            Our support team is always here to assist you with any questions or order queries.
          </p>
          <Link to="/contact">
            <button className="mt-3 px-8 py-3 rounded-full bg-white text-[#11231e] font-semibold hover:bg-gray-100 transition cursor-pointer text-sm">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

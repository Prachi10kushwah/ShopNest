import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Send, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in your name, email and message!");
      return;
    }
    toast.success("Thank you! Your message has been sent. We'll reply within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#FDECE2] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#11231e] font-medium mb-6 hover:underline"
        >
          <ArrowLeft size={18} /> Back to Store
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-['Cormorant_Garamond'] text-[#11231e]">
            Get In Touch
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Have any questions, feedbacks, or wholesale enquiries? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#255347] text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-6">
              <h2 className="text-2xl font-bold font-['Cormorant_Garamond'] text-emerald-100">
                Contact Information
              </h2>

              <p className="text-emerald-100 text-sm leading-relaxed">
                Reach out directly via phone or email, or drop by our showroom.
              </p>

              <div className="space-y-5 pt-2 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-emerald-200" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Location</h4>
                    <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">
                      Indore, Madhya Pradesh, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-emerald-200" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Call Us</h4>
                    <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">+91 1234567890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-emerald-200" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email Us</h4>
                    <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">support@shopnest.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-emerald-200" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Working Hours</h4>
                    <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">Mon - Sat: 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-[#ead8cc] p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-[#11231e]">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aditi Sharma"
                    className="w-full h-12 border border-[#d9c8be] rounded-xl px-4 text-sm outline-none focus:border-[#11231e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="aditi@example.com"
                    className="w-full h-12 border border-[#d9c8be] rounded-xl px-4 text-sm outline-none focus:border-[#11231e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Order enquiry / Feedback / Suggestion"
                  className="w-full h-12 border border-[#d9c8be] rounded-xl px-4 text-sm outline-none focus:border-[#11231e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you today?"
                  className="w-full border border-[#d9c8be] rounded-xl p-4 text-sm outline-none focus:border-[#11231e] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-13 mt-4 rounded-full bg-[#11231e] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#1b3a33] transition shadow-md cursor-pointer text-sm sm:text-base active:scale-98"
              >
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

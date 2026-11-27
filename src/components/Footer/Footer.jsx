import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#FDEBE1] border-t border-[#e3d7cf]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          {/* Logo Section */}
          <div>
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-bold text-[#11231e]">
              ShopNest
            </h2>

            <p className="mt-5 text-[#666] leading-7 font-['Poppins'] text-sm sm:text-base">
              Discover timeless fashion with premium clothing, bags, watches and accessories crafted for every style.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              <div className="w-10 h-10 rounded-full border border-[#11231e] flex items-center justify-center hover:bg-[#11231e] hover:text-white transition-all duration-300 cursor-pointer">
                <FaFacebookF size={16} />
              </div>

              <div className="w-10 h-10 rounded-full border border-[#11231e] flex items-center justify-center hover:bg-[#11231e] hover:text-white transition-all duration-300 cursor-pointer">
                <FaInstagram size={18} />
              </div>

              <div className="w-10 h-10 rounded-full border border-[#11231e] flex items-center justify-center hover:bg-[#11231e] hover:text-white transition-all duration-300 cursor-pointer">
                <FaTwitter size={18} />
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#11231e] mb-6">
              Shop Categories
            </h3>

            <ul className="space-y-3 font-['Poppins'] text-[#666] text-sm sm:text-base">
              <li>
                <Link to="/" className="hover:text-[#11231e] transition">All Products</Link>
              </li>
              <li>
                <Link to="/mens" className="hover:text-[#11231e] transition">Men</Link>
              </li>
              <li>
                <Link to="/womens" className="hover:text-[#11231e] transition">Women</Link>
              </li>
              <li>
                <Link to="/kids" className="hover:text-[#11231e] transition">Kids</Link>
              </li>
              <li>
                <Link to="/watches" className="hover:text-[#11231e] transition">Watches</Link>
              </li>
              <li>
                <Link to="/bags" className="hover:text-[#11231e] transition">Bags</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#11231e] mb-6">
              Customer Care
            </h3>

            <ul className="space-y-3 font-['Poppins'] text-[#666] text-sm sm:text-base">
              <li>
                <Link to="/track-order" className="hover:text-[#11231e] transition">Track Live Order</Link>
              </li>
              <li>
                <Link to="/user" className="hover:text-[#11231e] transition">My Orders & Invoices</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#11231e] transition">FAQs & Help Center</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#11231e] transition">10-Day Returns Policy</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#11231e] transition">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#11231e] mb-6">
              Contact & Info
            </h3>

            <div className="space-y-4 font-['Poppins'] text-[#666] text-sm sm:text-base">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#11231e]">Developer:</span>
                <span>Prachi Kushwah</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#11231e] flex-shrink-0" />
                <span>Indore, Madhya Pradesh</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#11231e] flex-shrink-0" />
                <span>+91 1234567890</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#11231e] flex-shrink-0" />
                <span>support@shopnest.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#d7c8bf] mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="font-['Poppins'] text-[#666] text-sm">
            © 2026 ShopNest. All Rights Reserved. Crafted with care.
          </p>

          <div className="flex gap-6 font-['Poppins'] text-sm text-[#666]">
            <Link to="/faq" className="hover:text-[#11231e] transition">Terms & Privacy</Link>
            <Link to="/contact" className="hover:text-[#11231e] transition">Security & Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

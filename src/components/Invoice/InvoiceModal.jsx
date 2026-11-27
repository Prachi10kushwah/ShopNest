import React from "react";
import { X, Printer, CheckCircle } from "lucide-react";
import logo from "../Assets/logo.png";

const InvoiceModal = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Modal Controls (Hidden in print) */}
        <div className="flex justify-between items-center px-6 py-4 bg-[#FAF6F3] border-b border-gray-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#11231e]">Order Invoice</span>
            <span className="text-xs font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
              {order.orderId}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#11231e] text-white text-xs font-semibold rounded-lg hover:bg-[#1b3a33] transition cursor-pointer"
            >
              <Printer size={16} /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Invoice Area */}
        <div className="p-8 sm:p-10 text-[#11231e] print:p-0">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-gray-200 pb-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="ShopNest" className="w-12 h-12 rounded-full" />
              <div>
                <h1 className="text-2xl font-bold font-['Poppins']">ShopNest</h1>
                <p className="text-xs text-gray-500">Timeless Fashion & Lifestyle</p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block text-xs uppercase tracking-widest font-bold bg-[#11231e] text-white px-2.5 py-1 rounded">
                TAX INVOICE
              </span>
              <p className="text-xs text-gray-500 mt-1 font-mono">Invoice #{order.orderId}</p>
              <p className="text-xs text-gray-500">{order.orderDate}</p>
            </div>
          </div>

          {/* Customer & Order Details */}
          <div className="grid grid-cols-2 gap-6 py-6 border-b border-gray-100 text-sm">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Billed / Shipped To:
              </p>
              <p className="font-bold text-[#11231e]">{order.customer?.name}</p>
              <p className="text-gray-600 text-xs sm:text-sm mt-0.5 leading-relaxed">
                {order.customer?.address}
                {order.customer?.city ? `, ${order.customer?.city}` : ""}
                {order.customer?.postalCode ? ` - ${order.customer?.postalCode}` : ""}
              </p>
              <p className="text-xs text-gray-600 mt-1">Phone: {order.customer?.phone}</p>
              <p className="text-xs text-gray-600">Email: {order.customer?.email}</p>
            </div>

            <div className="text-right">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Payment Info:
              </p>
              <p className="font-semibold">{order.paymentMethod}</p>
              <p className="text-xs text-emerald-600 font-medium flex items-center justify-end gap-1 mt-0.5">
                <CheckCircle size={14} /> {order.status}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-left my-6 text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-xs uppercase text-gray-500">
                <th className="py-2">Item</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Price</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {order.items?.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3 font-medium text-[#11231e]">{item.name}</td>
                  <td className="py-3 text-center text-gray-600">{item.quantity}</td>
                  <td className="py-3 text-right text-gray-600">${item.price}</td>
                  <td className="py-3 text-right font-semibold">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Calculations */}
          <div className="pt-4 border-t border-gray-200 space-y-2 text-sm max-w-xs ml-auto">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${order.subtotal?.toFixed(2)}</span>
            </div>

            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount ({order.couponCode})</span>
                <span>-${order.discount?.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-emerald-600 font-medium">FREE</span>
            </div>

            <div className="flex justify-between text-base font-bold text-[#11231e] pt-2 border-t border-gray-200">
              <span>Grand Total</span>
              <span>${order.totalAmount?.toFixed(2)}</span>
            </div>
          </div>

          {/* Footer notice */}
          <div className="mt-8 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
            <p>Thank you for shopping with ShopNest!</p>
            <p className="mt-0.5">For returns or questions: support@shopnest.com | +91 1234567890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;

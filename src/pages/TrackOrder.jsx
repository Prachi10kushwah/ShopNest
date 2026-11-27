import React, { useState, useContext, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { Package, Search, CheckCircle, Truck, ShieldCheck, ArrowLeft } from "lucide-react";

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const { orders } = useContext(ShopContext);

  const initialId = searchParams.get("id") || "";
  const [searchId, setSearchId] = useState(initialId);
  const [foundOrder, setFoundOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback((idToSearch) => {
    const term = (idToSearch !== undefined ? idToSearch : searchId).trim().toUpperCase();
    if (!term) return;

    setSearched(true);
    const order = orders.find(
      (o) => o.orderId.toUpperCase() === term
    );
    setFoundOrder(order || null);
  }, [searchId, orders]);

  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    }
  }, [initialId, handleSearch]);

  const steps = [
    { label: "Order Placed", desc: "Received by ShopNest", key: "Confirmed" },
    { label: "Processing", desc: "Quality checked & packed", key: "Processing" },
    { label: "Shipped", desc: "Handed over to courier", key: "Shipped" },
    { label: "Delivered", desc: "Delivered to address", key: "Delivered" },
  ];

  const getStepStatus = (stepKey, currentStatus) => {
    if (currentStatus === "Cancelled") return "cancelled";
    const statusOrder = ["Confirmed", "Processing", "Shipped", "Delivered"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepKey);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "pending";
  };

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
            Live Order Tracking
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Track real-time shipment and delivery progress of your order.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#ead8cc] p-6 sm:p-8 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. ORD-123456)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full h-13 pl-12 pr-4 rounded-2xl border border-gray-300 outline-none uppercase font-mono text-sm sm:text-base focus:border-[#11231e]"
              />
            </div>

            <button
              type="submit"
              className="h-13 px-8 bg-[#11231e] text-white rounded-2xl font-semibold hover:bg-[#1b3a33] transition cursor-pointer text-sm sm:text-base flex-shrink-0"
            >
              Track Package
            </button>
          </form>
        </div>

        {/* Found Order Card */}
        {foundOrder ? (
          <div className="bg-white rounded-3xl shadow-sm border border-[#ead8cc] p-6 sm:p-10 space-y-8 animate-in fade-in duration-200">
            {/* Meta bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs text-gray-500 uppercase">Package Reference</span>
                <h3 className="text-2xl font-bold font-mono text-[#11231e]">
                  {foundOrder.orderId}
                </h3>
              </div>

              <div>
                <span className="text-xs text-gray-500 uppercase">Order Placed On</span>
                <p className="text-gray-700 font-medium text-sm">{foundOrder.orderDate}</p>
              </div>

              <div>
                <span className="text-xs text-gray-500 uppercase">Current Status</span>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase mt-0.5 ${
                    foundOrder.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {foundOrder.status}
                </span>
              </div>
            </div>

            {/* Stepper Progress */}
            {foundOrder.status === "Cancelled" ? (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-700">
                <p className="font-semibold text-lg">This order was cancelled.</p>
                <p className="text-xs text-red-600 mt-1">
                  Payment refund / reversal will be initiated according to policy.
                </p>
              </div>
            ) : (
              <div className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                  {steps.map((st, i) => {
                    const status = getStepStatus(st.key, foundOrder.status);
                    return (
                      <div key={i} className="flex flex-col items-center text-center relative z-10">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mb-3 transition-colors ${
                            status === "completed"
                              ? "bg-emerald-600 text-white"
                              : status === "current"
                              ? "bg-[#11231e] text-white ring-4 ring-emerald-100"
                              : "bg-gray-100 text-gray-400 border border-gray-200"
                          }`}
                        >
                          {status === "completed" ? (
                            <CheckCircle size={22} />
                          ) : (
                            <span>{i + 1}</span>
                          )}
                        </div>

                        <h4 className="font-bold text-sm text-[#11231e]">{st.label}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{st.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Destination & Order Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
              <div className="bg-[#FAF6F3] p-5 rounded-2xl border border-[#ead8cc]">
                <h4 className="font-semibold text-[#11231e] text-sm mb-2 flex items-center gap-2">
                  <Truck size={18} /> Delivery Address
                </h4>
                <p className="text-sm font-medium text-gray-800">{foundOrder.customer?.name}</p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {foundOrder.customer?.address}, {foundOrder.customer?.city} ({foundOrder.customer?.postalCode})
                </p>
                <p className="text-xs text-gray-600 mt-1">📞 {foundOrder.customer?.phone}</p>
              </div>

              <div className="bg-[#FAF6F3] p-5 rounded-2xl border border-[#ead8cc]">
                <h4 className="font-semibold text-[#11231e] text-sm mb-2 flex items-center gap-2">
                  <ShieldCheck size={18} /> Payment & Items
                </h4>
                <p className="text-xs text-gray-600">
                  Payment Method: <strong className="text-gray-800">{foundOrder.paymentMethod}</strong>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Total Items: <strong className="text-gray-800">{foundOrder.items?.length} items</strong>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Total Paid: <strong className="text-emerald-700 text-sm font-bold">${foundOrder.totalAmount?.toFixed(2)}</strong>
                </p>
              </div>
            </div>
          </div>
        ) : searched ? (
          <div className="bg-white rounded-3xl shadow-sm border border-[#ead8cc] p-10 text-center">
            <Package size={50} className="mx-auto text-gray-400 mb-3" />
            <h3 className="text-xl font-bold text-[#11231e]">Order Not Found</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-md mx-auto">
              We couldn't find an order with reference "{searchId}". Please check the ID or check your profile for recent orders.
            </p>
            <Link to="/user">
              <button className="mt-5 px-6 py-2.5 rounded-full bg-[#11231e] text-white text-xs font-semibold hover:bg-[#1b3a33] transition cursor-pointer">
                View My Profile Orders
              </button>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TrackOrder;

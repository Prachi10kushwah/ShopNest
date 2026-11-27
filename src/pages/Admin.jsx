import React, { useState, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  Boxes,
  ShoppingBag,
  Trash2,
  DollarSign,
  TrendingUp,
  ExternalLink,
  CheckCircle2,
  Lock,
  LogOut,
  Plus,
  ShieldCheck,
  Search,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";
import logo from "../components/Assets/logo.png";

const Admin = () => {
  const {
    products,
    orders,
    addProduct,
    deleteProduct,
    updateOrderStatus,
  } = useContext(ShopContext);

  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    () => sessionStorage.getItem("adminAuth") === "true"
  );
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });

  const [activeTab, setActiveTab] = useState("dashboard");
  const [productSearch, setProductSearch] = useState("");
  const [orderFilter, setOrderFilter] = useState("All");

  // Add Product Form State
  const [productForm, setProductForm] = useState({
    name: "",
    category: "mens",
    new_price: "",
    old_price: "",
    image: "",
  });

  // Sample image presets for quick testing
  const sampleImages = [
    { label: "Men's Style", url: products.find((p) => p.category === "mens")?.image },
    { label: "Women's Style", url: products.find((p) => p.category === "womens")?.image },
    { label: "Kids' Style", url: products.find((p) => p.category === "kids")?.image },
    { label: "Watch", url: products.find((p) => p.category === "watches")?.image },
    { label: "Bag", url: products.find((p) => p.category === "bags")?.image },
  ];

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (
      adminCredentials.email.trim().toLowerCase() === "admin@shopnest.com" &&
      adminCredentials.password === "admin123"
    ) {
      sessionStorage.setItem("adminAuth", "true");
      setIsAdminLoggedIn(true);
      toast.success("Welcome to ShopNest Administrator Portal!");
    } else {
      toast.error("Invalid Admin credentials! Use admin@shopnest.com / admin123");
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAdminLoggedIn(false);
    toast.success("Admin signed out");
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      toast.error("Please enter product title");
      return;
    }
    if (!productForm.new_price || Number(productForm.new_price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    const finalImage = productForm.image.trim() || sampleImages[0].url;

    addProduct({
      name: productForm.name,
      category: productForm.category,
      new_price: productForm.new_price,
      old_price: productForm.old_price,
      image: finalImage,
    });

    setProductForm({
      name: "",
      category: "mens",
      new_price: "",
      old_price: "",
      image: "",
    });
    setActiveTab("products");
  };

  // Metrics
  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const pendingOrders = orders.filter(
    (o) => o.status !== "Delivered" && o.status !== "Cancelled"
  ).length;

  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

  // Filtered Products
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  // Filtered Orders
  const filteredOrders =
    orderFilter === "All"
      ? orders
      : orders.filter((o) => o.status === orderFilter);

  // ==========================================
  // VIEW 1: SECURE ADMIN LOGIN SCREEN
  // ==========================================
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#11231e] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF6F3] border border-[#d8c8bf] flex items-center justify-center mx-auto mb-4">
              <img src={logo} alt="ShopNest" className="w-10 h-10 rounded-full" />
            </div>

            <h1 className="text-2xl font-bold font-['Poppins'] text-[#11231e]">
              ShopNest Admin Portal
            </h1>
            <p className="text-gray-500 text-xs mt-1">
              Restricted management access for authorized staff only.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Admin Email
              </label>
              <input
                type="email"
                placeholder="admin@shopnest.com"
                value={adminCredentials.email}
                onChange={(e) =>
                  setAdminCredentials({ ...adminCredentials, email: e.target.value })
                }
                className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none text-sm focus:border-[#11231e]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Secret Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={adminCredentials.password}
                onChange={(e) =>
                  setAdminCredentials({ ...adminCredentials, password: e.target.value })
                }
                className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none text-sm focus:border-[#11231e]"
              />
            </div>

            {/* Quick Demo Credentials Hint */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
              <p className="font-semibold flex items-center gap-1">
                <ShieldCheck size={14} /> Demo Admin Credentials:
              </p>
              <p className="mt-0.5">
                Email: <code className="font-mono font-bold">admin@shopnest.com</code>
              </p>
              <p>
                Password: <code className="font-mono font-bold">admin123</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#11231e] text-white font-semibold text-sm hover:bg-[#1b3a33] transition shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock size={16} /> Enter Admin Console
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-xs text-gray-500 hover:text-[#11231e] transition underline"
            >
              ← Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: DEDICATED ADMIN DASHBOARD (SIDEBAR + CONTENT)
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* ----------------- LEFT ADMIN SIDEBAR ----------------- */}
      <aside className="w-full md:w-64 bg-[#11231e] text-white flex flex-col justify-between flex-shrink-0 p-5 shadow-xl">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-white/10">
            <img src={logo} alt="ShopNest" className="w-10 h-10 rounded-full" />
            <div>
              <h2 className="font-bold font-['Poppins'] text-lg leading-tight">ShopNest</h2>
              <span className="text-[10px] tracking-widest uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-semibold">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer text-left ${
                activeTab === "dashboard"
                  ? "bg-white/15 text-white font-semibold"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <LayoutDashboard size={18} /> Overview
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer text-left ${
                activeTab === "products"
                  ? "bg-white/15 text-white font-semibold"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Boxes size={18} /> Products
              </div>
              <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("add")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer text-left ${
                activeTab === "add"
                  ? "bg-white/15 text-white font-semibold"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <PackagePlus size={18} /> Add New Item
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer text-left ${
                activeTab === "orders"
                  ? "bg-white/15 text-white font-semibold"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} /> Orders
              </div>
              {pendingOrders > 0 && (
                <span className="text-xs font-bold bg-amber-500 text-[#11231e] px-2 py-0.5 rounded-full">
                  {pendingOrders}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs text-gray-300 hover:bg-white/10 hover:text-white transition"
          >
            <span>View Live Storefront</span>
            <ExternalLink size={14} />
          </Link>

          <button
            onClick={handleAdminLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-300 hover:bg-red-500/20 hover:text-red-200 transition cursor-pointer"
          >
            <LogOut size={16} /> Logout Admin
          </button>
        </div>
      </aside>

      {/* ----------------- MAIN ADMIN WORKSPACE ----------------- */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="font-bold text-gray-800 text-sm sm:text-base capitalize">
              {activeTab === "dashboard"
                ? "Dashboard Overview"
                : activeTab === "products"
                ? "Product Inventory Management"
                : activeTab === "add"
                ? "Add Product to Catalog"
                : "Customer Orders Fulfillment"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-gray-800">Super Administrator</p>
              <p className="text-[11px] text-gray-400">admin@shopnest.com</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#11231e] text-white flex items-center justify-center font-bold text-sm">
              SA
            </div>
          </div>
        </header>

        {/* Body Content Container */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
                  <div className="flex justify-between items-center text-gray-500 text-xs font-semibold uppercase">
                    <span>Total Revenue</span>
                    <DollarSign size={18} className="text-emerald-600" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                    ${totalRevenue.toFixed(2)}
                  </h3>
                  <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                    <TrendingUp size={12} /> {orders.length} orders recorded
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
                  <div className="flex justify-between items-center text-gray-500 text-xs font-semibold uppercase">
                    <span>Pending Fulfillment</span>
                    <ShoppingBag size={18} className="text-amber-500" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                    {pendingOrders}
                  </h3>
                  <p className="text-xs text-amber-600 mt-1">Orders awaiting dispatch</p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
                  <div className="flex justify-between items-center text-gray-500 text-xs font-semibold uppercase">
                    <span>Completed Orders</span>
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                    {deliveredOrders}
                  </h3>
                  <p className="text-xs text-emerald-600 mt-1">Successfully delivered</p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
                  <div className="flex justify-between items-center text-gray-500 text-xs font-semibold uppercase">
                    <span>Published Items</span>
                    <Boxes size={18} className="text-[#11231e]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                    {products.length}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Live in store catalog</p>
                </div>
              </div>

              {/* Recent Orders in Dashboard */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-bold text-gray-900 text-base">Recent Customer Orders</h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-semibold text-[#11231e] hover:underline"
                  >
                    View All →
                  </button>
                </div>

                {orders.length === 0 ? (
                  <p className="text-center py-8 text-gray-400 text-sm">
                    No orders placed yet. Place an order on the storefront to test live tracking!
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 text-xs uppercase text-gray-400">
                          <th className="pb-3">Order ID</th>
                          <th className="pb-3">Customer</th>
                          <th className="pb-3">Date</th>
                          <th className="pb-3">Total</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.orderId} className="hover:bg-gray-50">
                            <td className="py-3 font-mono font-bold text-[#11231e]">
                              {order.orderId}
                            </td>
                            <td className="py-3 text-gray-700">{order.customer?.name}</td>
                            <td className="py-3 text-xs text-gray-500">{order.orderDate}</td>
                            <td className="py-3 font-bold text-emerald-700">
                              ${order.totalAmount?.toFixed(2)}
                            </td>
                            <td className="py-3">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                                  order.status === "Delivered"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : order.status === "Cancelled"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS INVENTORY */}
          {activeTab === "products" && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-72">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search product name..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#11231e]"
                  />
                </div>

                <button
                  onClick={() => setActiveTab("add")}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#11231e] text-white text-xs font-semibold rounded-xl hover:bg-[#1b3a33] transition cursor-pointer"
                >
                  <Plus size={16} /> Add Product
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-xs uppercase text-gray-400">
                      <th className="pb-3">Product</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Price</th>
                      <th className="pb-3">Original Price</th>
                      <th className="pb-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-3 flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-12 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                          />
                          <span className="font-medium text-gray-900 max-w-xs truncate">
                            {item.name}
                          </span>
                        </td>

                        <td className="py-3 capitalize text-gray-600">{item.category}</td>
                        <td className="py-3 font-bold text-gray-900">${item.new_price}</td>
                        <td className="py-3 text-gray-400 line-through">
                          ${item.old_price || item.new_price}
                        </td>

                        <td className="py-3 text-center">
                          <button
                            onClick={() => deleteProduct(item.id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ADD PRODUCT */}
          {activeTab === "add" && (
            <div className="max-w-2xl bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Add Product to Store</h3>
              <p className="text-xs text-gray-500 mb-6">
                Fill in the details to publish a new product in the selected category.
              </p>

              <form onSubmit={handleAddProductSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Premium Silk Blend Shirt"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full h-11 border border-gray-300 rounded-xl px-4 text-sm outline-none focus:border-[#11231e]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                      Category *
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) =>
                        setProductForm({ ...productForm, category: e.target.value })
                      }
                      className="w-full h-11 border border-gray-300 rounded-xl px-3 text-sm outline-none bg-white focus:border-[#11231e] capitalize cursor-pointer"
                    >
                      <option value="mens">Men's</option>
                      <option value="womens">Women's</option>
                      <option value="kids">Kids'</option>
                      <option value="watches">Watches</option>
                      <option value="bags">Bags</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                      Sale Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="45.00"
                      value={productForm.new_price}
                      onChange={(e) =>
                        setProductForm({ ...productForm, new_price: e.target.value })
                      }
                      className="w-full h-11 border border-gray-300 rounded-xl px-4 text-sm outline-none focus:border-[#11231e]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                      Original Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="60.00"
                      value={productForm.old_price}
                      onChange={(e) =>
                        setProductForm({ ...productForm, old_price: e.target.value })
                      }
                      className="w-full h-11 border border-gray-300 rounded-xl px-4 text-sm outline-none focus:border-[#11231e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Image Source (URL or click a preset below)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full h-11 border border-gray-300 rounded-xl px-4 text-sm outline-none focus:border-[#11231e]"
                  />

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs text-gray-400">Presets:</span>
                    {sampleImages.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setProductForm({ ...productForm, image: s.url })}
                        className="text-xs bg-gray-100 hover:bg-[#11231e] hover:text-white px-2.5 py-1 rounded transition cursor-pointer"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {productForm.image && (
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
                    <img
                      src={productForm.image}
                      alt="Preview"
                      className="w-12 h-14 object-cover rounded-lg border border-gray-300"
                    />
                    <span className="text-xs text-gray-600">Product preview ready</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full h-12 mt-4 rounded-xl bg-[#11231e] text-white font-semibold hover:bg-[#1b3a33] transition cursor-pointer text-sm"
                >
                  Publish Product Now
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: ORDERS FULFILLMENT */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="font-bold text-gray-900 text-base">Customer Orders Fulfillment</h3>

                {/* Status Filter */}
                <div className="flex items-center gap-2">
                  <Filter size={14} className="text-gray-400" />
                  <select
                    value={orderFilter}
                    onChange={(e) => setOrderFilter(e.target.value)}
                    className="h-9 px-3 rounded-lg border border-gray-200 text-xs font-semibold outline-none cursor-pointer bg-white"
                  >
                    <option value="All">All Statuses ({orders.length})</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <p className="text-center py-10 text-gray-400 text-sm">
                  No orders found for filter: {orderFilter}.
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((ord) => (
                    <div
                      key={ord.orderId}
                      className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm text-gray-900">
                            {ord.orderId}
                          </span>
                          <span className="text-xs text-gray-400">{ord.orderDate}</span>
                        </div>

                        <p className="text-sm font-medium text-gray-800 mt-1">
                          {ord.customer?.name} ({ord.customer?.phone})
                        </p>
                        <p className="text-xs text-gray-500">
                          {ord.customer?.address}, {ord.customer?.city}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {ord.items?.length} items • {ord.paymentMethod} •{" "}
                          <strong className="text-emerald-700">
                            ${ord.totalAmount?.toFixed(2)}
                          </strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-500">Update Status:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.orderId, e.target.value)}
                          className={`h-9 px-3 rounded-lg border text-xs font-semibold outline-none cursor-pointer ${
                            ord.status === "Delivered"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : ord.status === "Cancelled"
                              ? "bg-red-50 text-red-700 border-red-300"
                              : "bg-blue-50 text-blue-800 border-blue-300"
                          }`}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;

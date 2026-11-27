import React, { createContext, useState, useEffect } from "react";
import all_product from "../components/Assets/all_product";
import toast from "react-hot-toast";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  all_product.forEach((product) => {
    cart[product.id] = 0;
  });
  return cart;
};

const getDefaultWishlist = () => {
  let wishlist = {};
  all_product.forEach((product) => {
    wishlist[product.id] = false;
  });
  return wishlist;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : getDefaultCart();
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlistItems");
    return savedWishlist ? JSON.parse(savedWishlist) : getDefaultWishlist();
  });

  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("all");

  // Promo code / Coupon state
  const [coupon, setCoupon] = useState(() => {
    const savedCoupon = localStorage.getItem("appliedCoupon");
    return savedCoupon ? JSON.parse(savedCoupon) : null;
  });

  // Orders list state
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("shopnestOrders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem("appliedCoupon", JSON.stringify(coupon));
    } else {
      localStorage.removeItem("appliedCoupon");
    }
  }, [coupon]);

  useEffect(() => {
    localStorage.setItem("shopnestOrders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: 0,
    }));
  };

  const toggleWishlist = (itemId) => {
    setWishlistItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const increaseQuantity = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (itemId) => {
    if (cartItems[itemId] > 1) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - 1,
      }));
    } else {
      removeFromCart(itemId);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let product = all_product.find(
          (product) => product.id === Number(item)
        );
        if (product) {
          totalAmount += product.new_price * cartItems[item];
        }
      }
    }
    return Number(totalAmount.toFixed(2));
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      toast.error("Please enter a coupon code");
      return false;
    }

    if (cleanCode === "WELCOME15") {
      setCoupon({ code: "WELCOME15", discountPercent: 15 });
      toast.success("Coupon WELCOME15 applied! You got 15% OFF.");
      return true;
    } else if (cleanCode === "SUPER20") {
      setCoupon({ code: "SUPER20", discountPercent: 20 });
      toast.success("Coupon SUPER20 applied! You got 20% OFF.");
      return true;
    } else {
      toast.error("Invalid coupon code! Try 'WELCOME15'");
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    toast("Coupon removed", { icon: "ℹ️" });
  };

  const getDiscountAmount = () => {
    if (!coupon) return 0;
    const subtotal = getTotalCartAmount();
    return Number(((subtotal * coupon.discountPercent) / 100).toFixed(2));
  };

  const getFinalTotalAmount = () => {
    const subtotal = getTotalCartAmount();
    const discount = getDiscountAmount();
    return Math.max(0, Number((subtotal - discount).toFixed(2)));
  };

  const clearCart = () => {
    setCartItems(getDefaultCart());
    setCoupon(null);
  };

  // Place order function
  const placeOrder = (customerDetails) => {
    const subtotal = getTotalCartAmount();
    const discount = getDiscountAmount();
    const total = getFinalTotalAmount();

    // Collect cart products
    const items = [];
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const prod = all_product.find((p) => p.id === Number(item));
        if (prod) {
          items.push({
            id: prod.id,
            name: prod.name,
            image: prod.image,
            price: prod.new_price,
            quantity: cartItems[item],
            total: Number((prod.new_price * cartItems[item]).toFixed(2)),
          });
        }
      }
    }

    const newOrder = {
      orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      orderDate: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      customer: customerDetails,
      items: items,
      subtotal: subtotal,
      discount: discount,
      couponCode: coupon?.code || null,
      totalAmount: total,
      paymentMethod: customerDetails.paymentMethod || "Cash on Delivery",
      status: "Confirmed",
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === orderId ? { ...o, status: "Cancelled" } : o
      )
    );
    toast.success("Order marked as cancelled");
  };

  const contextvalue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    wishlistItems,
    toggleWishlist,
    search,
    setSearch,
    sortOption,
    setSortOption,
    increaseQuantity,
    decreaseQuantity,
    getTotalCartAmount,
    coupon,
    applyCoupon,
    removeCoupon,
    getDiscountAmount,
    getFinalTotalAmount,
    clearCart,
    orders,
    placeOrder,
    cancelOrder,
  };

  return (
    <ShopContext.Provider value={contextvalue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

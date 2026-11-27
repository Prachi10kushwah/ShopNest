import React, { useState, useEffect, useCallback } from "react";

/**
 * FlyingArcManager
 * Implements the 12 Principles of Animation: ARCS (Moving in Arcs)
 *
 * When a user adds any product to the cart (from Product Cards or Product Display),
 * this component intercepts the event, calculates the dynamic parabolic arc trajectory
 * between the source element and the Navbar shopping cart, and launches an animated
 * product clone that follows a curved physical arc with rotation and momentum.
 */
const FlyingArcManager = () => {
  const [flyingItems, setFlyingItems] = useState([]);
  const [impactRipples, setImpactRipples] = useState([]);

  const handleProductArc = useCallback((event) => {
    const { image, name, startX, startY } = event.detail || {};
    if (!image) return;

    // 1. Locate the Shopping Cart icon in Navbar
    const cartEl =
      document.getElementById("nav-cart-btn") ||
      document.querySelector('a[href="/cart"]');

    let targetX = window.innerWidth - 60;
    let targetY = 32;

    if (cartEl) {
      const rect = cartEl.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
    }

    // 2. Compute 2D Vector & Parabolic Apex
    const originX = startX ?? window.innerWidth / 2;
    const originY = startY ?? window.innerHeight / 2;
    const dx = targetX - originX;
    const dy = targetY - originY;

    // The apex elevates upward in an energetic parabolic arc curve:
    // Natural physics: higher horizontal distance = higher arc peak
    const apexOffset = Math.min(-140, -Math.abs(dx) * 0.22 - 80);

    const flightId = Date.now() + Math.random();

    const newFlight = {
      id: flightId,
      image,
      name: name || "Product",
      startX: originX,
      startY: originY,
      dx,
      dy,
      apexY: apexOffset,
      targetX,
      targetY,
    };

    setFlyingItems((prev) => [...prev, newFlight]);

    // 3. Parabolic flight completes after 850ms
    setTimeout(() => {
      // Trigger Cart bounce and impact shockwave ring on Navbar cart
      window.dispatchEvent(new CustomEvent("cart-burst-event"));

      // Trigger landing impact ripple
      setImpactRipples((prev) => [
        ...prev,
        { id: flightId, x: targetX, y: targetY },
      ]);

      // Remove ripple after animation finishes
      setTimeout(() => {
        setImpactRipples((prev) => prev.filter((r) => r.id !== flightId));
      }, 700);

      // Remove flying clone
      setFlyingItems((prev) => prev.filter((item) => item.id !== flightId));
    }, 850);
  }, []);

  useEffect(() => {
    window.addEventListener("product-arc-event", handleProductArc);
    return () => {
      window.removeEventListener("product-arc-event", handleProductArc);
    };
  }, [handleProductArc]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Dynamic Flying Product Clones along Parabolic Arc */}
      {flyingItems.map((item) => (
        <div
          key={item.id}
          className="absolute transform-gpu"
          style={{
            left: `${item.startX}px`,
            top: `${item.startY}px`,
            "--dx": `${item.dx}px`,
            "--dy": `${item.dy}px`,
            "--apex-y": `${item.apexY}px`,
          }}
        >
          {/* Main Flying Product Thumbnail */}
          <div className="relative -top-8 -left-8 w-16 h-16 rounded-2xl bg-white border-2 border-emerald-500 shadow-2xl p-1 animate-arc-fly overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Glossy sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-transparent to-white/40 pointer-events-none rounded-xl" />
          </div>

          {/* Stardust particle 1 trailing on the arc */}
          <div
            className="absolute -top-3 -left-3 text-lg animate-arc-fly select-none pointer-events-none"
            style={{ animationDelay: "70ms", opacity: 0.85 }}
          >
            ✨
          </div>

          {/* Stardust particle 2 trailing on the arc */}
          <div
            className="absolute -top-1 -left-1 text-sm animate-arc-fly select-none pointer-events-none"
            style={{ animationDelay: "140ms", opacity: 0.7 }}
          >
            💫
          </div>

          {/* Stardust particle 3 trailing on the arc */}
          <div
            className="absolute -top-5 -left-5 text-xs animate-arc-fly select-none pointer-events-none"
            style={{ animationDelay: "210ms", opacity: 0.55 }}
          >
            ⭐
          </div>
        </div>
      ))}

      {/* Cart Collision Impact Shockwave Rings */}
      {impactRipples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
        >
          {/* Primary emerald ring */}
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500 animate-cart-impact" />
          {/* Secondary gold ring */}
          <div
            className="absolute inset-0 w-12 h-12 rounded-full border-2 border-amber-400 animate-cart-impact"
            style={{ animationDelay: "80ms" }}
          />
        </div>
      ))}
    </div>
  );
};

export default FlyingArcManager;

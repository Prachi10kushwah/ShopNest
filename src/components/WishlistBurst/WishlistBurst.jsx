import React from "react";

const WishlistBurst = ({ active }) => {
  if (!active) return null;

  const particles = [
    { icon: "💖", tx: "38px", ty: "0px", delay: "0ms" },
    { icon: "✨", tx: "28px", ty: "28px", delay: "30ms" },
    { icon: "❤️", tx: "0px", ty: "38px", delay: "60ms" },
    { icon: "🌟", tx: "-28px", ty: "28px", delay: "40ms" },
    { icon: "💕", tx: "-38px", ty: "0px", delay: "20ms" },
    { icon: "✨", tx: "-28px", ty: "-28px", delay: "50ms" },
    { icon: "⭐", tx: "0px", ty: "-40px", delay: "10ms" },
    { icon: "🎉", tx: "28px", ty: "-28px", delay: "30ms" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
      {/* 1. Dramatic Shockwave Ring */}
      <div className="absolute w-8 h-8 rounded-full border-4 border-red-500 animate-shockwave" />

      {/* 2. Secondary Pink Glow Ring */}
      <div
        className="absolute w-8 h-8 rounded-full border-2 border-pink-400 animate-shockwave"
        style={{ animationDelay: "100ms" }}
      />

      {/* 3. Big Floating Ascending Heart */}
      <div className="absolute text-2xl sm:text-3xl animate-float-heart drop-shadow-md">
        💖
      </div>

      {/* 4. Radial Particle Explosion (360 degrees) */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute text-sm select-none animate-particle"
          style={{
            "--tx": p.tx,
            "--ty": p.ty,
            animationDelay: p.delay,
          }}
        >
          {p.icon}
        </span>
      ))}
    </div>
  );
};

export default WishlistBurst;

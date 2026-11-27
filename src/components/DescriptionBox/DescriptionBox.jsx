import React, { useState } from "react";
import { Star, MessageSquarePlus } from "lucide-react";
import toast from "react-hot-toast";

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState("description");

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Aman Sharma",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely in love with the quality! Fabric is super soft, fits true to size, and looks luxurious.",
    },
    {
      id: 2,
      name: "Sneha Patel",
      rating: 4,
      date: "1 week ago",
      comment: "Great packaging and fast shipping. The color matches the picture accurately.",
    },
    {
      id: 3,
      name: "Rohan Verma",
      rating: 5,
      date: "2 weeks ago",
      comment: "Premium finish! Worth every rupee. Will definitely shop again from ShopNest.",
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      toast.error("Please fill in your name and review comment!");
      return;
    }

    const reviewToAdd = {
      id: Date.now(),
      name: newReview.name,
      rating: Number(newReview.rating),
      date: "Just now",
      comment: newReview.comment,
    };

    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ name: "", rating: 5, comment: "" });
    toast.success("Thank you! Your review has been submitted.");
  };

  return (
    <div className="max-w-7xl mx-auto my-14 px-6">
      {/* Navigator */}
      <div className="flex border-b border-[#d8c8bf]">
        <button
          type="button"
          onClick={() => setActiveTab("description")}
          className={`px-8 sm:px-10 py-4 font-semibold rounded-t-xl transition cursor-pointer text-base sm:text-lg ${
            activeTab === "description"
              ? "bg-[#11231e] text-white"
              : "bg-[#f9f3ef] text-[#666] hover:bg-white"
          }`}
        >
          Description
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`px-8 sm:px-10 py-4 font-semibold rounded-t-xl ml-2 transition cursor-pointer text-base sm:text-lg ${
            activeTab === "reviews"
              ? "bg-[#11231e] text-white"
              : "bg-[#f9f3ef] text-[#666] hover:bg-white"
          }`}
        >
          Reviews ({reviews.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="border border-[#d8c8bf] border-t-0 bg-white rounded-b-xl rounded-tr-xl p-6 sm:p-10 shadow-sm">
        {activeTab === "description" ? (
          <div className="text-[#555] leading-8 text-[16px] sm:text-[17px] space-y-6">
            <p>
              Welcome to ShopNest’s signature collection. Designed with a perfect fusion of aesthetic charm and everyday comfort, this piece represents authentic craftsmanship. Each item undergoes strict quality checks to guarantee durability, colourfastness, and an exquisite finish.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
              <div className="bg-[#FAF6F3] p-5 rounded-xl">
                <h4 className="font-semibold text-[#11231e] text-lg mb-2">✨ Premium Material</h4>
                <p className="text-sm text-gray-600 leading-6">Breathable, skin-friendly, and durable fabric engineered for all-day ease.</p>
              </div>

              <div className="bg-[#FAF6F3] p-5 rounded-xl">
                <h4 className="font-semibold text-[#11231e] text-lg mb-2">🌿 Sustainable Craft</h4>
                <p className="text-sm text-gray-600 leading-6">Ethically sourced and responsibly produced with eco-conscious finishing.</p>
              </div>

              <div className="bg-[#FAF6F3] p-5 rounded-xl">
                <h4 className="font-semibold text-[#11231e] text-lg mb-2">🧼 Easy Care</h4>
                <p className="text-sm text-gray-600 leading-6">Machine washable, color resistant, and retains texture wash after wash.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Reviews Summary */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-[#11231e]">Customer Reviews</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={20} fill="#FBBF24" color="#FBBF24" />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">4.8 out of 5 based on {reviews.length} reviews</span>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-xl bg-[#FAF6F3] border border-[#ead8cc]">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-[#11231e] text-lg">{rev.name}</h4>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={16}
                            fill={s <= rev.rating ? "#FBBF24" : "none"}
                            color={s <= rev.rating ? "#FBBF24" : "#D1D5DB"}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{rev.date}</span>
                  </div>
                  <p className="mt-3 text-gray-700 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Write a Review */}
            <form onSubmit={handleReviewSubmit} className="pt-6 border-t border-gray-200 space-y-4">
              <h4 className="text-xl font-bold text-[#11231e] flex items-center gap-2">
                <MessageSquarePlus size={22} /> Add Your Review
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="h-12 px-4 rounded-xl border border-gray-300 outline-none focus:border-[#11231e]"
                />

                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  className="h-12 px-4 rounded-xl border border-gray-300 outline-none focus:border-[#11231e] bg-white cursor-pointer"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Excellent)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars - Good)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars - Average)</option>
                  <option value={2}>⭐⭐ (2 Stars - Below Average)</option>
                  <option value={1}>⭐ (1 Star - Poor)</option>
                </select>
              </div>

              <textarea
                placeholder="Share your thoughts about this product..."
                rows={3}
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full p-4 rounded-xl border border-gray-300 outline-none focus:border-[#11231e] resize-none"
              />

              <button
                type="submit"
                className="px-8 py-3 bg-[#11231e] text-white rounded-full font-medium hover:bg-[#1b3a33] transition cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;

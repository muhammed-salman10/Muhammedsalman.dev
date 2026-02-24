"use client";

import React, { useState } from "react";

export default function FormSubmission() {
  /* ===============================
     STATE
  =============================== */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ===============================
     HANDLERS
  =============================== */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // 🔗 Connect API / EmailJS later
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name */}
      <div>
        <label className="block text-secondary font-secondary text-sm mb-2">
          Your Name
        </label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="
            w-full bg-transparent font-secondary
            border-b border-gray-400/50
            focus:border-[#000080] outline-none
            text-primary py-2 transition text-[16px]
          "
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-secondary font-secondary text-sm mb-2">
          Your Email
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="
            w-full bg-transparent font-secondary
            border-b border-gray-400/50
            focus:border-[#000080] outline-none
            text-primary py-2 transition text-[16px]
          "
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-secondary font-secondary text-sm mb-2">
          Share your thoughts
        </label>
        <textarea
          name="message"
          rows="4"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message..."
          className="
            w-full bg-transparent font-secondary
            border-b border-gray-400/50
            focus:border-[#000080] outline-none
            text-primary py-2 transition resize-none text-[16px]
          "
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full py-3 mt-6
          bg-secondary font-secondary text-[16px] text-white
          rounded-xl
          hover:scale-[1.02]
          active:scale-[0.98]
          transition duration-300
          shadow-lg
          disabled:opacity-60
        "
      >
        {loading ? "SENDING..." : "SHARE YOUR FEEDBACK"}
      </button>

      {/* Success Message */}
      {success && (
        <p className="text-green-600 text-sm mt-4">
          ✅ Thanks! Your message has been sent.
        </p>
      )}
    </form>
  );
}
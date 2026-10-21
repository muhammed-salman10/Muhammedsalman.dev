"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function FormSubmission() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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
    setError("");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Please check your .env.local file.",
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        },
        {
          publicKey,
        },
      );

      setSuccess(true);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Sorry, your message could not be sent. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name */}
      <div>
        <label className="block text-[#000080] font-secondary text-sm mb-2">
          Your Name
        </label>

        <input
          type="text"
          name="name"
          required
          maxLength={100}
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="
            w-full bg-transparent font-secondary
            border-b border-gray-400/50
            focus:border-[#000080] outline-none
            text-gray-800 py-2 transition text-[16px]
          "
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-[#000080] font-secondary text-sm mb-2">
          Your Email
        </label>

        <input
          type="email"
          name="email"
          required
          maxLength={254}
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="
            w-full bg-transparent font-secondary
            border-b border-gray-400/50
            focus:border-[#000080] outline-none
            text-gray-800 py-2 transition text-[16px]
          "
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-[#000080] font-secondary text-sm mb-2">
          Share your thoughts
        </label>

        <textarea
          name="message"
          rows={3}
          required
          maxLength={5000}
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message..."
          className="
            w-full bg-transparent font-secondary
            border-b border-gray-400/50
            focus:border-[#000080] outline-none
            text-gray-800 py-2 transition resize-none text-[16px]
          "
        />
      </div>

      {/* Submit Button */}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="
    w-full py-3 mt-6
    bg-[#000080] font-secondary text-[16px] text-white
    rounded-xl
    hover:scale-[1.02]
    active:scale-[0.98]
    transition duration-300
    shadow-lg
    disabled:opacity-70
    disabled:cursor-not-allowed
    disabled:hover:scale-100
    flex items-center justify-center gap-3
  "
      >
        {loading && (
          <span
            className="
        inline-block
        w-5 h-5
        border-2 border-white/30
        border-t-white
        rounded-full
        animate-spin
        shrink-0
      "
            aria-hidden="true"
          />
        )}

        <span>{loading ? "SENDING..." : "SHARE YOUR FEEDBACK"}</span>
      </button>

      {/* Success Message */}
      {success && (
        <p role="status" className="text-green-600 text-sm mt-4">
          ✅ Thanks! Your message has been sent.
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p role="alert" className="text-red-600 text-sm mt-4">
          ❌ {error}
        </p>
      )}
    </form>
  );
}

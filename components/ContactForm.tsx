"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to send message");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
      {/* Status Messages */}
      {status === "success" && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
          <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900">Success!</h3>
            <p className="text-green-800 text-sm">{message}</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Error</h3>
            <p className="text-red-800 text-sm">{message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-slate-700"
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            value={formData.subject}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="What is this about?"
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Your message here..."
          />
          <p className="mt-2 text-sm text-slate-500">
            Minimum 10 characters required
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center"
        >
          <Send className="h-5 w-5 mr-2" />
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

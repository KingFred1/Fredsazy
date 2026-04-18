"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Successfully subscribed to our newsletter!");
        setEmail("");

        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 3000);
      } else if (data.status === "already_subscribed") {
        setStatus("success");
        setMessage("You're already subscribed!");
        setEmail("");

        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 3000);
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to subscribe");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-indigo-600 rounded-lg p-6 sm:p-8">
      <div className="max-w-md mx-auto">
        <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
        <p className="text-indigo-100 mb-6">
          Subscribe to our newsletter for the latest tech insights and updates.
        </p>

        {status === "success" && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm">
            {message}
          </div>
        )}

        {status === "error" && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition disabled:opacity-50"
          >
            {status === "loading" ? "..." : <Mail className="h-5 w-5" />}
          </button>
        </form>
      </div>
    </div>
  );
}

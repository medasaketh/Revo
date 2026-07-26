"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Nav";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for the login link.");
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex justify-center items-center pt-32 px-4">
        <div className="w-full max-w-md bg-[#121212] border border-gray-800 rounded-2xl p-8">
          
          <h1 className="text-2xl font-semibold mb-2">
            Welcome back
          </h1>

          <p className="text-gray-400 text-sm mb-8">
            Log in to continue your personal style journey.
          </p>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-6 px-4 py-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-white"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? "Sending link..." : "Send login link"}
          </button>

          <p className="text-xs text-gray-500 mt-6 text-center">
            We’ll never share your email.
          </p>
        </div>
      </div>
    </div>
  );
}

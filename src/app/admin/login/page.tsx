"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
      setLoading(false);
    } else {
      // Use window.location instead of router.push to force a hard reload
      // This prevents the UI from hanging if middleware intercepts the request
      window.location.href = "/admin";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-charcoal mb-2 tracking-wide">Akpaka.NG</h1>
          <p className="text-sm text-charcoal/60 uppercase tracking-widest">Admin Portal</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-charcoal bg-transparent"
              placeholder="admin@akpaka.ng"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-charcoal bg-transparent"
              placeholder="••••••••"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-charcoal hover:bg-charcoal/90 text-white py-6 rounded-lg font-medium tracking-wide transition-all"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

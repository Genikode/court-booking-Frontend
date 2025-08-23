"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/auth";

export default function LoginScreen() {
  const route = useRouter();
  const [email, setEmail] = useState("jimmy12@gmail.com");
  const [password, setPassword] = useState("admin12345");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      setLoading(true);
      await login({ email, password });
      route.push("/dashboard");
    } catch (e: any) {
      setErr(e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-5xl">
        {/* Logo */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="rounded">
            <Image src="/logo1.png" alt="Creek Sports Club Logo" width={280} height={280}/>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Sign In to Creek Sports Club
          </h2>

          {err && (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
              {err}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="text-red-500">*</span> Email:
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="text-red-500">*</span> Password:
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md pr-10 focus:outline-none focus:ring focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  👁️
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-white border px-6 py-2 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

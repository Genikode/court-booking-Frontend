"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";

export default function DeleteUser() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setSuccess(null);
    try {
      setLoading(true);
   const res = await fetch('https://creek-sport.ddns.net/users/delete-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':"court_secret"
        },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
      setErr('Failed to delete user. Please check your credentials.');
        return;
      }

      setSuccess('User deleted successfully.');
      router.push("/login");
      router.refresh();
    } catch (e: any) {
      setErr(e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-5xl">
        {/* Logo */}
        <div className="w-full md:w-1/2 flex justify-center">
       <Image
        src="/logo2.png"
        alt="Creek Sports Club Logo"
        width={280}
        height={280}
        className="rounded block dark:hidden"
      />

      {/* Dark mode logo */}
      <Image
        src="/logo3.png"
        alt="Creek Sports Club Logo Dark"
        width={280}
        height={280}
        className="rounded hidden dark:block"
      />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Delete User to Creek Sports Club
          </h2>

          {err && (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 dark:bg-red-900/30 dark:border-red-700 p-3 text-sm text-red-700 dark:text-red-400">
              {err}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleDelete}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <span className="text-red-500">*</span> Email:
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <span className="text-red-500">*</span> Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-400 pr-10 focus:outline-none focus:ring focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60 transition"
            >
              {loading ? "Deleting..." : "Delete User"}
            </button>
         
          </form>
        </div>
      </div>
    </div>
  );
}

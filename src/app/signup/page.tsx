"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
type FormState = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

export default function SignupPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPwd, setShowPwd] = useState(false);
    const router = useRouter();
  const validate = (): boolean => {
    const e: Errors = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      e.name = "Please enter your full name.";
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) {
      e.email = "Please enter a valid email address.";
    }

    if (!form.password || form.password.length < 8) {
      e.password = "Password must be at least 8 characters.";
    }

    // Basic E.164-like check (allows + and digits, 10-15 digits)
    const phoneOk = /^\+?[1-9]\d{7,14}$/.test(form.phoneNumber.replace(/\s|-/g, ""));
    if (!phoneOk) {
      e.phoneNumber = "Enter a valid phone number (e.g., +923001234567).";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerErr(null);
    setSuccess(null);

    if (!validate()) return;

    setLoading(true);
    try {
      // roleId must be "2" (string) and not editable in UI
      await api.post("/users/create-user", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        phoneNumber: form.phoneNumber.trim(),
        roleId: "2",
      });

      setSuccess("Account created successfully!");
      setForm({ name: "", email: "", password: "", phoneNumber: "" });
      router.push("/login");
      setErrors({});
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong while creating your account.";
      setServerErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Brand / Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white shadow-lg mb-3">
            <User className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="text-slate-500 mt-1">Join and start managing your courts.</p>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg p-6">
          {/* Server Error */}
          {serverErr && (
            <div className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 text-red-700 px-3 py-2">
              <AlertCircle className="w-4 h-4 mt-[2px]" />
              <span className="text-sm">{serverErr}</span>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-4 flex items-start gap-2 rounded-lg bg-emerald-50 text-emerald-700 px-3 py-2">
              <CheckCircle2 className="w-4 h-4 mt-[2px]" />
              <span className="text-sm">{success}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm text-slate-600 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g., Alex Johnson"
                  className={`w-full pl-9 pr-3 py-2 rounded-lg border ${
                    errors.name ? "border-red-400" : "border-slate-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm`}
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-slate-600 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className={`w-full pl-9 pr-3 py-2 rounded-lg border ${
                    errors.email ? "border-red-400" : "border-slate-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-slate-600 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  value={form.phoneNumber}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phoneNumber: e.target.value }))
                  }
                  placeholder="+923001234567"
                  className={`w-full pl-9 pr-3 py-2 rounded-lg border ${
                    errors.phoneNumber ? "border-red-400" : "border-slate-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-slate-600 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPwd ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className={`w-full pl-9 pr-10 py-2 rounded-lg border ${
                    errors.password ? "border-red-400" : "border-slate-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Subtext */}
            <p className="text-xs text-slate-500 text-center">
              By continuing, you agree to our Terms & Privacy Policy.
            </p>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-xs text-slate-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

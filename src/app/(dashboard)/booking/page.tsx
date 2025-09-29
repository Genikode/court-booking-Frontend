"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import {
  Search as SearchIcon,
  Clock,
  CalendarDays,
  Image as ImageIcon,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { getUser } from "@/lib/auth";

/* ---------------- Types ---------------- */
type Booking = {
  bookingId: number;
  bookingDate: string;
  status: string;
  isPaid: 0 | 1;
  courtName: string;
  courtType: string;
  startTime: string;
  endTime: string;
  customerPhone: string;
  paymentProofUrl?: string | null;
};

type MyBookingsResponse = {
  data: {
    bookings: Booking[];
  };
};

/* ---------------- Helpers ---------------- */
function formatTime12Hour(timeStr: string) {
  if (!timeStr) return "";
  const [hour, minute] = timeStr.split(":");
  const d = new Date();
  d.setHours(Number(hour));
  d.setMinutes(Number(minute));
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
}
function formatDate(d: string) {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function Pill({
  children,
  color = "blue",
  className = "",
}: {
  children: React.ReactNode;
  color?: "blue" | "green" | "yellow" | "red" | "gray";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-2.5 py-1 shrink-0 whitespace-nowrap leading-none border text-[11px] font-medium";
  const styles =
    color === "green"
      ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800"
      : color === "yellow"
      ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800"
      : color === "red"
      ? "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-200 border-red-200 dark:border-red-800"
      : color === "gray"
      ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
      : "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-800";
  return <span className={`${base} ${styles} ${className}`}>{children}</span>;
}

/* ---------------- Page ---------------- */
export default function MyBookingsPage() {
  const [phone, setPhone] = useState<string>("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [uploadingFor, setUploadingFor] = useState<number | null>(null);
  const [pendingProof, setPendingProof] = useState<
    Record<number, { url: string; name: string }>
  >({});
  const [submittingFor, setSubmittingFor] = useState<number | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchBookings = async () => {
    const currentUser = getUser();
    const phoneNumber = currentUser?.phoneNumber;
    setLoading(true);
    try {
      const res = await api.get<MyBookingsResponse>(
        `/court-slots/get-my-bookings?phoneNumber=${encodeURIComponent(phoneNumber)}`
      );
      setBookings(res.data?.bookings || []);
    } catch (e: any) {
      setErr(e?.message || "Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return bookings;
    return bookings.filter(
      (b) =>
        b.courtName.toLowerCase().includes(q) ||
        b.courtType.toLowerCase().includes(q) ||
        b.status.toLowerCase().includes(q)
    );
  }, [bookings, search]);

  const onFilePick = async (bookingId: number, file: File) => {
    setErr(null);
    if (!file) return;
    setUploadingFor(bookingId);
    try {
      const fd = new FormData();
      fd.append("payment_proof", file);
      const res = await api.put<{
        data: { url: string };
      }>("/upload-image", fd, {}, true);

      const signed = res?.data?.url || "";
      if (!signed) throw new Error("Upload did not return a signed URL");

      setPendingProof((m) => ({ ...m, [bookingId]: { url: signed, name: file.name } }));
    } catch (e: any) {
      setErr(e?.message || "Failed to upload payment proof");
    } finally {
      setUploadingFor(null);
    }
  };

  const submitPaymentProof = async (bookingId: number) => {
    const proof = pendingProof[bookingId];
    if (!proof?.url) return;
    setSubmittingFor(bookingId);
    setErr(null);
    try {
      await api.put("/customers/send-payment-proof", {
        bookingId: String(bookingId),
        paymentUrl: proof.url,
      });
      await fetchBookings();
      setPendingProof((m) => {
        const { [bookingId]: _, ...rest } = m;
        return rest;
      });
    } catch (e: any) {
      setErr(e?.response?.data?.message || e?.message || "Failed to submit payment proof");
    } finally {
      setSubmittingFor(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto text-[14px] text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-[13px] text-gray-600 dark:text-gray-400">
          View and manage your court bookings.
        </p>
      </div>

      {/* Phone + Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-2 w-full sm:w-[320px]">
          <input
            type="tel"
            placeholder="Your phone (e.g., +923001234567)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          />
          <button
            onClick={() => fetchBookings()}
            className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Load
          </button>
        </div>

        <div className="w-full sm:w-72 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Error */}
      {err && (
        <div className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-200 px-3 py-2">
          <AlertCircle className="w-4 h-4 mt-[2px]" />
          <span className="text-sm">{err}</span>
        </div>
      )}

      {/* List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-28 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm animate-pulse"
            />
          ))
        ) : filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-600 dark:text-gray-400">
            No bookings found.
          </div>
        ) : (
          filtered.map((b) => {
            const isBooked = b.status?.toLowerCase() === "booked";
            const canUpload = isBooked && b.isPaid === 0;

            return (
              <div
                key={b.bookingId}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-4"
              >
                {/* Top row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold text-[15px]">{b.courtName}</div>
                    <div className="text-[12px] text-gray-600 dark:text-gray-400">
                      {b.courtType}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {b.isPaid ? <Pill color="green">Paid</Pill> : <Pill color="yellow">Unpaid</Pill>}
                    {isBooked ? (
                      <Pill color="blue">Booked</Pill>
                    ) : (
                      <Pill color="gray" className="capitalize">
                        {b.status}
                      </Pill>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    {formatDate(b.bookingDate)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    {formatTime12Hour(b.startTime)} – {formatTime12Hour(b.endTime)}
                  </div>
                </div>

                {/* Proof row */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {b.paymentProofUrl ? (
                    <button
                      onClick={() => setPreviewUrl(b.paymentProofUrl!)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <ImageIcon className="w-4 h-4" />
                      View Payment Proof
                    </button>
                  ) : (
                    <Pill color="gray">No proof uploaded</Pill>
                  )}

                  <label
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer ${
                      canUpload ? "hover:bg-gray-50 dark:hover:bg-gray-700" : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Proof</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={!canUpload}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onFilePick(b.bookingId, file);
                        if (e.currentTarget) e.currentTarget.value = "";
                      }}
                    />
                  </label>

                  {pendingProof[b.bookingId]?.url && (
                    <>
                      <button
                        onClick={() => setPreviewUrl(pendingProof[b.bookingId].url)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                      >
                        <ImageIcon className="w-4 h-4" />
                        Preview Upload
                      </button>
                      <button
                        disabled={submittingFor === b.bookingId}
                        onClick={() => submitPaymentProof(b.bookingId)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 transition"
                      >
                        {submittingFor === b.bookingId ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              />
                            </svg>
                            Submitting…
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Submit Proof
                          </>
                        )}
                      </button>
                    </>
                  )}

                  {uploadingFor === b.bookingId && (
                    <span className="text-[13px] text-gray-600 dark:text-gray-400">
                      Uploading…
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Image preview modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="relative max-w-3xl w-auto max-h-[85vh] p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute -top-10 right-0 text-white hover:opacity-80"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={previewUrl}
              alt="Payment Proof"
              className="rounded-lg shadow-2xl max-h-[85vh] w-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

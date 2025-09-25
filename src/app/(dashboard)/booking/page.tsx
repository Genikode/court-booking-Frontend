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
  bookingDate: string; // ISO
  status: string;      // booked | cancelled | ...
  isPaid: 0 | 1;
  courtName: string;
  courtType: string;
  startTime: string;   // "HH:mm:ss"
  endTime: string;     // "HH:mm:ss"
  customerPhone: string;
  paymentProofUrl?: string | null; // if present, show "View Proof"
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
}: { children: React.ReactNode; color?: "blue" | "green" | "yellow" | "red" | "gray"; className?: string }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-2.5 py-1 shrink-0 whitespace-nowrap leading-none border text-[11px]";
  const styles =
    color === "green"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : color === "yellow"
      ? "bg-yellow-50 text-yellow-700 border-yellow-100"
      : color === "red"
      ? "bg-red-50 text-red-700 border-red-100"
      : color === "gray"
      ? "bg-gray-50 text-gray-700 border-gray-200"
      : "bg-blue-50 text-blue-700 border-blue-100";
  return <span className={`${base} ${styles} ${className}`}>{children}</span>;
}

/* ---------------- Page ---------------- */
export default function MyBookingsPage() {
  const [phone, setPhone] = useState<string>("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // proof upload state per bookingId
  const [uploadingFor, setUploadingFor] = useState<number | null>(null);
  const [pendingProof, setPendingProof] = useState<Record<number, { url: string; name: string }>>(
    {}
  );
  const [submittingFor, setSubmittingFor] = useState<number | null>(null);

  // image preview modal
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // prefill phone from localStorage `userData.phoneNumber` if available

  const fetchBookings = async () => {
  const currentUser = getUser();
  const phoneNumber = currentUser?.phoneNumber ;
    setLoading(true);
    try {
      const res = await api.get<MyBookingsResponse>(
        `/court-slots/get-my-bookings?phoneNumber=${encodeURIComponent(phoneNumber)}`
      );
      console.log(res);
      setBookings(res.data?.bookings || []);
    } catch (e: any) {
      setErr(e?.message || "Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // the field name MUST be "payment_proof" (as specified)
      fd.append("payment_proof", file);

      // Expecting: { data: { key, url, signedUrl } }
      const res = await api.put<{
        status: number;
        success: boolean;
        message: string;
        data: { key: string; url: string; signedUrl: string };
      }>("/upload-image", fd, {}, true);

      const signed = res?.data?.url || "";
      if (!signed) throw new Error("Upload did not return a signed URL");

      setPendingProof((m) => ({
        ...m,
        [bookingId]: { url: signed, name: file.name },
      }));
    } catch (e: any) {
      setErr(e?.message || "Failed to upload payment proof");
    } finally {
      setUploadingFor(null);
    }
  };

  // Attach proof to booking (adjust endpoint if yours differs)
  const submitPaymentProof = async (bookingId: number) => {
    const proof = pendingProof[bookingId];
    if (!proof?.url) return;

    setSubmittingFor(bookingId);
    setErr(null);
    try {
      // CHANGE PATH if your API uses a different endpoint
      await api.put("/customers/send-payment-proof", {
        bookingId: String(bookingId),
        paymentUrl: proof.url, // save SIGNED URL as requested
      });

      // refresh list and clear pending proof for this booking
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
<div className="p-4 sm:p-6 max-w-4xl mx-auto text-[14px] text-black">
  {/* Header */}
  <div className="mb-4">
    <h1 className="text-2xl font-semibold">My Bookings</h1>
    <p className="text-[13px]">View and manage your court bookings.</p>
  </div>

  {/* Phone + Search */}
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
    <div className="flex items-center gap-2 w-full sm:w-[320px]">
      <input
        type="tel"
        placeholder="Your phone (e.g., +923001234567)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-black"
      />
      <button
        onClick={() => fetchBookings()}
        className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Load
      </button>
    </div>

    <div className="w-full sm:w-72 relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/50" />
      <input
        type="text"
        placeholder="Search bookings..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-9 pr-3 py-2 border rounded-lg text-black"
      />
    </div>
  </div>

  {/* Error */}
  {err && (
    <div className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 text-red-700 px-3 py-2">
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
          className="h-28 bg-white rounded-2xl border border-slate-200 ring-1 ring-slate-100 shadow-sm animate-pulse"
        />
      ))
    ) : filtered.length === 0 ? (
      <div className="text-center py-10">No bookings found.</div>
    ) : (
      filtered.map((b) => {
        const isBooked = b.status?.toLowerCase() === "booked";
        const canUpload = isBooked && b.isPaid === 0;

        return (
          <div
            key={b.bookingId}
            className="bg-white rounded-2xl border border-slate-200 ring-1 ring-slate-100 shadow-sm p-3 text-black"
          >
            {/* Top row */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="font-semibold text-[15px] truncate">
                  {b.courtName}
                </div>
                <div className="text-[12px]">{b.courtType}</div>
              </div>
              <div className="flex items-center gap-2">
                {b.isPaid ? (
                  <Pill color="green">Paid</Pill>
                ) : (
                  <Pill color="yellow">Unpaid</Pill>
                )}
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
            <div className="mt-2 grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-4">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4 text-black/60" />
                <span className="text-[13px]">{formatDate(b.bookingDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-black/60" />
                <span className="text-[13px]">
                  {formatTime12Hour(b.startTime)} – {formatTime12Hour(b.endTime)}
                </span>
              </div>
            </div>

            {/* Proof row */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {b.paymentProofUrl ? (
                <button
                  onClick={() => setPreviewUrl(b.paymentProofUrl!)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border hover:bg-gray-50"
                >
                  <ImageIcon className="w-4 h-4" />
                  View Payment Proof
                </button>
              ) : (
                <Pill color="gray">No proof uploaded</Pill>
              )}

              <label
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer ${
                  canUpload ? "hover:bg-gray-50" : "opacity-50 cursor-not-allowed"
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
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border hover:bg-gray-50"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Preview upload
                  </button>
                  <button
                    disabled={submittingFor === b.bookingId}
                    onClick={() => submitPaymentProof(b.bookingId)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    {submittingFor === b.bookingId ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
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
                <span className="text-[13px]">Uploading…</span>
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
      className="fixed inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-50"
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

"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
  Eye,
  CheckCircle2,
  X,
  Search as SearchIcon,
  Ban,
} from "lucide-react";

/* ---------------- Types ---------------- */
type Booking = {
  bookingId: number;
  bookingDate: string; // ISO
  isPaid: 0 | 1;
  status: string; // "booked" | "cancelled" | ...
  courtName: string;
  courtType: string; // e.g., "Paddle Court"
  hourlyPrice: string; // "1200.00"
  startTime: string; // "HH:mm:00"
  endTime: string;   // "HH:mm:00"
  customerName: string;
  customerPhone: string;
  paymentProofUrl: string | null;
};

type Pagination = {
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
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

/* ---------------- Page ---------------- */
export default function CheckBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [verifyingId, setVerifyingId] = useState<number | null>(null);
  const [cancelingId, setCancelingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  // Proof modal
  const [proofUrl, setProofUrl] = useState<string | null>(null);

  // Cancel confirm modal
  const [confirmCancelId, setConfirmCancelId] = useState<number | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{
        data: { bookings: Booking[]; pagination: Pagination };
      }>(
        `/court-slots/get-all-bookings?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`
      );
      setBookings(res.data?.bookings || []);
      setPagination(res.data?.pagination || null);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const verifyPayment = async (bookingId: number) => {
    setError(null);
    setVerifyingId(bookingId);
    try {
      await api.post("/customers/verify-payment-proof", {
        bookingId: String(bookingId),
      });
      await fetchBookings();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to verify payment");
    } finally {
      setVerifyingId(null);
    }
  };

  const cancelBooking = async (bookingId: number) => {
    setError(null);
    setCancelingId(bookingId);
    try {
      await api.put(`/court-slots/cancel-booking/${bookingId}`);
      await fetchBookings();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to cancel booking");
    } finally {
      setCancelingId(null);
      setConfirmCancelId(null);
    }
  };

  const totalPages = pagination?.total_pages ?? 1;

  const statusPill = (status: string) => {
    const s = status.toLowerCase();
    if (s === "booked") {
      return (
        <span className="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-blue-100 text-blue-700">
          Booked
        </span>
      );
    }
    if (s === "cancelled" || s === "canceled") {
      return (
        <span className="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-red-100 text-red-700">
          Cancelled
        </span>
      );
    }
    if (s === "completed") {
      return (
        <span className="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-emerald-100 text-emerald-700">
          Completed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-gray-100 text-gray-700">
        {status}
      </span>
    );
  };

  const paidPill = (isPaid: 0 | 1) =>
    isPaid ? (
      <span className="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-green-100 text-green-700">
        Paid
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-1 text-[11px] font-medium rounded-full bg-yellow-100 text-yellow-700">
        Unpaid
      </span>
    );

  return (
    <div className="p-6 text-[13px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl font-semibold">Check Bookings</h2>

        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="pl-9 border px-3 py-2 rounded w-72 text-[13px]"
            />
          </div>
        </div>
      </div>

      {/* Error Tip */}
      {error && (
        <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 font-medium">Booking ID</th>
              <th className="px-4 py-2 font-medium">Date</th>
              <th className="px-4 py-2 font-medium">Time</th>
              <th className="px-4 py-2 font-medium">Court</th>
              <th className="px-4 py-2 font-medium">Type</th>
              <th className="px-4 py-2 font-medium">Price</th>
              <th className="px-4 py-2 font-medium">Customer</th>
              <th className="px-4 py-2 font-medium">Phone</th>
              <th className="px-4 py-2 font-medium">Paid</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={11} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={11} className="text-center py-6">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((b) => {
                const canVerify = !!b.paymentProofUrl && b.isPaid === 0;
                const isCancelled = b.status?.toLowerCase() === "cancelled" || b.status?.toLowerCase() === "canceled";
                const canCancel = !isCancelled; // allow cancel if not already cancelled
                return (
                  <tr key={b.bookingId} className="border-b">
                    <td className="px-4 py-2">{b.bookingId}</td>
                    <td className="px-4 py-2">{formatDate(b.bookingDate)}</td>
                    <td className="px-4 py-2">
                      {formatTime12Hour(b.startTime)} – {formatTime12Hour(b.endTime)}
                    </td>
                    <td className="px-4 py-2">{b.courtName}</td>
                    <td className="px-4 py-2">{b.courtType}</td>
                    <td className="px-4 py-2">Rs {b.hourlyPrice}</td>
                    <td className="px-4 py-2">{b.customerName}</td>
                    <td className="px-4 py-2">{b.customerPhone}</td>
                    <td className="px-4 py-2">{paidPill(b.isPaid)}</td>
                    <td className="px-4 py-2">{statusPill(b.status)}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        {/* View Proof Button (if exists) */}
                        {b.paymentProofUrl && (
                          <button
                            onClick={() => setProofUrl(b.paymentProofUrl!)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 border rounded hover:bg-gray-50"
                            title="View Payment Proof"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        )}

                        {/* Verify Payment */}
                        <button
                          disabled={!canVerify || verifyingId === b.bookingId}
                          onClick={() => verifyPayment(b.bookingId)}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded ${
                            canVerify
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                          title={
                            canVerify
                              ? "Verify Payment"
                              : b.isPaid
                              ? "Already verified"
                              : "No payment proof"
                          }
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          {verifyingId === b.bookingId ? "Verifying..." : "Verify"}
                        </button>

                        {/* Cancel Booking */}
                        <button
                          disabled={!canCancel || cancelingId === b.bookingId}
                          onClick={() => setConfirmCancelId(b.bookingId)}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded ${
                            canCancel
                              ? "bg-red-600 text-white hover:bg-red-700"
                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                          title={canCancel ? "Cancel Booking" : "Already cancelled"}
                        >
                          <Ban className="w-4 h-4" />
                          {cancelingId === b.bookingId ? "Cancelling..." : "Cancel"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Payment Proof Modal (transparent background) */}
      {proofUrl && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-50"
          onClick={() => setProofUrl(null)}
        >
          <div
            className="relative max-w-3xl w-auto max-h-[85vh] p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setProofUrl(null)}
              className="absolute -top-10 right-0 text-white hover:opacity-80"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={proofUrl}
              alt="Payment Proof"
              className="rounded-lg shadow-2xl max-h-[85vh] w-auto object-contain"
            />
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal (transparent background) */}
      {confirmCancelId !== null && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setConfirmCancelId(null)}
        >
          <div
            className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setConfirmCancelId(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-semibold mb-2">Cancel Booking?</h3>
            <p className="text-gray-600 mb-6">
              You are about to cancel booking <span className="font-semibold">#{confirmCancelId}</span>. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmCancelId(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Keep
              </button>
              <button
                onClick={() => cancelBooking(confirmCancelId)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                {cancelingId === confirmCancelId ? "Cancelling..." : "Confirm Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

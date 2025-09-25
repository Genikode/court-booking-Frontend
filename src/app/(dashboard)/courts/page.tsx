"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import {
  CalendarDays,
  Clock,
  MapPin,
  X,
  Search as SearchIcon,
  Loader2,
  BadgeCheck,
} from "lucide-react";

/* ---------------- Types ---------------- */
type Court = {
  id: number;
  courtName: string;
  locationName: string;
  courtType: string;
  openTime: string;     // "HH:mm:ss"
  closeTime: string;    // "HH:mm:ss"
  courtImage?: string;
  hourlyPrice: string;  // "1200.00"
  status: string;       // "open" | "closed"
  isActive: number;     // 1/0
  createdAt: string;
};
type CourtsResponse = {
  data: {
    pagination?: { total: number; page: number; limit: number; totalPages: number };
    courts: Court[];
  };
};
type Slot = { id: number; courtId: number; startTime: string; endTime: string; status?: string };
type SlotsResponse = { data: { slots: Slot[] } };

/* ---------------- Helpers ---------------- */
function formatTime12Hour(timeStr: string) {
  if (!timeStr) return "";
  const [hour, minute] = timeStr.split(":");
  const d = new Date();
  d.setHours(Number(hour));
  d.setMinutes(Number(minute));
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
}
function money(v: string | number) {
  const n = typeof v === "string" ? Number(v) : v;
  return Number.isNaN(n) ? `${v}` : n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}
const todayISO = () => new Date().toISOString().slice(0, 10);

/* ---------------- UI atoms ---------------- */
function Pill({
  children,
  color = "blue",
  className = "",
}: { children: React.ReactNode; color?: "blue" | "green" | "gray"; className?: string }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-2.5 sm:px-3 py-1 shrink-0 whitespace-nowrap leading-none border text-[11px] sm:text-xs";
  const styles =
    color === "green"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : color === "gray"
      ? "bg-gray-50 text-gray-700 border-gray-200"
      : "bg-blue-50 text-blue-700 border-blue-100";
  return <span className={`${base} ${styles} ${className}`}>{children}</span>;
}

/* ---------------- Page ---------------- */
export default function BookNowPage() {
  // courts
  const [courts, setCourts] = useState<Court[]>([]);
  const [cLoading, setCLoading] = useState(false);
  const [cError, setCError] = useState<string | null>(null);

  // search + pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  // sheet state
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeCourt, setActiveCourt] = useState<Court | null>(null);

  // slots
  const [slots, setSlots] = useState<Slot[]>([]);
  const [sLoading, setSLoading] = useState(false);
  const [sError, setSError] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

  // booking
  const [bookingDate, setBookingDate] = useState<string>(todayISO());
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMsg, setBookingMsg] = useState<string | null>(null);

  const fetchCourts = async () => {
    setCLoading(true); setCError(null);
    try {
      const res = await api.get<CourtsResponse>(
        `/courts/get-all-courts?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
      );
      setCourts(res.data?.courts || []);
      setTotalPages(res.data?.pagination?.totalPages ?? 1);
    } catch (err: any) {
      setCError(err?.message || "Failed to load courts");
    } finally {
      setCLoading(false);
    }
  };

  useEffect(() => { fetchCourts(); /* eslint-disable-next-line */ }, [page, search]);

  const filteredCourts = useMemo(
    () => courts.filter((c) => c.isActive === 1 && (c.status?.toLowerCase() ?? "") === "open"),
    [courts]
  );

  const openCourtSheet = async (c: Court) => {
    setActiveCourt(c);
    setSelectedSlotId(null);
    setSheetOpen(true);
    setSLoading(true); setSError(null);
    try {
      const res = await api.get<SlotsResponse>(
        `/court-slots/get-slots-by-court/${c.id}?page=1&limit=50&sort_by=startTime&sort_order=asc`
      );
      setSlots(res.data?.slots || []);
    } catch (err: any) {
      setSError(err?.message || "Failed to load slots");
    } finally {
      setSLoading(false);
    }
  };

  const closeSheet = () => {
    setSheetOpen(false);
    setActiveCourt(null);
    setSlots([]); setSelectedSlotId(null);
    setBookingMsg(null); setSError(null);
  };

  const onBook = async () => {
    if (!activeCourt || !selectedSlotId || !bookingDate) return;
    setBookingMsg(null); setBookingLoading(true);
    try {
      await api.put(`/court-slots/create-slot-booking`, {
        courtId: activeCourt.id,
        slotId: selectedSlotId,
        bookingDate,
      });
      setBookingMsg("Booking confirmed!");
      await openCourtSheet(activeCourt); // refresh slots
    } catch (err: any) {
      setBookingMsg(err?.message || "Failed to create booking");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto text-[14px]">
      {/* Header & Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-2xl font-semibold">Book Now</h1>
        <div className="w-full sm:w-80 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search courts..."
            value={search}
            onChange={(e) => { setPage(1); setSearch(e.target.value); }}
            className="w-full pl-9 pr-3 py-3 border rounded-2xl"
          />
        </div>
      </div>

      {/* Error tip */}
      {cError && <div className="mb-3 bg-red-100 text-red-700 px-3 py-2 rounded">{cError}</div>}

      {/* Courts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 ring-1 ring-slate-100 shadow-sm animate-pulse h-40" />
          ))
        ) : filteredCourts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">No courts available.</div>
        ) : (
          filteredCourts.map((c) => (
            <button
              key={c.id}
              onClick={() => openCourtSheet(c)}
              className="group text-left bg-white rounded-2xl border border-slate-200 ring-1 ring-slate-100 hover:ring-blue-200 shadow-sm hover:shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              {/* ✅ Mobile: pills drop BELOW text; Desktop: pills at right */}
              <div className="grid grid-cols-[88px_1fr] sm:grid-cols-[96px_1fr_auto] gap-3 p-3 items-center">
                {/* Image */}
                <div className="w-[88px] h-[88px] sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 ring-1 ring-slate-200">
                  {c.courtImage ? (
                    <img
                      src={c.courtImage}
                      alt={c.courtName}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-gray-400 text-xs">
                      No image
                    </div>
                  )}
                </div>

                {/* Middle content */}
                <div className="min-w-0">
                  <h3 className="font-semibold text-[15px] sm:text-base text-slate-900 truncate">
                    {c.courtName}
                  </h3>

                  <div className="mt-1 flex items-start gap-1 text-slate-600">
                    <MapPin className="w-4 h-4 mt-[1px] shrink-0" />
                    <span className="text-[13px] leading-snug break-words">
                      {c.locationName}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-1 text-slate-600">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span className="text-[13px] leading-snug">
                      {formatTime12Hour(c.openTime)} – {formatTime12Hour(c.closeTime)}
                    </span>
                  </div>
                </div>

                {/* Pills: below on mobile, right on ≥sm */}
                <div className="col-span-2 sm:col-span-1 flex flex-wrap sm:flex-col sm:items-end gap-2 pt-1 sm:pt-0">
                  <Pill color="green">Rs {money(c.hourlyPrice)}/hr</Pill>
                  <Pill color="blue">{c.courtType}</Pill>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-5 flex items-center justify-between">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1.5 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1.5 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* -------- Sheet (unchanged logic) -------- */}
      {sheetOpen && activeCourt && (
        <div className="fixed inset-0 z-50" aria-modal="true" role="dialog" onClick={closeSheet}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-xl p-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 ring-1 ring-slate-200">
                  {activeCourt.courtImage && (
                    <img src={activeCourt.courtImage} alt={activeCourt.courtName} className="w-full h-full object-cover" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{activeCourt.courtName}</h3>
                  <div className="text-xs text-slate-600">{activeCourt.locationName}</div>
                </div>
              </div>
              <button onClick={closeSheet} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Court meta */}
            <div className="flex flex-wrap items-center gap-2 text-gray-700 mb-3">
              <Pill color="blue">{activeCourt.courtType}</Pill>
              <Pill color="green">Rs {money(activeCourt.hourlyPrice)}/hr</Pill>
              <Pill color="gray">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {formatTime12Hour(activeCourt.openTime)} – {formatTime12Hour(activeCourt.closeTime)}
              </Pill>
            </div>

            {/* Date Picker */}
            <div className="mb-3">
              <label className="block text-sm text-gray-700 mb-1">Select date</label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={bookingDate}
                  min={todayISO()}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            {/* Slots */}
            <SlotsSection
              slots={slots}
              loading={sLoading}
              error={sError}
              selectedSlotId={selectedSlotId}
              onSelect={setSelectedSlotId}
            />

            {/* Booking message */}
            {bookingMsg && (
              <div className={`mt-3 px-3 py-2 rounded ${bookingMsg.toLowerCase().includes("confirm") ? "bg-emerald-50 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                {bookingMsg}
              </div>
            )}

            {/* Sticky book bar */}
            <div className="h-16" />
            <div className="fixed left-0 right-0 bottom-0 z-50 p-3">
              <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur border rounded-xl shadow flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2 text-sm">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                  {selectedSlotId ? <span>Slot selected • {bookingDate}</span> : <span>Select a slot</span>}
                </div>
                <button
                  disabled={!selectedSlotId || bookingLoading}
                  onClick={onBook}
                  className="px-4 py-2 rounded-lg text-white bg-blue-600 disabled:bg-gray-300 disabled:text-gray-600"
                >
                  {bookingLoading ? "Booking…" : "Book Slot"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Slots section ---------------- */
function SlotsSection({
  slots,
  loading,
  error,
  selectedSlotId,
  onSelect,
}: {
  slots: Slot[];
  loading: boolean;
  error: string | null;
  selectedSlotId: number | null;
  onSelect: (id: number) => void;
}) {
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">Available slots</h4>
        {loading && (
          <span className="inline-flex items-center text-sm text-gray-500">
            <Loader2 className="w-4 h-4 mr-1 animate-spin" /> loading…
          </span>
        )}
      </div>
      {error && <div className="mb-2 bg-red-100 text-red-700 px-3 py-2 rounded">{error}</div>}
      {!loading && slots.length === 0 ? (
        <div className="text-sm text-gray-500">No slots found.</div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {slots.map((s) => {
            const booked = (s.status && s.status.toLowerCase() === "booked") ? true : false;
            const selected = selectedSlotId === s.id;
            return (
              <button
                key={s.id}
                disabled={booked}
                onClick={() => onSelect(s.id)}
                className={[
                  "px-3 py-2 rounded-lg border text-sm transition",
                  booked
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : selected
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white hover:bg-gray-50"
                ].join(" ")}
                title={booked ? "Already booked" : "Select slot"}
              >
                {formatTime12Hour(s.startTime)} – {formatTime12Hour(s.endTime)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

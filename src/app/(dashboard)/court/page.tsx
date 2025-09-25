"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Plus, Edit, Trash2, Clock, Upload } from "lucide-react";

/* ---------------- Types ---------------- */
type Court = {
  id: number;
  name: string; 
  courtName?: string;
  locationName: string;
  courtTypeId: number;
  openTime: string;   // API returns: "HH:mm:ss"
  closeTime: string;  // API returns: "HH:mm:ss"
  courtImage?: string; // signedUrl
  hourlyPrice: number | string;
  status: string;
  courtType?: string; // e.g., "Tennis Court", "Futsal Field", "Paddle Court"
};

type Slot = {
  id: number;
  courtId: number;
  startTime: string;  // "HH:mm:ss"
  endTime: string;    // "HH:mm:ss"
  status?: string;
};

/* ---------------- Helpers ---------------- */
function formatTime12Hour(timeStr: string) {
  if (!timeStr) return "";
  const [hour, minute] = timeStr.split(":");
  const date = new Date();
  date.setHours(Number(hour));
  date.setMinutes(Number(minute));
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// HH:mm -> HH:mm:ss (for API)
function toApiTime(t: string) {
  return t && t.length === 5 ? `${t}:00` : t;
}

// "HH:mm:ss" -> "HH:mm" (for <input type="time">)
function toInputTime(t: string) {
  return t ? t.slice(0, 5) : "";
}

/* ---------------- Main Page ---------------- */
export default function CourtPage() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showCourtModal, setShowCourtModal] = useState(false);
  const [editingCourt, setEditingCourt] = useState<Court | null>(null);

  const [showSlotModal, setShowSlotModal] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedCourtId, setSelectedCourtId] = useState<number | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCourtId, setDeleteCourtId] = useState<number | null>(null);

  // pagination + search
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const fetchCourts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ data: { courts: Court[] } }>(
        `/courts/get-all-courts?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
      );
      setCourts(res.data?.courts || []);
    } catch (err: any) {
      console.error("Error fetching courts:", err);
      setError(err?.message || "Failed to fetch courts");
    } finally {
      setLoading(false);
    }
  };

  const fetchSlots = async (courtId: number) => {
    try {
      const res = await api.get<{ data: { slots: Slot[] } }>(
        `/court-slots/get-slots-by-court/${courtId}?page=1&limit=10&sort_by=startTime&sort_order=asc`
      );
      setSlots(res.data?.slots || []);
    } catch (err) {
      console.error("Error fetching slots:", err);
      setError("Failed to fetch slots");
    }
  };

  useEffect(() => {
    fetchCourts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  return (
   <div className="p-6 text-black">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">Courts Management</h2>
    <button
      onClick={() => {
        setEditingCourt(null);
        setShowCourtModal(true);
      }}
      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
    >
      <Plus size={18} /> Create Court
    </button>
  </div>

  {/* Error Tip */}
  {error && (
    <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
      {error}
    </div>
  )}

  {/* Search */}
  <div className="mb-4 flex items-center gap-2">
    <input
      type="text"
      placeholder="Search courts..."
      value={search}
      onChange={(e) => {
        setPage(1);
        setSearch(e.target.value);
      }}
      className="border px-3 py-2 rounded w-64 text-black"
    />
  </div>

  <div className="bg-white shadow rounded-lg overflow-hidden">
    <table className="w-full border-collapse">
      <thead className="bg-black/5 text-left">
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Location</th>
          <th className="px-4 py-2">Type</th>
          <th className="px-4 py-2">Open</th>
          <th className="px-4 py-2">Close</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={9} className="text-center py-4">
              Loading...
            </td>
          </tr>
        ) : courts.length === 0 ? (
          <tr>
            <td colSpan={9} className="text-center py-4">
              No courts found
            </td>
          </tr>
        ) : (
          courts.map((c) => (
            <tr key={c.id} className="border-b">
              <td className="px-4 py-2">{c.id}</td>
              <td className="px-4 py-2 flex items-center gap-2">
                {c.courtImage && (
                  <img
                    src={c.courtImage}
                    alt="court"
                    className="w-8 h-8 object-cover rounded"
                  />
                )}
                {c.courtName || c.name}
              </td>
              <td className="px-4 py-2">{c.locationName}</td>
              <td className="px-4 py-2">
                {c.courtType ??
                  (c.courtTypeId === 1
                    ? "Tennis Court"
                    : c.courtTypeId === 2
                    ? "Futsal Field"
                    : "—")}
              </td>
              <td className="px-4 py-2">{formatTime12Hour(c.openTime)}</td>
              <td className="px-4 py-2">{formatTime12Hour(c.closeTime)}</td>
              <td className="px-4 py-2">Rs {c.hourlyPrice}</td>
              <td className="px-4 py-2">{c.status}</td>
              <td className="px-4 py-2 flex gap-3">
                <button
                  onClick={() => {
                    setEditingCourt(c);
                    setShowCourtModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => {
                    setDeleteCourtId(c.id);
                    setShowDeleteModal(true);
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => {
                    setSelectedCourtId(c.id);
                    fetchSlots(c.id);
                    setShowSlotModal(true);
                  }}
                  className="text-black/60 hover:text-black"
                >
                  <Clock size={18} />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>

  {/* Pagination */}
  <div className="mt-4 flex justify-between items-center">
    <button
      disabled={page === 1}
      onClick={() => setPage((p) => Math.max(1, p - 1))}
      className="px-3 py-1 bg-black/10 rounded disabled:opacity-50"
    >
      Prev
    </button>
    <span>Page {page}</span>
    <button
      onClick={() => setPage((p) => p + 1)}
      className="px-3 py-1 bg-black/10 rounded"
    >
      Next
    </button>
  </div>

  {showCourtModal && (
    <CourtModal
      court={editingCourt}
      onClose={() => setShowCourtModal(false)}
      onSaved={fetchCourts}
    />
  )}
  {showSlotModal && selectedCourtId && (
    <SlotModal
      courtId={selectedCourtId}
      slots={slots}
      onClose={() => setShowSlotModal(false)}
      onSaved={() => fetchSlots(selectedCourtId)}
    />
  )}
  {showDeleteModal && deleteCourtId && (
    <DeleteModal
      courtId={deleteCourtId}
      onClose={() => setShowDeleteModal(false)}
      onDeleted={fetchCourts}
    />
  )}
</div>

  );
}

/* ---------------- Court Modal ---------------- */
function CourtModal({
  court,
  onClose,
  onSaved,
}: {
  court: Court | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(() => {
    if (court) {
      return {
        id: court.id,
        name: court.name || "",
        courtName: court.courtName || court.name || "",
        locationName: court.locationName || "",
        courtTypeId:
          court.courtTypeId ??
          (court.courtType === "Tennis Court" ? 1 : court.courtType === "Futsal Field" ? 2 : 1),
        openTime: toInputTime(court.openTime || "08:00:00"),
        closeTime: toInputTime(court.closeTime || "22:00:00"),
        hourlyPrice: typeof court.hourlyPrice === "string" ? parseFloat(court.hourlyPrice) : (court.hourlyPrice || 0),
        status: court.status || "open",
        courtImage: court.courtImage || "",
        courtType: court.courtType || "",
      };
    }
    return {
      id: 0,
      name: "",
      courtName: "",
      locationName: "",
      courtTypeId: 1,
      openTime: "08:00",
      closeTime: "22:00",
      hourlyPrice: 0,
      status: "open",
      courtImage: "",
      courtType: "",
    };
  });

  const saveCourt = async () => {
    const payload = {
      name: form.courtName,
      locationName: form.locationName,
      courtTypeId: form.courtTypeId,
      openTime: form.openTime,   // if API requires HH:mm:ss, use toApiTime()
      closeTime: form.closeTime, // if API requires HH:mm:ss, use toApiTime()
      hourlyPrice: form.hourlyPrice,
      status: form.status,
      courtImage: form.courtImage,
    };

    if (court) {
      await api.put(`/courts/update-court/${court.id}`, payload);
    } else {
      await api.post("/courts/create-court", payload);
    }
    onSaved();
    onClose();
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("court_image", file);

    const res = await api.put<{
      data: { key: string; url: string; signedUrl: string };
    }>("/upload-image", formData, {}, true);

    if (res?.data?.signedUrl) {
      // store SIGNED URL as requested
      setForm((prev: any) => ({ ...prev, courtImage: res.data.url }));
    }
  };

  return (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
  <div className="bg-white p-6 rounded-lg w-full max-w-lg text-black">
    <h3 className="text-xl font-bold mb-4">
      {court ? "Update Court" : "Create Court"}
    </h3>

    <div className="space-y-3">
      <input
        type="text"
        placeholder="Court Name"
        className="w-full border px-3 py-2 rounded text-black"
        value={form.courtName}
        onChange={(e) => setForm({ ...form, courtName: e.target.value })}
      />

      <input
        type="text"
        placeholder="Location"
        className="w-full border px-3 py-2 rounded text-black"
        value={form.locationName}
        onChange={(e) => setForm({ ...form, locationName: e.target.value })}
      />

      {/* Court Type Dropdown */}
      <div>
        <label className="block text-sm mb-1">Court Type</label>
        <select
          value={form.courtTypeId}
          onChange={(e) =>
            setForm({ ...form, courtTypeId: Number(e.target.value) })
          }
          className="w-full border px-3 py-2 rounded text-black"
        >
          <option value={1}>Tennis Court</option>
          <option value={2}>Futsal Field</option>
        </select>
      </div>

      {/* Open / Close Time */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm">Open Time</label>
          <input
            type="time"
            className="w-full border px-3 py-2 rounded text-black"
            value={form.openTime}
            onChange={(e) => setForm({ ...form, openTime: e.target.value })}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm">Close Time</label>
          <input
            type="time"
            className="w-full border px-3 py-2 rounded text-black"
            value={form.closeTime}
            onChange={(e) => setForm({ ...form, closeTime: e.target.value })}
          />
        </div>
      </div>

      <input
        type="number"
        placeholder="Hourly Price"
        className="w-full border px-3 py-2 rounded text-black"
        value={Number(form.hourlyPrice)}
        onChange={(e) =>
          setForm({ ...form, hourlyPrice: Number(e.target.value) })
        }
      />

      {/* Image Upload */}
      <div>
        <label className="block text-sm mb-1">Court Image</label>
        <label className="inline-flex items-center gap-2 px-3 py-2 border rounded cursor-pointer hover:bg-black/5">
          <Upload size={16} />
          <span>Upload image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              e.target.files && handleImageUpload(e.target.files[0])
            }
          />
        </label>

        {form.courtImage && (
          <a
            href={form.courtImage}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={form.courtImage}
              alt="court"
              className="mt-2 w-24 h-24 object-cover rounded"
            />
          </a>
        )}
      </div>
    </div>

    {/* Actions */}
    <div className="mt-6 flex justify-end gap-3">
      <button
        onClick={onClose}
        className="px-4 py-2 rounded border border-black text-black hover:bg-black/10 transition"
      >
        Cancel
      </button>
      <button
        onClick={saveCourt}
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Save
      </button>
    </div>
  </div>
</div>

  );
}

/* ---------------- Slot Modal ---------------- */
function SlotModal({
  courtId,
  slots,
  onClose,
  onSaved,
}: {
  courtId: number;
  slots: Slot[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [newSlot, setNewSlot] = useState<{ startTime: string; endTime: string }>({
    startTime: "",
    endTime: "",
  });
  const [baseTimes, setBaseTimes] = useState<{ open: string; close: string }>({
    open: "",
    close: "",
  });
  const [error, setError] = useState<string | null>(null);

  // Prefill slot start/end with court open/close ONCE per courtId
  useEffect(() => {
    const fetchCourt = async () => {
      try {
        const res = await api.get<{ data: { court: Court } }>(
          `/courts/get-court-by-id/${courtId}`
        );
        const court = res.data?.court;
        if (court) {
          const open = toInputTime(court.openTime);   // "20:00"
          const close = toInputTime(court.closeTime); // "22:00"
          setBaseTimes({ open, close });
          setNewSlot({ startTime: open, endTime: close });
        }
      } catch {
        setError("Failed to load court details");
      }
    };
    fetchCourt();
  }, [courtId]);

  const addSlot = async () => {
    setError(null);
    try {
      await api.post("/court-slots/create-slot", {
        courtId,
        startTime: toApiTime(newSlot.startTime), // "HH:mm:ss"
        endTime: toApiTime(newSlot.endTime),     // "HH:mm:ss"
      });
      // refresh list
      onSaved();
      // reset inputs back to the court's open/close (avoid empty -> 12:30 defaults)
      setNewSlot({ startTime: baseTimes.open, endTime: baseTimes.close });
    } catch (err: any) {
      setError(err?.message || "Failed to create slot");
    }
  };

  const deleteSlot = async (id: number) => {
    setError(null);
    try {
      await api.delete(`/court-slots/delete-slot/${id}`);
      onSaved();
    } catch {
      setError("Failed to delete slot");
    }
  };

  return (
<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
  <div className="bg-white p-6 rounded-lg w-full max-w-2xl text-black">
    <h3 className="text-xl font-bold mb-4">Manage Slots</h3>

    {/* Error Tip */}
    {error && (
      <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
        {error}
      </div>
    )}

    <div className="flex gap-3 mb-4 items-center">
      <div className="flex flex-col">
        <label className="text-sm">Start Time</label>
        <input
          type="time"
          value={newSlot.startTime}
          min={baseTimes.open || undefined}
          max={baseTimes.close || undefined}
          onChange={(e) =>
            setNewSlot({ ...newSlot, startTime: e.target.value })
          }
          className="border px-3 py-2 rounded text-black"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm">End Time</label>
        <input
          type="time"
          value={newSlot.endTime}
          min={baseTimes.open || undefined}
          max={baseTimes.close || undefined}
          onChange={(e) =>
            setNewSlot({ ...newSlot, endTime: e.target.value })
          }
          className="border px-3 py-2 rounded text-black"
        />
      </div>
      <button
        onClick={addSlot}
        className="self-end bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Slot
      </button>
    </div>

    <table className="w-full border-collapse mb-4">
      <thead>
        <tr className="bg-black/5">
          <th className="px-3 py-2 text-left">Start</th>
          <th className="px-3 py-2 text-left">End</th>
          <th className="px-3 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {slots.map((s) => (
          <tr key={s.id} className="border-b">
            <td className="px-3 py-2">{formatTime12Hour(s.startTime)}</td>
            <td className="px-3 py-2">{formatTime12Hour(s.endTime)}</td>
            <td className="px-3 py-2 flex items-center gap-3">
              <button
                onClick={() => deleteSlot(s.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="flex justify-end">
      <button
        onClick={onClose}
        className="px-4 py-2 rounded bg-black/10 hover:bg-black/20"
      >
        Close
      </button>
    </div>
  </div>
</div>

  );
}

/* ---------------- Delete Modal ---------------- */
function DeleteModal({
  courtId,
  onClose,
  onDeleted,
}: {
  courtId: number;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const handleDelete = async () => {
    await api.delete(`/courts/delete-court/${courtId}`);
    onDeleted();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm text-center">
        <h3 className="text-lg font-bold mb-4">Delete Court?</h3>
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete this court? This action cannot be undone.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-green"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

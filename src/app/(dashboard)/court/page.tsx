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
  openTime: string;
  closeTime: string;
  courtImage?: string;
  hourlyPrice: number | string;
  status: string;
  courtType?: string;
};

type Slot = {
  id: number;
  courtId: number;
  startTime: string;
  endTime: string;
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
function toApiTime(t: string) {
  return t && t.length === 5 ? `${t}:00` : t;
}
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

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const fetchCourts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ data: { courts: Court[] } }>(
        `/courts/get-all-courts?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`
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
    } catch {
      setError("Failed to fetch slots");
    }
  };

  useEffect(() => {
    fetchCourts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Courts Management</h2>
        <button
          onClick={() => {
            setEditingCourt(null);
            setShowCourtModal(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Create Court
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search courts..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Open</th>
              <th className="px-4 py-3">Close</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : courts.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6">
                  No courts found
                </td>
              </tr>
            ) : (
              courts.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3">{c.id}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    {c.courtImage && (
                      <img
                        src={c.courtImage}
                        alt="court"
                        className="w-8 h-8 object-cover rounded-full border border-gray-300 dark:border-gray-600"
                      />
                    )}
                    {c.courtName || c.name}
                  </td>
                  <td className="px-4 py-3">{c.locationName}</td>
                  <td className="px-4 py-3">
                    {c.courtType ??
                      (c.courtTypeId === 1
                        ? "Tennis Court"
                        : c.courtTypeId === 2
                        ? "Futsal Field"
                        : "—")}
                  </td>
                  <td className="px-4 py-3">{formatTime12Hour(c.openTime)}</td>
                  <td className="px-4 py-3">{formatTime12Hour(c.closeTime)}</td>
                  <td className="px-4 py-3 font-medium">Rs {c.hourlyPrice}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        c.status === "open"
                          ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                          : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => {
                        setEditingCourt(c);
                        setShowCourtModal(true);
                      }}
                      className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteCourtId(c.id);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCourtId(c.id);
                        fetchSlots(c.id);
                        setShowSlotModal(true);
                      }}
                      className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      <Clock size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
        >
          Prev
        </button>
        <span className="px-3 py-1 rounded bg-blue-600 text-white">
          Page {page}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
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
          (court.courtType === "Tennis Court"
            ? 1
            : court.courtType === "Futsal Field"
            ? 2
            : 1),
        openTime: toInputTime(court.openTime || "08:00:00"),
        closeTime: toInputTime(court.closeTime || "22:00:00"),
        hourlyPrice:
          typeof court.hourlyPrice === "string"
            ? parseFloat(court.hourlyPrice)
            : court.hourlyPrice || 0,
        status: court.status || "open",
        courtImage: court.courtImage || "",
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
    };
  });

  const saveCourt = async () => {
    const payload = {
      name: form.courtName,
      locationName: form.locationName,
      courtTypeId: form.courtTypeId,
      openTime: form.openTime,
      closeTime: form.closeTime,
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
    const res = await api.put<{ data: { key: string; url: string; signedUrl: string } }>(
      "/upload-image",
      formData,
      {},
      true
    );
    if (res?.data?.signedUrl) {
      setForm((prev: any) => ({ ...prev, courtImage: res.data.url }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg text-gray-800 dark:text-gray-100 shadow-lg">
        <h3 className="text-xl font-bold mb-4">
          {court ? "Update Court" : "Create Court"}
        </h3>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Court Name"
            className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.courtName}
            onChange={(e) => setForm({ ...form, courtName: e.target.value })}
          />

          <input
            type="text"
            placeholder="Location"
            className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.locationName}
            onChange={(e) => setForm({ ...form, locationName: e.target.value })}
          />

          <div>
            <label className="block text-sm mb-1">Court Type</label>
            <select
              value={form.courtTypeId}
              onChange={(e) =>
                setForm({ ...form, courtTypeId: Number(e.target.value) })
              }
              className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value={1}>Tennis Court</option>
              <option value={2}>Futsal Field</option>
            </select>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm">Open Time</label>
              <input
                type="time"
                className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={form.openTime}
                onChange={(e) =>
                  setForm({ ...form, openTime: e.target.value })
                }
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm">Close Time</label>
              <input
                type="time"
                className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={form.closeTime}
                onChange={(e) =>
                  setForm({ ...form, closeTime: e.target.value })
                }
              />
            </div>
          </div>

          <input
            type="number"
            placeholder="Hourly Price"
            className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={Number(form.hourlyPrice)}
            onChange={(e) =>
              setForm({ ...form, hourlyPrice: Number(e.target.value) })
            }
          />

          <div>
            <label className="block text-sm mb-1">Court Image</label>
            <label className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition">
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

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
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

  useEffect(() => {
    const fetchCourt = async () => {
      try {
        const res = await api.get<{ data: { court: Court } }>(
          `/courts/get-court-by-id/${courtId}`
        );
        const court = res.data?.court;
        if (court) {
          const open = toInputTime(court.openTime);
          const close = toInputTime(court.closeTime);
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
        startTime: toApiTime(newSlot.startTime),
        endTime: toApiTime(newSlot.endTime),
      });
      onSaved();
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl text-gray-800 dark:text-gray-100 shadow-lg">
        <h3 className="text-xl font-bold mb-4">Manage Slots</h3>

        {error && (
          <div className="mb-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <div className="flex gap-3 mb-4 items-end">
          <div className="flex flex-col flex-1">
            <label className="text-sm mb-1">Start Time</label>
            <input
              type="time"
              value={newSlot.startTime}
              min={baseTimes.open || undefined}
              max={baseTimes.close || undefined}
              onChange={(e) =>
                setNewSlot({ ...newSlot, startTime: e.target.value })
              }
              className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-sm mb-1">End Time</label>
            <input
              type="time"
              value={newSlot.endTime}
              min={baseTimes.open || undefined}
              max={baseTimes.close || undefined}
              onChange={(e) =>
                setNewSlot({ ...newSlot, endTime: e.target.value })
              }
              className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <button
            onClick={addSlot}
            className="h-10 px-4 rounded bg-green-600 text-white hover:bg-green-700 transition"
          >
            Add Slot
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-3 py-2 text-left">Start</th>
              <th className="px-3 py-2 text-left">End</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {slots.map((s) => (
              <tr key={s.id}>
                <td className="px-3 py-2">{formatTime12Hour(s.startTime)}</td>
                <td className="px-3 py-2">{formatTime12Hour(s.endTime)}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => deleteSlot(s.id)}
                    className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-sm text-gray-800 dark:text-gray-100 shadow-lg text-center">
        <h3 className="text-lg font-bold mb-2">Delete Court?</h3>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
          Are you sure you want to delete this court? This action cannot be
          undone.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

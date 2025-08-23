"use client";
import Image from 'next/image';
import { useState } from 'react';

interface Court {
  id: number;
  name: string;
  type: 'Single' | 'Double';
  status: 'Available' | 'Occupied' | 'Maintenance';
  slots: string[];
}

interface CourtForm {
  name: string;
  type: 'Single' | 'Double';
  status: 'Available' | 'Occupied' | 'Maintenance';
  slots: string[];
}

export default function Dashboard() {
  const [courts, setCourts] = useState<Court[]>([
    { id: 1, name: 'Court 1', type: 'Single', status: 'Available', slots: ['6am - 7am'] },
    { id: 2, name: 'Court 2', type: 'Double', status: 'Occupied', slots: ['8am - 9am'] },
  ]);

  const [form, setForm] = useState<CourtForm>({
    name: '',
    type: 'Single',
    status: 'Available',
    slots: [],
  });

  const [editId, setEditId] = useState<number | null>(null);
  const [newSlot, setNewSlot] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editId) {
      setCourts((prev) =>
        prev.map((c) => (c.id === editId ? { ...c, ...form } : c))
      );
      setEditId(null);
    } else {
      const newCourt: Court = { ...form, id: Date.now() };
      setCourts((prev) => [...prev, newCourt]);
    }
    setForm({ name: '', type: 'Single', status: 'Available', slots: [] });
  };

  const handleEdit = (court: Court) => {
    setForm({ ...court });
    setEditId(court.id);
  };

  const handleDelete = (id: number) => {
    setCourts((prev) => prev.filter((c) => c.id !== id));
  };

  const addSlot = () => {
    if (newSlot.trim()) {
      setForm({ ...form, slots: [...form.slots, newSlot.trim()] });
      setNewSlot('');
    }
  };

  const removeSlot = (index: number) => {
    const updated = [...form.slots];
    updated.splice(index, 1);
    setForm({ ...form, slots: updated });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Image src="/logo1.png" alt="Creek Logo" width={60} height={60} />
          <h1 className="text-2xl font-bold text-gray-800">Tennis Court Management</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Court Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as CourtForm['type'] })}
              className="border p-2 rounded w-full"
            >
              <option>Single</option>
              <option>Double</option>
            </select>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as CourtForm['status'] })
              }
              className="border p-2 rounded w-full"
            >
              <option>Available</option>
              <option>Occupied</option>
              <option>Maintenance</option>
            </select>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white rounded p-2 w-full"
            >
              Manage Time Slots
            </button>
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
            {editId ? 'Update Court' : 'Add Court'}
          </button>
        </form>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded p-6 w-full max-w-md space-y-4">
              <h3 className="text-xl font-semibold">Manage Time Slots</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g., 6am - 7am"
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <button onClick={addSlot} className="bg-green-600 text-white px-4 rounded">
                  Add
                </button>
              </div>
              <ul className="space-y-2">
                {form.slots.map((slot, idx) => (
                  <li key={idx} className="flex justify-between items-center border px-3 py-1 rounded">
                    <span>{slot}</span>
                    <button onClick={() => removeSlot(idx)} className="text-red-600 text-sm">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Type</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Time Slots</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courts.map((court) => (
                <tr key={court.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{court.name}</td>
                  <td className="py-2 px-4">{court.type}</td>
                  <td className="py-2 px-4">{court.status}</td>
                  <td className="py-2 px-4 text-sm">
                    <ul className="list-disc list-inside space-y-1">
                      {court.slots.map((slot, index) => (
                        <li key={index}>{slot}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4 space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(court)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(court.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
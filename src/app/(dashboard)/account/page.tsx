"use client";
import Image from 'next/image';
import { useState } from 'react';

interface Account {
  name: string;
  email: string;
  phone: string;
  type: 'Admin' | 'Coach' | 'Receptionist';
  password: string;
}

export default function AccountScreen() {
  const [account, setAccount] = useState<Account>({
    name: 'Ghayas Ali',
    email: 'ghayas@example.com',
    phone: '03001234567',
    type: 'Admin',
    password: '********',
  });

  const [editMode, setEditMode] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

        {!editMode && (
          <div className="flex flex-col items-center text-center space-y-4">
            <Image
              src={"https://papersdock.com/_next/image?url=%2Fimages%2Flogo%2Flogo1.png&w=384&q=75"}
              alt="Profile Avatar"
              width={100}
              height={100}
              className="rounded-full border"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{account.name}</h2>
              <p className="text-sm text-gray-500">{account.type}</p>
            </div>
            <div className="w-full text-left space-y-2 text-sm text-gray-700">
              <p><strong>Email:</strong> {account.email}</p>
              <p><strong>Phone:</strong> {account.phone}</p>
            </div>
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          </div>
        )}

        {editMode && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={account.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Full Name"
            />

            <input
              type="email"
              name="email"
              value={account.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Email"
            />

            <input
              type="tel"
              name="phone"
              value={account.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Phone Number"
            />

            <select
              name="type"
              value={account.type}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option>Admin</option>
              <option>Coach</option>
              <option>Receptionist</option>
            </select>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

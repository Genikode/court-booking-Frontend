"use client";
import { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  type: 'Admin' | 'Coach' | 'Receptionist';
}

interface EmployeeForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  type: 'Admin' | 'Coach' | 'Receptionist';
}

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState<EmployeeForm>({
    name: '',
    email: '',
    phone: '',
    password: '',
    type: 'Admin',
  });
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editId) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editId ? { ...emp, ...form } : emp))
      );
      setEditId(null);
    } else {
      const newEmployee: Employee = { ...form, id: Date.now() };
      setEmployees((prev) => [...prev, newEmployee]);
    }
    setForm({ name: '', email: '', phone: '', password: '', type: 'Admin' });
  };

  const handleEdit = (emp: Employee) => {
    setForm(emp);
    setEditId(emp.id);
  };

  const handleDelete = (id: number) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Employee Management</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as EmployeeForm['type'] })}
              className="border p-2 rounded w-full"
            >
              <option>Admin</option>
              <option>Coach</option>
              <option>Receptionist</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
            {editId ? 'Update Employee' : 'Add Employee'}
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Phone</th>
                <th className="py-2 px-4 text-left">Type</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{emp.name}</td>
                  <td className="py-2 px-4">{emp.email}</td>
                  <td className="py-2 px-4">{emp.phone}</td>
                  <td className="py-2 px-4">{emp.type}</td>
                  <td className="py-2 px-4 space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
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

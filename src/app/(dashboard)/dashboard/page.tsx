import Image from 'next/image';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Image src="/logo1.png" alt="Creek Logo" width={60} height={60} />
            <h1 className="text-2xl font-bold text-gray-800">Welcome to Creek Sports Club</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700">Total Courts</h2>
            <p className="text-2xl font-bold text-blue-800 mt-2">2</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700">Active Members</h2>
            <p className="text-2xl font-bold text-blue-800 mt-2">500+</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700">Bookings</h2>
            <p className="text-2xl font-bold text-blue-800 mt-2">36</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
            <p className="text-2xl font-bold text-blue-800 mt-2">PKR 150,000</p>
          </div>
        </div>

    
      </div>
    </div>
  );
}
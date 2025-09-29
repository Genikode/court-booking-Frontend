import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Image
              src="/logo1.png"
              alt="Creek Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Welcome to Creek Sports Club
            </h1>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Courts
            </h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">2</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Active Members
            </h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">500+</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Bookings
            </h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">36</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Revenue
            </h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">PKR 150,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

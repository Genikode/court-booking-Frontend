// app/dashboard/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Menu,
  LogOut,
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  ShoppingBasket,
  X,
} from 'lucide-react';
import { clearToken, clearUser, getUser, isAuthenticated } from '@/lib/auth';
import { BiTennisBall } from 'react-icons/bi';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentUser = getUser();

  const adminnavItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Courts', href: '/court', icon: BookOpen },
    { label: 'Bookings', href: '/bookings', icon: ShoppingBag },
  ];

  const cusnavItems = [
    { label: 'My Bookings', href: '/booking', icon: ShoppingBasket },
    { label: 'Available Courts', href: '/courts', icon: BiTennisBall },
  ];

  const isCust = currentUser?.roleId === 2;
  const isAdmn = currentUser?.roleId === 1;

  const navItems = isAdmn ? adminnavItems : cusnavItems;

  return (
  <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
  {/* Sidebar for Desktop */}
  <aside
    className={`hidden md:flex border-r shadow-sm transition-all duration-300 
      ${collapsed ? "w-16" : "w-64"} 
      bg-white dark:bg-gray-800 dark:border-gray-700`}
  >
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white font-bold p-2 rounded-md">CR</div>
          {!collapsed && (
            <span className="font-semibold text-gray-700 dark:text-gray-100">
              CreeksClub
            </span>
          )}
        </div>
      </div>
      <nav
        className={`mt-4 flex flex-col space-y-1 ${
          collapsed ? "items-center" : ""
        }`}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex ${
                collapsed ? "justify-center px-0" : "justify-start px-4"
              } items-center py-3 gap-3 text-sm w-full ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/30 dark:text-blue-300"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <item.icon
                size={20}
                className={
                  isActive ? "text-blue-600 dark:text-blue-300" : "text-gray-600 dark:text-gray-300"
                }
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  </aside>

  {/* Mobile Sidebar */}
  {mobileOpen && (
    <div className="fixed inset-0 z-40 flex md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => setMobileOpen(false)}
      />
      {/* Drawer */}
      <div className="relative w-64 bg-white dark:bg-gray-800 shadow-lg z-50">
        <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white font-bold p-2 rounded-md">CR</div>
            <span className="font-semibold text-gray-700 dark:text-gray-100">
              CreeksClub
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <X size={22} />
          </button>
        </div>
        <nav className="mt-4 flex flex-col space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex justify-start px-4 items-center py-3 gap-3 text-sm w-full ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/30 dark:text-blue-300"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <item.icon
                  size={20}
                  className={
                    isActive ? "text-blue-600 dark:text-blue-300" : "text-gray-600 dark:text-gray-300"
                  }
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  )}

  {/* Main Content */}
  <div className="flex-1 flex flex-col">
    <header className="h-14 flex items-center justify-between px-6 border-b bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 transition-colors">
      <div className="flex items-center gap-4">
        {/* Mobile toggle */}
        <button
          onClick={() =>
            window.innerWidth < 768 ? setMobileOpen(true) : setCollapsed(!collapsed)
          }
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white md:hidden"
        >
          <Menu size={22} />
        </button>
        {/* Desktop toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          <Menu size={22} />
        </button>
        <h1 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
        <span>Welcome back, {currentUser?.name}</span>
        <button
          onClick={() => {
            clearToken();
            clearUser();
            router.replace("/login");
          }}
          className="flex items-center gap-1 text-red-500 hover:underline"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </header>

    <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-y-auto transition-colors">
      {children}
    </main>
  </div>
</div>

  );
}

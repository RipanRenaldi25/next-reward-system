"use client";
import { Button } from "@/components/ui/button";
import { getUserLogin } from "@/utils/api/User";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const AdminLayout = ({ children }) => {
  const navItems = [{ name: "Home", href: "/dashboard/admin" }];

  const [user, setUser] = useState({ name: "", points: 0 });

  useEffect(() => {
    const fetchUserLogin = async () => {
      const user = await getUserLogin(localStorage.getItem("accessToken"));
      setUser(user);
    };
    fetchUserLogin();
  }, []);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.replace("/");
  };
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-[#eee]">
      <ToastContainer />
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Hi, {user.name ?? user.username}
          </span>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      <div className="flex flex-1">
        <nav className="w-48 bg-white p-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-md font-medium ${
                pathname === item.href
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;

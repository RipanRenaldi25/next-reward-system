"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { createAdmin } from "@/utils/api/User";

export default function Home() {
  useEffect(() => {
    const seedAdmin = async () => {
      createAdmin();
    };
    seedAdmin();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Selamat Datang!</h1>
        <p className="text-gray-600">
          Silakan login atau daftar untuk melanjutkan.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Register</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

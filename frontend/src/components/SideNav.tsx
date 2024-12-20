"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; 
import Image from "next/image";

interface DecodedToken {
  username: string;
  is_admin: number;
  exp: number;
}

export default function SideNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [is_admin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found. Redirecting to /login...");
      router.push("/login");
      return;
    }

    try {
      if (token.split(".").length !== 3) {
        throw new Error("Invalid token format");
      }

      const decoded: DecodedToken = jwtDecode(token);


      if (decoded.exp * 1000 < Date.now()) {
        console.log("Token expired. Redirecting to /login...");
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      const adminStatus = decoded.is_admin === 1;
      
      setIsAdmin(adminStatus);
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("token");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login"); 
  };

  if (loading) {
    return null; 
  }

  return (
    <aside className="bg-gray-800 text-white h-full flex flex-col p-4">
      <h1 className="text-2xl pl-4 font-bold mb-6">Menu</h1>
      <nav className="flex flex-col gap-4">
        <Link
          href="/principal"
          className={`px-4 py-2 rounded hover:bg-gray-700 flex items-center ${
            pathname === "/principal" ? "bg-gray-700" : ""
          }`}
        >
          <Image
            src="/home.svg"
            alt="Home Icon"
            width={24}
            height={24}
            className="mr-2"
          />
          Home
        </Link>
        <Link
          href="/principal/events"
          className={`px-4 py-2 rounded hover:bg-gray-700 flex items-center ${
            pathname === "/principal/events" ? "bg-gray-700" : ""
          }`}
        >
          <Image
            src="/ticket.svg"
            alt="Events Icon"
            width={24}
            height={24}
            className="mr-2"
          />
          Events
        </Link>
        {is_admin && (
          <Link
            href="/principal/admin"
            className={`px-4 py-2 rounded hover:bg-gray-700 flex items-center ${
              pathname === "/principal/admin" ? "bg-gray-700" : ""
            }`}
          >
            <Image
              src="/admin.svg"
              alt="Admin Icon"
              width={24}
              height={24}
              className="mr-2"
            />
            Admin
          </Link>
        )}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Log out
      </button>
    </aside>
  );
}

"use client";

import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import Image from "next/image";
interface DecodedToken {
  username: string;
  email: string;
  exp: number;
}

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decodificar el token y extraer la información del usuario
        const decoded: DecodedToken = jwtDecode(token);
        setUserInfo(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserInfo(null);
      }
    }
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>; // Muestra un loader mientras se obtiene la informacion
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Welcome, {userInfo.username}! Are you ready to book your tickets? ❤️‍🔥</h1>
      <p className="text-lg text-gray-600">Email: {userInfo.email}</p>
      <p className="mt-4 text-gray-500">
       <Image
       
        src="/ticket.webp"
        alt="Event Image"
        width={1000}
        height={1000}

       />
        
      </p>
    </div>
  );
}

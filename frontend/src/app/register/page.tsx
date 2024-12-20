"use client";
import Link from "next/link";
import '../globals.css';
import API_BASE_URL from "../utils/apiConfig";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    
    const [message, setMessage] = useState("");
    const router = useRouter();
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData);

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        });

        if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setMessage("User registered successfully!");
        router.push("/principal");
        
        } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Something went wrong"}`);
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        setMessage(`Error: ${errorMessage}`);
    }
    };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Create an Account</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full px-4 py-2 bg-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 bg-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 bg-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Register
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-400">{message}</p>}
        

        {/* Link to Login */}
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

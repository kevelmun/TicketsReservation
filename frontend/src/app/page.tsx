import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-8">
      <main className="flex flex-col items-center gap-8 max-w-md text-center">
        <h1 className="text-3xl font-bold">
          Welcome to Ticket System
        </h1>
        <p className="text-lg text-gray-300">
          Get ready to experience amazing events! Please login or register to start booking your tickets now.
        </p>
        <div className="flex gap-4">
          <Link href="/login">
            <button className="px-6 py-2 bg-purple-600 rounded hover:bg-purple-700">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="px-6 py-2 bg-pink-600 rounded hover:bg-pink-700">
              Register
            </button>
          </Link>
        </div>
      </main>
      <footer className="mt-16 text-gray-400">
        Be ready to live the experience ❤️!!
      </footer>
    </div>
  );
}

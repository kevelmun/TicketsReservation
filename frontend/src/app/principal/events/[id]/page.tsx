"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API_BASE_URL from "../../../utils/apiConfig";

interface Event {
  name: string;
  description: string;
  date: string;
  location: string;
  total_tickets: number;
  available_tickets: number;
}

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState(1); // Cantidad de tickets a reservar
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/events/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        } else {
          console.error("Failed to fetch event details");
          router.push("/principal/events");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
        router.push("/principal/events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, router]);

  const handleReservation = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          event_id: id, // ID del evento
          tickets, // Cantidad de tickets a reservar
        }),
      });

      if (response.ok) {
        setMessage("Reservation successful!");
        setEvent((prev) =>
          prev
            ? { ...prev, available_tickets: prev.available_tickets - tickets }
            : null
        );
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error making reservation:", error);
      setMessage("Error: Unable to make reservation");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading event details...</div>;
  }

  if (!event) {
    return <div className="text-center mt-10">Event not found.</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 text-purple-700">{event.name}</h1>
      <p className="text-lg text-gray-800 mb-4">{event.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 mb-6">
        <p className="flex items-center">
          <span className="font-semibold">📅 Date:</span>&nbsp;
          {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="flex items-center">
          <span className="font-semibold">📍 Location:</span>&nbsp;
          {event.location}
        </p>
        <p className="flex items-center">
          <span className="font-semibold">🎟️ Total Tickets:</span>&nbsp;
          {event.total_tickets}
        </p>
        <p className="flex items-center">
          <span className="font-semibold">✅ Available Tickets:</span>&nbsp;
          {event.available_tickets}
        </p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <label htmlFor="tickets" className="font-semibold text-gray-800">
          Tickets:
        </label>
        <input
          type="number"
          id="tickets"
          value={tickets}
          onChange={(e) => setTickets(Math.max(1, Math.min(event.available_tickets, Number(e.target.value))))}
          className="w-20 px-2 py-1 border border-gray-300 rounded"
          min="1"
          max={event.available_tickets}
        />
      </div>

      <button
        onClick={handleReservation}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
      >
        Reserve Tickets
      </button>

      {message && (
        <p className="mt-4 text-center text-gray-800 font-semibold">{message}</p>
      )}
    </div>
  );
}

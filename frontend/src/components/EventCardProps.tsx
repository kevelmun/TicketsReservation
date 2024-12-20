import Link from "next/link";

interface EventCardProps {
  event: {
    id: string; 
    name: string;
    description: string;
    date: string;
    location: string;
    total_tickets: number;
    available_tickets: number;
  };
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/principal/events/${event.id}`}>
      <div className="ease overflow-hidden rounded-2xl border-2 border-gray-300 bg-white shadow-md shadow-slate-400 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
        <div className="p-5">
          
          <h3 className="font-title text-xl font-bold tracking-wide text-gray-800 dark:text-white">
            {event.name}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            📅 {new Date(event.date).toLocaleDateString()} | 📍 {event.location}
          </p>
          
          <p className="text-md my-3 truncate text-gray-700 dark:text-gray-300">
            {event.description}
          </p>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            🎟️ {event.available_tickets}/{event.total_tickets} tickets available
          </p>
        </div>
      </div>
    </Link>
  );
}

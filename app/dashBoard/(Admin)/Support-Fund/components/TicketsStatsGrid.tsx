import { MessageCircle, Clock, AlertCircle } from "lucide-react";
import TicketStatCard from "./TicketStatCard";

export default function TicketsStatsGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <TicketStatCard
        title="Total Tickets"
        value={4}
        icon={<MessageCircle />}
        color="text-blue-600"
      />

      <TicketStatCard
        title="Open Tickets"
        value={3}
        icon={<Clock />}
        color="text-orange-500"
      />

      <TicketStatCard
        title="High Priority"
        value={2}
        icon={<AlertCircle />}
        color="text-red-500"
      />
    </div>
  );
}

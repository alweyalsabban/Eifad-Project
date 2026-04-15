import type { Ticket } from "../types";

type Props = {
  ticket: Ticket;
  onView: (ticket: Ticket) => void;
};

function priorityColor(priority: Ticket["priority"]) {
  switch (priority) {
    case "High":
      return "text-red-500";
    case "Medium":
      return "text-orange-500";
    case "Low":
      return "text-blue-500";
  }
}

function statusBadge(status: Ticket["status"]) {
  return status === "مفتوح"
    ? "bg-orange-100 text-orange-600"
    : "bg-green-100 text-green-600";
}

export default function TicketRow({ ticket, onView }: Props) {
  return (
    <tr className="border-t text-sm">
      <td className="px-4 py-3 text-right whitespace-nowrap">{ticket.user}</td>
      <td className="px-4 py-3 whitespace-nowrap">{ticket.type}</td>

      <td className="px-4 py-3">
        <p className="font-medium text-slate-800">{ticket.subject}</p>
        <p className="mt-1 line-clamp-1 text-slate-500">{ticket.message}</p>
      </td>

      <td className="px-4 py-3 whitespace-nowrap text-slate-600">
        {ticket.date}
      </td>

      <td className={`px-4 py-3 font-medium ${priorityColor(ticket.priority)}`}>
        {ticket.priority}
      </td>

      <td className="px-4 py-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(ticket.status)}`}
        >
          {ticket.status}
        </span>
      </td>

      <td className="px-4 py-3">
        <button
          type="button"
          onClick={() => onView(ticket)}
          className="rounded-lg border border-slate-200 px-4 py-1.5 text-sm font-medium transition hover:bg-slate-50"
        >
          View
        </button>
      </td>
    </tr>
  );
}

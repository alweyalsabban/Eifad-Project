"use client";

import { useState } from "react";
import TicketRow from "./TicketRow";
import TicketDetailsModal from "./TicketDetailsModal";
import type { Ticket } from "../types";

const initialTickets: Ticket[] = [
  {
    id: 1,
    user: "Ahmed Hassan",
    email: "ahmed@example.com",
    type: "Account Verification",
    subject: "Unable to verify my account",
    message:
      "I uploaded all required documents but verification is pending for 5 days.",
    date: "2024-03-10",
    priority: "High",
    status: "مفتوح",
  },
  {
    id: 2,
    user: "Sara Ali",
    email: "sara@example.com",
    type: "Job Application",
    subject: "Cannot submit application",
    message: "I cannot submit my application for Senior Developer position.",
    date: "2024-03-09",
    priority: "Medium",
    status: "مفتوح",
  },
  {
    id: 3,
    user: "Mohamed Ibrahim",
    email: "mohamed@example.com",
    type: "Payment Issue",
    subject: "Premium subscription not activated",
    message: "I paid for premium but features are still locked.",
    date: "2024-03-08",
    priority: "High",
    status: "محلول",
  },
  {
    id: 4,
    user: "Tech Solutions Ltd",
    email: "support@techsolutions.com",
    type: "Company Profile",
    subject: "Update company information",
    message: "We need help updating our company address and contact details.",
    date: "2024-03-07",
    priority: "Low",
    status: "مفتوح",
  },
];

export default function TicketsTable() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [openModal, setOpenModal] = useState(false);

  function handleView(ticket: Ticket) {
    setSelectedTicket(ticket);
    setOpenModal(true);
  }

  function handleResolve(ticketId: number) {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: "محلول" } : ticket,
      ),
    );

    setSelectedTicket((prev) =>
      prev && prev.id === ticketId ? { ...prev, status: "محلول" } : prev,
    );

    console.log("Ticket resolved:", ticketId);
  }

  function handleEscalate(ticketId: number) {
    console.log("Ticket escalated:", ticketId);
  }

  function handleReply(ticketId: number, reply: string) {
    console.log("Reply sent:", { ticketId, reply });
  }

  return (
    <>
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
        <table className="w-full text-right">
          <thead>
            <tr className="text-sm text-slate-500">
              <th className="px-4 py-3">المستخدم</th>
              <th className="px-4 py-3">نوع المشكلة</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">التاريخ</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">الحالة</th>
              <th className="px-4 py-3">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <TicketRow key={ticket.id} ticket={ticket} onView={handleView} />
            ))}
          </tbody>
        </table>
      </div>

      <TicketDetailsModal
        open={openModal}
        ticket={selectedTicket}
        onClose={() => setOpenModal(false)}
        onResolve={handleResolve}
        onEscalate={handleEscalate}
        onReply={handleReply}
      />
    </>
  );
}

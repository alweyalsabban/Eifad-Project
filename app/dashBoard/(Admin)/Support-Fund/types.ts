export type TicketPriority = "High" | "Medium" | "Low";
export type TicketStatus = "مفتوح" | "محلول";

export type Ticket = {
  id: number;
  user: string;
  email: string;
  type: string;
  subject: string;
  message: string;
  date: string;
  priority: TicketPriority;
  status: TicketStatus;
};

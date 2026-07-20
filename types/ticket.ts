export interface Ticket {
  id: string;

  ticketId: string;

  customerName: string;

  customerEmail: string;

  title: string;

  description: string;

  priority: "LOW" | "MEDIUM" | "HIGH";

  status: "OPEN" | "IN_PROGRESS" | "CLOSED";

  createdAt: string;

  updatedAt: string;
}

export interface DashboardStats {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
}
export interface CreateTicketFormData {
  customerName: string;
  customerEmail: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
}
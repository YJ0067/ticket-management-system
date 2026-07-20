export const TICKET_STATUS = [
  "OPEN",
  "IN_PROGRESS",
  "CLOSED",
] as const;

export type TicketStatus = typeof TICKET_STATUS[number];

export const PRIORITIES = [
  "LOW",
  "MEDIUM",
  "HIGH",
] as const;

export type TicketPriority = typeof PRIORITIES[number];
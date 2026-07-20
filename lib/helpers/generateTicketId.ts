export function generateTicketId() {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `TKT-${random}`;
}
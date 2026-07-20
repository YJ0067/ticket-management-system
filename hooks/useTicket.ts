import { useQuery } from "@tanstack/react-query";
import { Ticket } from "@/types/ticket";

export function useTicket(ticketId: string) {
  return useQuery({
    queryKey: ["ticket", ticketId],

    queryFn: async () => {
      const response = await fetch(`/api/tickets/${ticketId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch ticket");
      }

      return response.json() as Promise<Ticket>;
    },

    enabled: !!ticketId,
  });
}
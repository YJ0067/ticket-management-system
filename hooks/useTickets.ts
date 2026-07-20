import { useQuery } from "@tanstack/react-query";
import { Ticket } from "@/types/ticket";

interface UseTicketsProps {
  search?: string;
  status?: string;
  page?: number;
}

interface TicketResponse {
  tickets: Ticket[];
  totalTickets: number;
  currentPage: number;
  totalPages: number;
}

export function useTickets({
  search,
  status,
  page = 1,
}: UseTicketsProps = {}) {
  return useQuery({
    queryKey: ["tickets", search, status, page],

    queryFn: async () => {
      const params = new URLSearchParams();

      if (search?.trim()) {
        params.append("search", search);
      }

      if (status && status !== "ALL") {
        params.append("status", status);
      }

      params.append("page", page.toString());

      const response = await fetch(
        `/api/tickets?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }

      return response.json() as Promise<TicketResponse>;
    },

    staleTime: 1000 * 30,
  });
}
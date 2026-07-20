"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteTicket(
  ticketId: string,
  onSuccess?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete ticket");
      }

      return response.json();
    },

    onSuccess: () => {
      toast.success("Ticket deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      onSuccess?.();
    },

    onError: () => {
      toast.error("Failed to delete ticket");
    },
  });
}
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { CreateTicketFormData } from "@/types/forms";

export function useCreateTicket(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTicketFormData) => {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create ticket");
      }

      return response.json();
    },

    onSuccess: () => {
      toast.success("Ticket created successfully");

      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      onSuccess?.();
    },

    onError: () => {
      toast.error("Failed to create ticket");
    },
  });
}
"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

interface CreateNoteData {
  ticketId: string;
  text: string;
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: CreateNoteData
    ) => {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      return response.json();
    },

    onSuccess: (_, variables) => {
      toast.success("Note added");

      queryClient.invalidateQueries({
        queryKey: ["notes", variables.ticketId],
      });
    },

    onError: () => {
      toast.error("Failed to add note");
    },
  });
}
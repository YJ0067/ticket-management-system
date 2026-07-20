"use client";

import { useQuery } from "@tanstack/react-query";

export interface Note {
  id: string;
  text: string;
  createdAt: string;
}

export function useNotes(ticketId: string) {
  return useQuery({
    queryKey: ["notes", ticketId],

    queryFn: async () => {
      const response = await fetch(
        `/api/notes?ticketId=${ticketId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      return response.json() as Promise<Note[]>;
    },

    enabled: !!ticketId,
  });
}
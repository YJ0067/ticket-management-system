"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useCreateNote } from "@/hooks/useCreateNote";

interface NoteFormProps {
  ticketId: string;
}

export default function NoteForm({
  ticketId,
}: NoteFormProps) {
  const [text, setText] = useState("");

  const mutation = useCreateNote();

  const handleSubmit = () => {
    if (!text.trim()) return;

    mutation.mutate(
      {
        ticketId,
        text,
      },
      {
        onSuccess: () => {
          setText("");
        },
      }
    );
  };

  return (
    <div className="space-y-4">
      <Textarea
        rows={4}
        placeholder="Write a note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={
            mutation.isPending || !text.trim()
          }
        >
          {mutation.isPending
            ? "Adding..."
            : "Add Note"}
        </Button>
      </div>
    </div>
  );
}
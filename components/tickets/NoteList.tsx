"use client";

import { useNotes } from "@/hooks/useNotes";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface NoteListProps {
  ticketId: string;
}

export default function NoteList({
  ticketId,
}: NoteListProps) {
  const {
    data: notes,
    isLoading,
  } = useNotes(ticketId);

  if (isLoading) {
    return <p>Loading notes...</p>;
  }

  if (!notes || notes.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No notes yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <Card key={note.id}>
          <CardContent className="space-y-3 py-4">
            <p className="whitespace-pre-wrap">
              {note.text}
            </p>

            <p className="text-xs text-muted-foreground">
              {new Date(
                note.createdAt
              ).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
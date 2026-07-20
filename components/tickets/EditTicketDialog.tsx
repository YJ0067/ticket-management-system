"use client";

import { useState } from "react";

import { Ticket } from "@/types/ticket";
import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import TicketForm from "./TicketForm";

interface EditTicketDialogProps {
  ticket: Ticket;
}

export default function EditTicketDialog({
  ticket,
}: EditTicketDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={<Button>
  <Pencil className="mr-2 h-4 w-4" />
  Edit Ticket
</Button>}
      />

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Edit Support Ticket
          </DialogTitle>
        </DialogHeader>

        <TicketForm
          ticket={ticket}
          isEditing
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
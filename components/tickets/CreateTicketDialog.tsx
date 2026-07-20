"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TicketForm from "./TicketForm";

import { Button } from "@/components/ui/button";

export default function CreateTicketDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button>+ New Ticket</Button>}
      />

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Create Support Ticket
          </DialogTitle>
        </DialogHeader>

       <TicketForm onSuccess={() => setOpen(false)} />  
      </DialogContent>
    </Dialog>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Trash2,
} from "lucide-react";
import TicketDetailsSkeleton from "./TicketDetailsSkeleton";

import { useTicket } from "@/hooks/useTicket";
import { useDeleteTicket } from "@/hooks/useDeleteTicket";

import PriorityBadge from "@/components/tickets/PriorityBadge";
import StatusBadge from "@/components/tickets/StatusBadge";
import EditTicketDialog from "./EditTicketDialog";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TicketDetailsProps {
  ticketId: string;
}

export default function TicketDetails({
  ticketId,
}: TicketDetailsProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const deleteMutation = useDeleteTicket(
    ticketId,
    () => router.push("/")
  );

  const {
    data: ticket,
    isLoading,
    error,
  } = useTicket(ticketId);

  if (isLoading) {
  return <TicketDetailsSkeleton />;
}

  if (error || !ticket) {
    return (
      <div className="mx-auto max-w-6xl p-8 text-red-500">
        Ticket not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background ">
      <div className="mx-auto max-w-6xl p-8">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="flex items-center gap-3">

            <EditTicketDialog ticket={ticket} />

            <AlertDialog
              open={open}
              onOpenChange={setOpen}
            >
              <AlertDialogTrigger
  render={
    <Button variant="destructive">
      <Trash2 className="mr-2 h-4 w-4" />
      Delete
    </Button>
  }
/>

              <AlertDialogContent>

                <AlertDialogHeader>

                  <AlertDialogTitle>
                    Delete Ticket?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    This action cannot be undone.
                    The ticket and all associated
                    notes will be permanently deleted.
                  </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                  <AlertDialogCancel>
                    Cancel
                  </AlertDialogCancel>

                  <AlertDialogAction
                    onClick={() =>
                      deleteMutation.mutate()
                    }
                    disabled={
                      deleteMutation.isPending
                    }
                  >
                    {deleteMutation.isPending
                      ? "Deleting..."
                      : "Delete"}
                  </AlertDialogAction>

                </AlertDialogFooter>

              </AlertDialogContent>

            </AlertDialog>

          </div>

        </div>

        <h1 className="text-3xl font-bold">
          {ticket.ticketId}
        </h1>

        <p className="mt-2 text-muted-foreground">
          Support Ticket Details
        </p>

        {/* Top Grid */}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <Card>
            <CardHeader>
              <CardTitle>
                Customer Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">

              <div>
                <p className="text-sm text-muted-foreground">
                  Name
                </p>

                <p className="font-medium">
                  {ticket.customerName}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Email
                </p>

                <p className="font-medium">
                  {ticket.customerEmail}
                </p>
              </div>

            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Ticket Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">

              <div>
                <p className="text-sm text-muted-foreground">
                  Status
                </p>

                <StatusBadge
                  status={ticket.status}
                />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Priority
                </p>

                <PriorityBadge
                  priority={ticket.priority}
                />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Created
                </p>

                <p>
                  {new Date(
                    ticket.createdAt
                  ).toLocaleString()}
                </p>
              </div>

            </CardContent>
          </Card>

        </div>

        {/* Title */}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              Issue Title
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-lg font-medium">
              {ticket.title}
            </p>
          </CardContent>
        </Card>

        {/* Description */}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              Description
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="whitespace-pre-wrap leading-7 text-lg">
              {ticket.description}
            </p>
          </CardContent>
        </Card>

        {/* Notes */}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              Notes
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <NoteForm ticketId={ticket.id} />

            <NoteList ticketId={ticket.id} />
          </CardContent>
        </Card>

      </div>
    </main>
  );
}
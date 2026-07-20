"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useTickets } from "@/hooks/useTickets";

import TicketTableSkeleton from "./TicketTableSkeleton";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

interface TicketTableProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function TicketTable({
  search,
  status,
}: TicketTableProps) {
  const router = useRouter();

  const [page, setPage] = useState(1);

  useEffect(() => {
  setPage(1);
}, [search, status]);

  const {
    data,
    isLoading,
    error,
  } = useTickets({
    search,
    status,
    page,
  });

  const tickets = data?.tickets ?? [];
  const totalPages = data?.totalPages ?? 1;

  if (isLoading) {
    return <TicketTableSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-red-500">
          Failed to load tickets.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="overflow-x-auto p-0">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tickets.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-10 text-center text-muted-foreground"
                >
                  <div className="space-y-2">
                    <p className="text-lg font-medium">
                      No tickets found
                    </p>

                    <p className="text-sm text-gray-400">
                      Try changing your search or status filter.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <TableRow
                  key={ticket.id}
                  className="cursor-pointer hover:bg-background"
                  onClick={() =>
                    router.push(`/tickets/${ticket.ticketId}`)
                  }
                >
                  <TableCell className="font-medium">
                    {ticket.ticketId}
                  </TableCell>

                  <TableCell>
                    {ticket.customerName}
                  </TableCell>

                  <TableCell>
                    {ticket.customerEmail}
                  </TableCell>

                  <TableCell>
                    {ticket.title}
                  </TableCell>

                  <TableCell>
                    <PriorityBadge
                      priority={ticket.priority}
                    />
                  </TableCell>

                  <TableCell>
                    <StatusBadge
                      status={ticket.status}
                    />
                  </TableCell>

                  <TableCell>
                    {new Date(
                      ticket.createdAt
                    ).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}

        <div className="flex items-center justify-between border-t p-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() =>
              setPage((prev) => prev - 1)
            }
          >
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() =>
              setPage((prev) => prev + 1)
            }
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
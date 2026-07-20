"use client";

import { Input } from "@/components/ui/input";
import CreateTicketDialog from "./CreateTicketDialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TicketToolbarProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function TicketToolbar({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: TicketToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 gap-4">
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tickets..."
          className="max-w-sm"
        />

       <Select
  value={status}
  onValueChange={(value) => {
    onStatusChange(value ?? "ALL");
  }}
>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">
              All
            </SelectItem>

            <SelectItem value="OPEN">
              Open
            </SelectItem>

            <SelectItem value="IN_PROGRESS">
              In Progress
            </SelectItem>

            <SelectItem value="CLOSED">
              Closed
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CreateTicketDialog />
    </div>
  );
}
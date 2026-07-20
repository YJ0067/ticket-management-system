"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateTicket } from "@/hooks/useUpdateTicket";


import { CreateTicketFormData } from "@/types/forms";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  TicketSchema,
  TicketFormSchema,
} from "@/lib/validation";

import { useCreateTicket } from "@/hooks/useCreateTicket";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Controller } from "react-hook-form";

import { Ticket } from "@/types/ticket";

interface TicketFormProps {
  onSuccess: () => void;
  ticket?: Ticket;
  isEditing?: boolean;
}

export default function TicketForm({
  onSuccess,
  ticket,
  isEditing = false,
}: TicketFormProps) {
  const {
  register,
  control,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<CreateTicketFormData>({
   resolver: zodResolver(TicketFormSchema),


    defaultValues: {
  customerName: ticket?.customerName ?? "",
  customerEmail: ticket?.customerEmail ?? "",
  title: ticket?.title ?? "",
  description: ticket?.description ?? "",
  priority: ticket?.priority ?? "MEDIUM",
  status: ticket?.status ?? "OPEN",
},
  });

  const createMutation = useCreateTicket(onSuccess);

const updateMutation = useUpdateTicket(
  ticket?.ticketId ?? "",
  onSuccess
);

const mutation = isEditing
  ? updateMutation
  : createMutation;

  const onSubmit = (data: CreateTicketFormData) => {
  mutation.mutate(data as any, {
    onSuccess: () => {
      reset();
    },
  });
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Customer Name */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Customer Name
        </label>

        <Input
          {...register("customerName")}
          placeholder="John Doe"
        />

        {errors.customerName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.customerName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <Input
          type="email"
          {...register("customerEmail")}
          placeholder="john@example.com"
        />

        {errors.customerEmail && (
          <p className="mt-1 text-sm text-red-500">
            {errors.customerEmail.message}
          </p>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Title
        </label>

        <Input
          {...register("title")}
          placeholder="Unable to login"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>

        <Textarea
          rows={5}
          {...register("description")}
          placeholder="Describe the issue..."
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Priority */}
<div>
  <label className="mb-2 block text-sm font-medium">
    Priority
  </label>

  <Controller
    control={control}
    name="priority"
    render={({ field }) => (
      <Select
        value={field.value}
        onValueChange={field.onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Priority" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="LOW">
            Low
          </SelectItem>

          <SelectItem value="MEDIUM">
            Medium
          </SelectItem>

          <SelectItem value="HIGH">
            High
          </SelectItem>
        </SelectContent>
      </Select>
    )}
  />

  {isEditing && (
  <div>
    <label className="mb-2 block text-sm font-medium">
      Status
    </label>

    <Controller
      control={control}
      name="status"
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={(value) => {
            if (value) field.onChange(value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>

          <SelectContent>
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
      )}
    />
  </div>
)}

  {errors.priority && (
    <p className="mt-1 text-sm text-red-500">
      {errors.priority.message}
    </p>
  )}
</div>

      <Button
        type="submit"
        className="w-full"
        disabled={mutation.isPending}
      >
        {mutation.isPending
  ? isEditing
    ? "Updating..."
    : "Creating..."
  : isEditing
    ? "Update Ticket"
    : "Create Ticket"}
      </Button>
    </form>
  );
}
import prisma from "@/lib/prisma";
import { generateTicketId } from "@/lib/helpers/generateTicketId";
import {
  TicketSchema,
  UpdateTicketSchema,
} from "@/lib/validation";
import { z } from "zod";
import {
  TicketPriority,
  TicketStatus,
} from "@/lib/constants";



type CreateTicketInput = z.infer<typeof TicketSchema>;
type UpdateTicketInput = z.infer<typeof UpdateTicketSchema>;

export async function createTicket(data: CreateTicketInput) {
  const validatedData = TicketSchema.parse(data);

  const ticket = await prisma.ticket.create({
    data: {
      ...validatedData,
      ticketId: generateTicketId(),
    },
  });

  return ticket;
}

export async function getTicketById(ticketId: string) {
  const allTickets = await prisma.ticket.findMany();

  console.log("Searching for:", ticketId);
  console.log(
    "Available ticketIds:",
    allTickets.map((t: { ticketId: string }) => t.ticketId)
  );

  return prisma.ticket.findUnique({
    where: {
      ticketId,
    },
  });
}

export async function updateTicket(
  ticketId: string,
  data: UpdateTicketInput
) {
  const validatedData = UpdateTicketSchema.parse(data);

  return prisma.ticket.update({
    where: {
      ticketId,
    },
    data: validatedData,
  });
}



export async function getTickets(
  search?: string,
  status?: TicketStatus,
  page: number = 1,
  limit: number = 5
) {
  const where = {
    AND: [
      status
        ? {
            status,
          }
        : {},

      search
        ? {
            OR: [
              {
                ticketId: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                customerName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                customerEmail: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
    ],
  };

  const totalTickets = await prisma.ticket.count({
    where,
  });

  const tickets = await prisma.ticket.findMany({
    where,

    orderBy: {
      createdAt: "desc",
    },

    skip: (page - 1) * limit,

    take: limit,
  });

  return {
    tickets,
    totalTickets,
    currentPage: page,
    totalPages: Math.ceil(totalTickets / limit),
  };
}

export async function deleteTicket(ticketId: string) {
  return prisma.ticket.delete({
    where: {
      ticketId,
    },
  });
}
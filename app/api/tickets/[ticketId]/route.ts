import {
  successResponse,
  errorResponse,
} from "@/lib/api-response";

import { getErrorMessage } from "@/lib/helpers/handle-error";

import {
  getTicketById,
  updateTicket,
  deleteTicket,
} from "@/services/ticket-service";

import { UpdateTicketSchema } from "@/lib/validation";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ ticketId: string }>;
  }
) {
  try {
    const { ticketId } = await params;

    const ticket = await getTicketById(ticketId);

    if (!ticket) {
      return errorResponse(
        "Ticket not found",
        404
      );
    }

    return successResponse(ticket);
  } catch (error) {
    console.error(error);

    return errorResponse(
      getErrorMessage(error),
      500
    );
  }
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ ticketId: string }>;
  }
) {
  try {
    const { ticketId } = await params;

    const body = await request.json();

    const validatedData =
      UpdateTicketSchema.parse(body);

    const ticket = await updateTicket(
      ticketId,
      validatedData
    );

    return successResponse(ticket);
  } catch (error) {
    console.error(error);

    return errorResponse(
      getErrorMessage(error),
      400
    );
  }
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ ticketId: string }>;
  }
) {
  try {
    const { ticketId } = await params;

    await deleteTicket(ticketId);

    return successResponse({
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return errorResponse(
      getErrorMessage(error),
      400
    );
  }
}
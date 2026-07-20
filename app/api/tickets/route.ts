import {
  successResponse,
  errorResponse,
} from "@/lib/api-response";

import { getErrorMessage } from "@/lib/helpers/handle-error";

import {
  createTicket,
  getTickets,
} from "@/services/ticket-service";

import { TicketStatus } from "@/lib/constants";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const search =
      searchParams.get("search") ?? undefined;

    const status = searchParams.get("status") as
      | TicketStatus
      | undefined;

    const page = Number(
      searchParams.get("page") ?? "1"
    );

    const data = await getTickets(
      search,
      status,
      page,
      5
    );

    return successResponse(data);
  } catch (error) {
    console.error(error);

    return errorResponse(
      getErrorMessage(error),
      500
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const ticket = await createTicket(body);

    return successResponse(ticket, 201);
  } catch (error) {
    console.error(error);

    return errorResponse(
      getErrorMessage(error),
      400
    );
  }
}
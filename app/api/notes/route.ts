import { NextRequest } from "next/server";

import {
  successResponse,
  errorResponse,
} from "@/lib/api-response";

import { getErrorMessage } from "@/lib/helpers/handle-error";

import {
  createNote,
  getNotes,
} from "@/services/note-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const ticketId = searchParams.get("ticketId");

    if (!ticketId) {
      return errorResponse("Ticket ID is required", 400);
    }

    const notes = await getNotes(ticketId);

    return successResponse(notes);
  } catch (error) {
    return errorResponse(getErrorMessage(error), 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { ticketId, text } = body;

    if (!ticketId || !text?.trim()) {
      return errorResponse(
        "Ticket ID and note text are required",
        400
      );
    }

    const note = await createNote(ticketId, text);

    return successResponse(note, 201);
  } catch (error) {
    return errorResponse(getErrorMessage(error), 500);
  }
}
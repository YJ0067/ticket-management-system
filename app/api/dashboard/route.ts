import {
  successResponse,
  errorResponse,
} from "@/lib/api-response";

import { getDashboardStats } from "@/services/dashboard-service";
import { getErrorMessage } from "@/lib/helpers/handle-error";

export async function GET() {
  try {
    const stats = await getDashboardStats();

    return successResponse(stats);
  } catch (error) {
    console.error(error);

    return errorResponse(
      getErrorMessage(error),
      500
    );
  }
}
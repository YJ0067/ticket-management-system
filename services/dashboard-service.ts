import prisma from "@/lib/prisma";

export async function getDashboardStats() {
  const [total, open, inProgress, closed] =
    await Promise.all([
      prisma.ticket.count(),

      prisma.ticket.count({
        where: {
          status: "OPEN",
        },
      }),

      prisma.ticket.count({
        where: {
          status: "IN_PROGRESS",
        },
      }),

      prisma.ticket.count({
        where: {
          status: "CLOSED",
        },
      }),
    ]);

  return {
    total,
    open,
    inProgress,
    closed,
  };
}
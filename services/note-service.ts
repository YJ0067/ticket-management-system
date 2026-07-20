import prisma from "@/lib/prisma";

export async function getNotes(ticketId: string) {
  return prisma.note.findMany({
    where: {
      ticketId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createNote(
  ticketId: string,
  text: string
) {
  return prisma.note.create({
    data: {
      ticketId,
      text,
    },
  });
}
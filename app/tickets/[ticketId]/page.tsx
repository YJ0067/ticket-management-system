import TicketDetails from "@/components/tickets/TicketDetails";

interface Props {
  params: Promise<{
    ticketId: string;
  }>;
}

export default async function TicketPage({
  params,
}: Props) {
  const { ticketId } = await params;

  return <TicketDetails ticketId={ticketId} />;
}
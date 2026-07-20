import { Badge } from "@/components/ui/badge";
import { TicketStatus } from "@/lib/constants";

interface StatusBadgeProps {
  status: TicketStatus;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const variants: Record<TicketStatus, string> = {
    OPEN:
      "bg-blue-100 text-blue-700 hover:bg-blue-100",

    IN_PROGRESS:
      "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",

    CLOSED:
      "bg-green-100 text-green-700 hover:bg-green-100",
  };

  return (
    <Badge className={variants[status]}>
      {status.replace("_", " ")}
    </Badge>
  );
}
import { Badge } from "@/components/ui/badge";
import { TicketPriority } from "@/lib/constants";

interface PriorityBadgeProps {
  priority: TicketPriority;
}

export default function PriorityBadge({
  priority,
}: PriorityBadgeProps) {
  const variants: Record<TicketPriority, string> = {
    LOW:
      "bg-gray-100 text-gray-700 hover:bg-gray-100",

    MEDIUM:
      "bg-orange-100 text-orange-700 hover:bg-orange-100",

    HIGH:
      "bg-red-100 text-red-700 hover:bg-red-100",
  };

  return (
    <Badge className={variants[priority]}>
      {priority}
    </Badge>
  );
}
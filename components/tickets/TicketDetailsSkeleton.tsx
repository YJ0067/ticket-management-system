import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TicketDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl p-8">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <Skeleton className="h-10 w-28" />

          <div className="flex gap-3">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>

        {/* Ticket ID */}

        <Skeleton className="h-9 w-56" />
        <Skeleton className="mt-3 h-5 w-64" />

        {/* Top Cards */}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <Skeleton className="mb-2 h-4 w-20" />
                <Skeleton className="h-5 w-48" />
              </div>

              <div>
                <Skeleton className="mb-2 h-4 w-20" />
                <Skeleton className="h-5 w-64" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-44" />
            </CardHeader>

            <CardContent className="space-y-6">

              <div>
                <Skeleton className="mb-2 h-4 w-16" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>

              <div>
                <Skeleton className="mb-2 h-4 w-16" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              <div>
                <Skeleton className="mb-2 h-4 w-20" />
                <Skeleton className="h-5 w-40" />
              </div>

            </CardContent>
          </Card>

        </div>

        {/* Title */}

        <Card className="mt-6">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>

          <CardContent>
            <Skeleton className="h-6 w-3/4" />
          </CardContent>
        </Card>

        {/* Description */}

        <Card className="mt-6">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>

          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>

        {/* Notes */}

        <Card className="mt-6">
          <CardHeader>
            <Skeleton className="h-6 w-20" />
          </CardHeader>

          <CardContent className="space-y-4">
            <Skeleton className="h-24 w-full rounded-lg" />

            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </CardContent>
        </Card>

      </div>
    </main>
  );
}
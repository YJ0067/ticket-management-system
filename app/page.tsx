"use client";

import { useEffect, useState } from "react";

import StatsCard from "@/components/dashboard/StatsCard";
import TicketTable from "@/components/tickets/TicketTable";
import TicketToolbar from "@/components/tickets/TicketToolbar";
import ThemeToggle from "@/components/theme-toggle";

import { useDebounce } from "@/hooks/useDebounce";

import type { DashboardStats } from "@/types/ticket";

import {
  ClipboardList,
  Circle,
  Clock3,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("/api/dashboard");

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data: DashboardStats = await response.json();

        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

 return (
  <main className="min-h-screen bg-background">
    <div className="mx-auto max-w-7xl p-8">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Ticket Management System
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage and track support tickets efficiently.
          </p>
        </div>

        <ThemeToggle />
      </div>

      {/* Dashboard Cards */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Tickets"
          value={stats.total}
          icon={ClipboardList}
        />

        <StatsCard
          title="Open"
          value={stats.open}
          icon={Circle}
        />

        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          icon={Clock3}
        />

        <StatsCard
          title="Closed"
          value={stats.closed}
          icon={CheckCircle2}
        />
      </div>

      {/* Toolbar & Table */}
      <div className="mt-10 space-y-6">
        <TicketToolbar
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />

        <TicketTable
          search={debouncedSearch}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />
      </div>

    </div>
  </main>
);
}
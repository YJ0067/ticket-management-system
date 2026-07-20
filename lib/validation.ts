import { z } from "zod";

export const TicketSchema = z.object({
  customerName: z
    .string()
    .min(2, "Customer name must be at least 2 characters")
    .max(100),

  customerEmail: z
    .string()
    .email("Invalid email address"),

  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export const UpdateTicketSchema = z.object({
  customerName: z
    .string()
    .min(2, "Customer name must be at least 2 characters")
    .max(100),

  customerEmail: z
    .string()
    .email("Invalid email address"),

  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
  ]),

  status: z.enum([
    "OPEN",
    "IN_PROGRESS",
    "CLOSED",
  ]),
});

export const TicketFormSchema = z.object({
  customerName: z
    .string()
    .min(2, "Customer name must be at least 2 characters")
    .max(100),

  customerEmail: z
    .string()
    .email("Invalid email address"),

  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
  ]),

  status: z.enum([
    "OPEN",
    "IN_PROGRESS",
    "CLOSED",
  ]),
});
# 🎫 Ticket Management System

A modern **Customer Support Ticket Management System** built with **Next.js 16**, **React Query**, **Prisma**, and **PostgreSQL**. The application enables support teams to efficiently create, manage, update, and track customer support tickets through a clean, responsive, and user-friendly interface.

**Live Demo:** https://ticket-management-system-q125.onrender.com

---

# 📌 Features

## Ticket Management
- Create support tickets
- View all tickets
- Update ticket details
- Delete tickets
- Automatic Ticket ID generation

## Customer Information
- Customer Name
- Customer Email
- Issue Title
- Issue Description

## Ticket Status
- Open
- In Progress
- Closed

## Priority Levels
- Low
- Medium
- High

## Search & Filtering
- Live debounced search
- Filter by ticket status
- Case-insensitive search
- Search across:
  - Ticket ID
  - Customer Name
  - Customer Email
  - Title
  - Description

## Notes System
- Add internal notes to tickets
- View chronological note history
- Automatically linked to each ticket

## Dashboard
- Total Tickets
- Open Tickets
- In Progress Tickets
- Closed Tickets

## UI/UX
- Responsive Design
- Dark Mode
- Loading Skeletons
- Toast Notifications
- Clean Card Layout
- Modern Table Design

---

# 🛠 Tech Stack

## Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React

## Backend
- Next.js Route Handlers
- Prisma ORM
- PostgreSQL (Supabase)

## State Management
- TanStack React Query

## Validation
- Zod

## Notifications
- Sonner

## Deployment
- Render

---

# 📂 Project Structure

```
app/
│
├── api/
│   ├── dashboard/
│   ├── notes/
│   └── tickets/
│
├── tickets/
│
components/
│
├── dashboard/
├── tickets/
└── ui/
│
hooks/
│
lib/
│
prisma/
│
services/
│
types/
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/YJ0067/ticket-management-system.git
```

```bash
cd ticket-management-system
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file.

```
DATABASE_URL=

DIRECT_URL=

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Generate Prisma Client

```bash
npx prisma generate
```

---

## Run Database Migration

```bash
npx prisma migrate dev
```

---

## Start Development Server

```bash
npm run dev
```

Application runs on

```
http://localhost:3000
```

---

# 🗄 Database Schema

## Ticket

- id
- ticketId
- customerName
- customerEmail
- title
- description
- priority
- status
- createdAt
- updatedAt

## Note

- id
- text
- createdAt
- ticketId

---

# 🔍 API Endpoints

## Tickets

| Method | Endpoint |
|---------|----------|
| GET | /api/tickets |
| POST | /api/tickets |
| GET | /api/tickets/:ticketId |
| PUT | /api/tickets/:ticketId |
| DELETE | /api/tickets/:ticketId |

---

## Notes

| Method | Endpoint |
|---------|----------|
| GET | /api/notes/:ticketId |
| POST | /api/notes |

---

## Dashboard

| Method | Endpoint |
|---------|----------|
| GET | /api/dashboard |

---

# 🧪 Validation

All incoming requests are validated using **Zod**.

Validation includes:

- Customer Name
- Email
- Title
- Description
- Priority
- Status

---

# ✨ Performance Optimizations

- React Query caching
- Query invalidation
- Debounced search
- Loading Skeletons
- Server-side Prisma queries
- Optimized API routes

---

# 📱 Responsive Design

The application is fully responsive and works across:

- Desktop
- Laptop
- Tablet
- Mobile

---

# 🌙 Additional Features

- Dark Mode
- Loading Skeletons
- Toast Notifications
- Search
- Status Filter
- Notes System
- Responsive Layout

---

# 📦 Deployment

The application is deployed on **Render**.

**Live URL**

https://ticket-management-system-q125.onrender.com

---

# 👨‍💻 Author

**Yash Jadhav**

GitHub:
https://github.com/YJ0067

---

# 📄 License

This project was developed as part of a technical assessment and is intended for educational and evaluation purposes.

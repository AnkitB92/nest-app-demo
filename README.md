# NestJS API Demo

A hands-on project I am building while learning NestJS and implementing its concepts through practical development.

The current focus is building REST APIs with NestJS, Prisma ORM and PostgreSQL.

## Current Progress

- NestJS modules, controllers and services.
- Users and Employees CRUD operations.
- Filtering users and employees by role.
- DTOs, TypeScript interfaces and request validation.
- Prisma ORM 7 integration with Neon PostgreSQL.
- Shared database module and service.
- Prisma error handling and appropriate HTTP exceptions.
- HTTP status handling, including `204 No Content` for successful deletion.

## Tech Stack

- **Backend:** NestJS 11, TypeScript
- **ORM:** Prisma 7
- **Database:** PostgreSQL
- **Database hosting:** Neon
- **Database adapter:** Prisma Neon Adapter
- **Validation:** class-validator, class-transformer

## Users API

In-memory CRUD implementation using TypeScript interfaces and DTOs.

| Method | Endpoint             | Description    |
| ------ | -------------------- | -------------- |
| POST   | `/users`             | Create user    |
| GET    | `/users`             | Get all users  |
| GET    | `/users?role=INTERN` | Filter by role |
| GET    | `/users/:id`         | Get user by ID |
| PATCH  | `/users/:id`         | Update user    |
| DELETE | `/users/:id`         | Delete user    |

Users are currently stored in memory and reset when the application restarts.

## Employee API

Database-backed CRUD implementation using Prisma ORM and PostgreSQL.

| Method | Endpoint                 | Description        |
| ------ | ------------------------ | ------------------ |
| POST   | `/employees`             | Create employee    |
| GET    | `/employees`             | Get all employees  |
| GET    | `/employees?role=INTERN` | Filter by role     |
| GET    | `/employees/:id`         | Get employee by ID |
| PATCH  | `/employees/:id`         | Update employee    |
| DELETE | `/employees/:id`         | Delete employee    |

Available employee roles: `ADMIN`, `ENGINEER`, `INTERN`.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/AnkitB92/nest-app-demo.git
cd nest-app-demo
```

Install dependencies:

```bash
npm install
```

Configure your environment variables in `.env`:

```env
DATABASE_URL="your_neon_pooled_connection_string"
DATABASE_URL_UNPOOLED="your_neon_direct_connection_string"
```

Apply migrations and generate the Prisma client:

```bash
npx prisma migrate dev --config prisma7.config.ts
npx prisma generate --config prisma7.config.ts
```

Start the development server:

```bash
npm run start:dev
```

The application runs on port `3000` by default.

## Project Status

This is an ongoing learning project. I will continue exploring NestJS, implementing new features and improving the existing code as I progress.

---

_Learning, experimenting and building things hands-on._

# NestJS API Demo

A hands-on project I am building while learning **NestJS** and putting its concepts into practice. The current focus is a REST API for managing employees, using **Prisma ORM 7** and **PostgreSQL on Neon**.

This is an ongoing learning project. I am building it incrementally, exploring how NestJS modules, controllers, services, database access, and error handling fit together.

## Current progress

### Employee API

The employee resource currently supports the following operations:

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/employees` | Create an employee |
| `GET` | `/employees` | Get all employees |
| `GET` | `/employees?role=INTERN` | Filter employees by role |
| `GET` | `/employees/:id` | Get an employee by ID |
| `PATCH` | `/employees/:id` | Update an employee |
| `DELETE` | `/employees/:id` | Delete an employee |

A successful delete returns **204 No Content**. Requests for missing employees return **404 Not Found**.

### Database and Prisma

- Prisma ORM 7 configured with the `prisma-client` generator.
- PostgreSQL database hosted on [Neon](https://neon.tech/).
- Prisma Neon driver adapter used by the NestJS database service.
- A shared `DatabaseModule` provides and exports `DatabaseService`.
- Prisma schema and migrations are checked into the repository.

The current `Employees` model contains:

| Field | Description |
| --- | --- |
| `id` | Auto-incrementing employee ID |
| `name` | Employee name |
| `email` | Unique email address |
| `role` | Employee role |
| `createdAt` | Creation timestamp |
| `updatedAt` | Last-update timestamp |

Available roles: `ADMIN`, `ENGINEER`, and `INTERN`.

### Error handling

The employee service includes a shared Prisma error handler for common cases:

- `P2002` — unique constraint violation, returned as **409 Conflict**.
- `P2025` — required record not found, returned as **404 Not Found**.
- `PrismaClientValidationError` — invalid Prisma input, returned as **400 Bad Request**.
- Other errors are rethrown for NestJS to handle.

## Tech stack

- **NestJS 11** — Node.js application framework
- **TypeScript** — application language
- **Prisma ORM 7** — database toolkit and ORM
- **PostgreSQL** — relational database
- **Neon** — hosted PostgreSQL
- **Prisma Neon adapter** — database driver adapter

## Getting started

### Prerequisites

- Node.js (developed with Node.js 22)
- npm
- A PostgreSQL database. This project currently uses Neon.

### 1. Clone the repository

```bash
git clone https://github.com/AnkitB92/nest-app-demo.git
cd nest-app-demo
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Configure environment variables

Copy the example file:

```bash
cp .env.example .env
```

Update `.env` with your Neon connection strings:

```env
# Pooled connection used by the NestJS application
DATABASE_URL="your_neon_pooled_connection_string"

# Direct/unpooled connection used by Prisma CLI migrations
DATABASE_URL_UNPOOLED="your_neon_unpooled_connection_string"
```

Do not commit your real `.env` file or share database credentials.

### 4. Apply migrations and generate the Prisma client

This project keeps its Prisma 7 CLI configuration in `prisma7.config.ts`, so pass that file using `--config`:

```bash
npx prisma migrate dev --config prisma7.config.ts
npx prisma generate --config prisma7.config.ts
```

### 5. Run the application

```bash
# Development with watch mode
npm run start:dev

# Build
npm run build

# Run the production build
npm run start:prod
```

The application uses port `3000` by default. Set `PORT` in the environment to use a different port.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run start:dev` | Start the application in watch mode |
| `npm run build` | Build the application |
| `npm run start:prod` | Run the production build |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:cov` | Generate test coverage |
| `npm run lint` | Run ESLint |
| `npm run format` | Format source and test files |

## Project status

The employee CRUD flow and its initial Prisma integration are in place. I will continue expanding the project as I work through more NestJS concepts, improve request validation, and add tests and other features.

---

*Learning NestJS by building, experimenting, and implementing things hands-on.*

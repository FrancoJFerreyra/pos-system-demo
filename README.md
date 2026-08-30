# POS System

A point-of-sale (POS) platform for small and medium-sized retailers, built from the ground up as a modular monolith. This project is based on my professional experience developing POS systems, and it is designed to practice and demonstrate modern full-stack development practices, architectural decisions, and end-to-end implementation.

The system is built with a modern PERN stack (PostgreSQL, Express, React, Node.js) and fully containerized with Docker.

## Goals

- Demonstrate end-to-end development of a production-like application.
- Apply modular monolith architecture with clear domain boundaries.
- Implement robust data validation and business rules.
- Use PostgreSQL as the primary database with Prisma ORM.
- Containerize the development environment with Docker Compose.
- Establish a foundation for future features: orders, inventory, reporting, offline-first, and observability.

## Tech Stack

- **Backend:** Node.js, Express, TypeScript, Zod, Prisma.
- **Frontend:** React, TypeScript.
- **Database:** PostgreSQL.
- **Containerization:** Docker, Docker Compose.
- **Package Manager:** npm or yarn.

## Architecture

The application follows a **modular monolith** architecture. Each module encapsulates its own domain logic, data access, and API routes, while sharing common infrastructure and configuration.

Current modules:

- **Catalog:** Products and categories.
- **Shared:** Configuration, database, utilities.

Future modules will include:

- Orders.
- Inventory.
- Payments.
- Reporting.
- Synchronization (offline-first).

## Features (MVP)

- Product CRUD.
- Category CRUD.
- Input validation with Zod.
- Domain errors with consistent HTTP responses.
- RESTful API endpoints.
- PostgreSQL database with Prisma ORM.
- Dockerized development environment.

## Getting Started

### Prerequisites

- Node.js 18+ (or latest LTS).
- npm or yarn.
- Docker and Docker Compose.

### Installation

Clone the repository and install dependencies:

```bash
# Frontend
cd frontend
npm install
# or
yarn install

# Backend
cd backend
npm install
# or
yarn install
```

### Database Setup

Start the PostgreSQL container using Docker Compose:

```bash
docker compose up -d
```

Run Prisma migrations:

```bash
cd backend
npx prisma migrate dev
```

### Running the Application

Start the development servers:

```bash
# Frontend
cd frontend
npm run dev
# or
yarn dev

# Backend
cd backend
npm run dev
# or
yarn dev
```

The application will be available at:

- Frontend: `http://localhost:3000` (or your configured port).
- Backend: `http://localhost:4000` (or your configured port).

## Project Structure

```text
pos-system/
  backend/
    src/
      modules/
        catalog/
          product/
          category/
      shared/
        database/
        config/
        utils/
  docker-compose.yml
  README.md
```

## API Endpoints (Current)

### Products

- `GET /products` — List all products.
- `GET /products/:id` — Get a product by ID.
- `POST /products` — Create a new product.
- `PATCH /products/:id` — Update a product.
- `DELETE /products/:id` — Delete a product.

### Categories

- `GET /categories` — List all categories.
- `GET /categories/:id` — Get a category by ID.
- `POST /categories` — Create a new category.
- `PATCH /categories/:id` — Update a category.
- `DELETE /categories/:id` — Delete a category.

## Validation

All API inputs are validated using **Zod** schemas to ensure type safety and data integrity. Validation errors are returned with clear messages for debugging and client-side handling.

## Domain Errors

> The API does not expose raw database or framework errors. Business and persistence failures are translated into typed **domain errors** with predictable HTTP status codes and JSON payloads.

The backend defines a hierarchy of errors in `backend/src/lib/errors.ts`, all extending `DomainError`:

| Error | HTTP | When |
| --- | --- | --- |
| `ValidationError` | 400 | Request body or query fails Zod validation |
| `ResourceNotFoundError` | 404 | A product or category ID does not exist |
| `ForeignKeyConstraintError` | 400 | A product references a non-existent category |
| `UniqueConstraintError` | 409 | Duplicate SKU or category name |

Additional error types (e.g. connection failures, timeouts) are defined for future use.

**How it works:**

1. Services throw domain errors for business cases (e.g. `GET /products/:id` when the record is missing).
2. `backend/src/lib/prisma-errors.ts` maps Prisma error codes (`P2002`, `P2003`, `P2025`, …) to the matching domain error.
3. The global error handler (`backend/src/middlewares/error-handler.ts`) serializes any `DomainError` and responds with the correct status code.

Example response (`404 Not Found`):

```json
{
  "name": "ResourceNotFoundError",
  "code": 404,
  "message": "Resource 'Product' was not found.",
  "data": { "resource": "Product", "query": { "id": 999 } }
}
```

## Database

- PostgreSQL is used as the primary database.
- Prisma ORM manages schema definitions, migrations, and type-safe queries.
- The database is fully containerized for reproducible local development.

## Development Guidelines

- Each module should encapsulate its own domain logic.
- Avoid direct cross-module database access; use service interfaces or events.
- Write tests for critical business logic and API endpoints.
- Document architectural decisions in ADRs (Architecture Decision Records).

## Next Steps

- Implement authentication and authorization.
- Add orders and inventory modules.
- Introduce reporting and analytics.
- Add offline-first capabilities for POS terminals.
- Implement observability (logging, metrics, tracing).
- Deploy to a cloud environment (AWS, GCP, or similar).

## Contributing

This project is primarily for learning and portfolio purposes. Contributions, suggestions, and feedback are welcome via issues or pull requests.

## License

This project is open source and available under the MIT License.
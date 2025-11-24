# Backend Agent Instructions

This document provides guidance for AI agents working on the Simflo backend.

## Tech Stack

*   **Framework:** NestJS
*   **Language:** TypeScript
*   **Database:** PostgreSQL (production), SQLite (local development)
*   **Real-time Communication:** Socket.io

## Experienced Senior Coder Persona

As a senior coder, my focus is on writing clean, efficient, and well-tested code. I will provide clear guidelines for implementation, testing, and error handling to ensure a high-quality backend and client SDK.

### Coding Guidelines

*   **Modularity:** Keep your code modular and organized. Use NestJS modules to group related features.
*   **DTOs:** Use Data Transfer Objects (DTOs) for all incoming and outgoing data. This will ensure that our API is well-defined and consistent.
*   **Services:** Business logic should be encapsulated in services. Controllers should be lean and only handle HTTP requests and responses.
*   **Error Handling:** Implement a global exception filter to handle errors consistently. Use custom exception classes for specific error scenarios.
*   **Authentication:** All endpoints should be protected by a JWT-based authentication guard, unless they are explicitly public.
*   **RBAC:** Implement a Role-Based Access Control (RBAC) middleware to authorize requests based on user roles and permissions.

### Workflow Guidelines

1.  **Understand the Use Case:** Before writing any code, make sure you understand the specific use case or workflow you are implementing. Refer to the product manager's storyboards and the architect's sequence diagrams.
2.  **Define the API:** Use Swagger to define the API endpoints, request and response DTOs, and error codes.
3.  **Implement the Business Logic:** Write the business logic in a service, following the coding guidelines.
4.  **Write Unit Tests:** Write unit tests for your services to ensure that the business logic is correct.
5.  **Write End-to-End (E2E) Tests:** Write E2E tests to verify that the entire workflow is functioning as expected, from the API request to the database and back.
6.  **CLI-based Client Example:** For each new workflow, create a simple CLI-based client example to demonstrate how to use the API. This will be invaluable for testing and for other developers who need to integrate with your service.

### Task List

*   [ ] Set up the initial NestJS project with PostgreSQL and SQLite integration.
*   [ ] Implement JWT-based authentication.
*   [ ] Implement RBAC middleware.
*   [ ] Implement the core conversation and message services.
*   [ ] Implement a `socket.io` gateway for real-time communication.
*   [ ] Create a CLI-based client for testing the messaging system.

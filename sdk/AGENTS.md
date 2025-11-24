# SDK Agent Instructions

This document provides guidance for AI agents working on the Simflo client SDK.

## Purpose and Architecture

The SDK is a TypeScript library that provides a convenient and consistent way for client applications (web and mobile) to interact with the Simflo backend API. It will be responsible for:

*   **API Calls:** Making HTTP requests to the backend.
*   **Authentication:** Managing JWT tokens and adding them to request headers.
*   **Caching:** Caching API responses to improve performance and reduce network traffic.
*   **Offline Support:** Storing data locally in IndexedDB (web) or SQLite (mobile) to provide offline access.

The SDK will be architected as follows:

1.  **Auto-generated API Clients:** The core API client code (models and API methods) will be automatically generated from the backend's Swagger/OpenAPI specification.
2.  **Base Service:** A hand-written `BaseService` class will provide the core functionality for making API calls, handling authentication, caching, and offline storage.
3.  **Derived Services:** The auto-generated API clients will be extended by derived service classes that use the `BaseService` to execute requests.

## Tech Stack

*   **Language:** TypeScript

## Experienced Senior Coder Persona

As a senior coder, I want to ensure that our SDK is robust, easy to use, and maintainable.

### Implementation Guidelines

*   **Code Generation:** Use a tool like `openapi-generator-cli` to generate the TypeScript client from the backend's `swagger.json`. This process should be automated.
*   **Base Service:** The `BaseService` is the heart of the SDK. It should be carefully designed to handle:
    *   **JWT Token Management:** Securely store and refresh JWT tokens.
    *   **Caching Strategy:** Implement a flexible caching strategy (e.g., cache-first, network-first) that can be configured on a per-request basis.
    *   **Offline Storage:** Abstract the storage mechanism so that it can work with both IndexedDB and SQLite.
*   **Type Safety:** The SDK should be fully type-safe. The auto-generated code will help with this, but we need to ensure that our custom code is also well-typed.
*   **Error Handling:** The SDK should provide clear and consistent error handling. Network errors and API errors should be distinguishable.

### Task List

*   [ ] Set up a new TypeScript project for the SDK.
*   [ ] Automate the generation of the API client from the backend's Swagger definition.
*   [ ] Implement the `BaseService` with JWT token management.
*   [ ] Implement a caching layer in the `BaseService`.
*   [ ] Implement an offline storage layer in the `BaseService` for IndexedDB and SQLite.
*   [ ] Create an example client application to demonstrate how to use the SDK.

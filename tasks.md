# Simflo Project Tasks

This file tracks the development tasks for the Simflo project. Each task should be worked on in a separate session.

---

### **Task Template**

*   **ID:** `[A unique identifier, e.g., T1, FEAT-001]`
*   **Status:** `[To Do | In Progress | Done | Blocked]`
*   **Dependencies:** `[A comma-separated list of Task IDs that must be completed first]`
*   **Description:**
    *   [A detailed explanation of the feature or task. What is the goal? Why is it important?]
*   **Acceptance Criteria:**
    *   [A checklist of what needs to be completed for the task to be considered "done".]
*   **Agent's Role & Guidelines:**
    *   [Specific instructions for the agent.]

---
## Task List

### Backend Foundational Features

---
### **Implement Message Status**
*   **ID:** `BE-002`
*   **Status:** `Done`
*   **Dependencies:** `none`
*   **Description:**
    *   Enhance the messaging system to support real-time message status updates (e.g., Sent, Delivered, Read). This is a critical feature for any modern chat application.
*   **Acceptance Criteria:**
    *   - [ ] The `Message` entity in the backend is updated with a `status` field (`'sent' | 'delivered' | 'read'`).
    *   - [ ] The `Message` entity includes `deliveredAt` and `readAt` timestamp fields.
    *   - [ ] The `MessagesGateway` is updated to handle new socket events for status changes (e.g., `message:mark_as_delivered`, `message:mark_as_read`).
    *   - [ ] When a status is updated, a `message:status_updated` event is broadcast to all participants in the conversation with the updated message details.
*   **Agent's Role & Guidelines:**
    *   - Work exclusively in the `backend` package.
    *   - Ensure all new logic is covered by unit tests.
    *   - Do not implement any client-side changes for this task.

---
### **Setup Database Migrations**
*   **ID:** `BE-003`
*   **Status:** `Done`
*   **Dependencies:** `none`
*   **Description:**
    *   Configure TypeORM migrations to manage database schema changes systematically. This is crucial for maintaining a stable database structure as the application evolves.
*   **Acceptance Criteria:**
    *   - [ ] Migration configuration is added to the TypeORM `DataSource`.
    *   - [ ] New scripts are added to `backend/package.json` for creating, running, and reverting migrations (e.g., `migration:create`, `migration:run`, `migration:revert`).
    *   - [ ] An initial migration is generated based on the existing entities.
*   **Agent's Role & Guidelines:**
    *   - This is a purely infrastructural task.
    *   - Do not alter any existing entities.

---
### **Implement Environment Configuration**
*   **ID:** `BE-004`
*   **Status:** `Done`
*   **Dependencies:** `none`
*   **Description:**
    *   Replace hardcoded configuration values (like database credentials, JWT secrets) with a robust environment variable system using NestJS's `ConfigModule`.
*   **Acceptance Criteria:**
    *   - [ ] A `.env.example` file is created in the `backend` directory.
    *   - [ ] The `AppModule` is configured with `ConfigModule`.
    *   - [ ] All hardcoded values are replaced with `configService.get('...')`.
*   **Agent's Role & Guidelines:**
    *   - Ensure the application runs correctly after the changes.
    *   - Update the `AGENTS.md` in the backend to instruct future agents on how to set up their `.env` file.

---
### **Implement User Search**
*   **ID:** `BE-005`
*   **Status:** `In Progress`
*   **Dependencies:** `none`
*   **Description:**
    *   Create an API endpoint to allow searching for registered users by their name or phone number. This is a prerequisite for adding users to conversations.
*   **Acceptance Criteria:**
    *   - [ ] A `GET /api/v1/users/search` endpoint is created.
    *   - [ ] The endpoint accepts a query parameter `q`.
    *   - [ ] The service logic searches for users where `name` or `phoneNumber` partially match the query.
    *   - [ ] The endpoint is protected and documented in Swagger.
*   **Agent's Role & Guidelines:**
    *   - Focus on read-only operations. Do not add creation or update logic.

---
### **Implement File Upload Service**
*   **ID:** `BE-006`
*   **Status:** `To Do`
*   **Dependencies:** `none`
*   **Description:**
    *   Create a service and endpoint for uploading files. This will be the foundation for sending images, documents, and other file types as messages.
*   **Acceptance Criteria:**
    *   - [ ] A `POST /api/v1/files/upload` endpoint is created.
    *   - [ ] The endpoint uses `multipart/form-data` to accept files.
    *   - [ ] For now, files are saved to a directory on the local filesystem (e.g., `backend/uploads`).
    *   - [ ] The endpoint returns a unique identifier or path for the uploaded file.
    *   - [ ] The `Message` entity is updated to allow for a `files` payload.
*   **Agent's Role & Guidelines:**
    *   - Do not integrate with a cloud storage provider like S3 in this task. Local storage is sufficient.

---
### **Task Management Use Case**
---
### **Task Management - Data Models**
*   **ID:** `TASK-001`
*   **Status:** `To Do`
*   **Dependencies:** `none`
*   **Description:**
    *   Define the backend data models for the task management feature. In Simflo's architecture, a "Project" is a `Conversation`, and a "Task" is a special type of `Message` linked to a new `Task` entity.
*   **Acceptance Criteria:**
    *   - [ ] A new `Task` entity is created with fields: `title`, `description`, `status` (`'todo' | 'in-progress' | 'done'`), `dueDate`.
    *   - [ ] A relationship is established between the `Task` entity and the `User` entity for assignees.
    *   - [ ] The `Message` entity is modified to have an optional one-to-one relationship with the `Task` entity.
*   **Agent's Role & Guidelines:**
    *   - This task is only for creating the TypeORM entities and relationships.
    *   - Do not create services or controllers yet.
    *   - If `BE-003` is complete, generate a migration for the new entities.

---
### **Task Management - Create & Update Tasks**
*   **ID:** `TASK-002`
*   **Status:** `To Do`
*   **Dependencies:** `TASK-001`
*   **Description:**
    *   Implement the backend logic for creating and updating tasks. A new task is created by sending a "command" message via the websocket gateway.
*   **Acceptance Criteria:**
    *   - [ ] A `TasksService` is created with `create` and `update` methods.
    *   - [ ] The `MessagesGateway` listens for a `command:create_task` event. This event triggers the creation of a `Task` and a corresponding `Message` of type `task_created`.
    *   - [ ] The gateway also listens for `command:update_task` to modify an existing task and create a `task_updated` message.
*   **Agent's Role & Guidelines:**
    *   - The primary interaction should be through the real-time gateway, not standard REST endpoints. This aligns with the Simflo architecture.

---
### SDK & Common Library
---
### **Regenerate and Enhance SDK**
*   **ID:** `SDK-001`
*   **Status:** `To Do`
*   **Dependencies:** `BE-002, BE-005, BE-006`
*   **Description:**
    *   Update the auto-generated TypeScript SDK to include the new backend features (message status, user search, file uploads).
*   **Acceptance Criteria:**
    *   - [ ] The `sdk/src` directory is updated with the latest clients and models from the backend's Swagger/OpenAPI spec.
*   **Agent's Role & Guidelines:**
    *   - This is primarily a code generation task.
    *   - Verify that the new DTOs and API client methods are present in the generated code.

---
### **Improve Client-Side State Management**
*   **ID:** `COMMON-001`
*   **Status:** `To Do`
*   **Dependencies:** `SDK-001`
*   **Description:**
    *   Enhance the Zustand stores in the `common` package to handle the new features, such as message statuses and storing a list of users.
*   **Acceptance Criteria:**
    *   - [ ] The `conversationStore` is updated to handle `message:status_updated` events.
    *   - [ ] A new `userStore` is created to manage the results of user searches.
*   **Agent's Role & Guidelines:**
    *   - All logic should be framework-agnostic and reside within the `common` package.

---
### Frontend (Web App)
---
### **Display Message Status**
*   **ID:** `FE-001`
*   **Status:** `To Do`
*   **Dependencies:** `COMMON-001`
*   **Description:**
    *   Update the web app's chat interface to visually represent the status of each message (e.g., one check for sent, two for delivered, two blue checks for read).
*   **Acceptance Criteria:**
    *   - [ ] The `MessageView` component is updated to display status icons next to each message.
    *   - [ ] The app emits `message:mark_as_read` events when a message becomes visible in the viewport.
*   **Agent's Role & Guidelines:**
    *   - Focus on the visual representation. You can use simple text or icons for the statuses.

---
### **Implement User Search and Add to Conversation**
*   **ID:** `FE-002`
*   **Status:** `To Do`
*   **Dependencies:** `COMMON-001`
*   **Description:**
    *   Build the UI for searching for users and adding them as participants to the currently active conversation.
*   **Acceptance Criteria:**
    *   - [ ] An "Add Participant" button is added to the conversation view.
    *   - [ ] Clicking the button opens a modal with a search input.
    *   - [ ] The search input calls the user search API via the SDK.
    *   - [ ] Users can be selected from the search results and added to the conversation.
*   **Agent's Role & Guidelines:**
    *   - Use the Shadcn components that are already part of the project.

---
### **Render Task Messages**
*   **ID:** `FE-003`
*   **Status:** `To Do`
*   **Dependencies:** `TASK-002, SDK-001`
*   **Description:**
    *   Create a UI component to render `task_created` and `task_updated` messages in the chat view. This component should display the task's details in a structured way.
*   **Acceptance Criteria:**
    *   - [ ] A new `TaskMessage` component is created.
    *   - [ ] The main `MessageView` conditionally renders the `TaskMessage` component if `message.type` is task-related.
    *   - [ ] The component displays the task title, description, and status.
*   **Agent's Role & Guidelines:**
    *   - This is a display-only component for now. Interaction (like changing status) will be a future task.

---

### Prompt for Future Sessions

Here is a template you can use to start a new session focused on one of the tasks above. Simply replace `[TASK_ID]` with the ID of the task you want me to work on.

**Prompt:**
"Hello Jules. Today we will be working on the Simflo project. Please open the `tasks.md` file and begin work on Task ID `[TASK_ID]`.

Make sure to follow all the acceptance criteria and agent guidelines specified for this task. Once you have completed and verified the task, please update its status to 'Done' in the `tasks.md` file before submitting your work."

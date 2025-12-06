# Application Messaging Architecture

This document outlines the architectural pattern for building complex, application-like features (e.g., Task Management, Bill Splitting, Hotel Bookings) within the Simflo messaging platform. The primary goal is to maintain the core vision of "everything is a message" while ensuring the system remains scalable, performant, and maintainable.

## The Core Principle: A Hybrid Model

The architecture is a hybrid model that separates the **state** of an application entity from its **event log**. It can be understood using the analogy of a collaborative document (like a Google Doc):

1.  **The Stateful Entity (The "Document"):** This is a dedicated database entity (e.g., a `Task` entity in a `tasks` table). It represents the single source of truth for the *current state* of the object. It always contains the most up-to-date information (e.g., the latest task title, the current status).

2.  **The Message Stream (The "Version History"):** This is the immutable log of events related to the entity, stored as standard `Message` objects within a `Conversation`. These messages announce that something has happened (e.g., a task was created, a status was updated).

This hybrid approach provides the best of both worlds:

*   **User Experience:** From the user's perspective, all interactions happen within the familiar conversational interface. New tasks and their updates appear as messages in the chat stream.
*   **Performance:** Queries for application-specific data (e.g., "find all tasks assigned to me") are fast and efficient, as they target dedicated, indexed database tables.
*   **Scalability:** The system can scale to support complex applications with rich data models without compromising the performance of the core messaging platform.
*   **Auditability:** The message stream provides a complete, immutable history of every action taken on an entity.

## Implementation Flow: Task Management Example

Let's illustrate this pattern with the Task Management feature.

### 1. Data Models

*   **`Task` Entity:** A new table, `tasks`, is created with columns to store the state of a task: `id`, `title`, `description`, `status`, `dueDate`, `assigneeId`, etc.
*   **`Message` Entity:** The existing `messages` table is used. To link a message to a task, the `Message` entity has an optional foreign key, `taskId`, pointing to the `Task` entity.

### 2. Creating a Task

1.  A user initiates a "create task" action in the client.
2.  The client sends a command to the backend via the websocket gateway (e.g., `command:create_task`) with the task details.
3.  The backend performs two actions in a single transaction:
    a. It creates a new record in the `tasks` table with the provided details.
    b. It creates a new `Message` in the conversation with `message_type: 'task_created'` and links it to the new `Task` entity via the `taskId` foreign key.
4.  The new message is broadcast to all participants in the conversation. The UI then renders a "Task Card" for this message.

### 3. Updating a Task

1.  A user changes the status of the task from "todo" to "done".
2.  The client sends a command (e.g., `command:update_task_status`) with the `taskId` and the new `status`.
3.  The backend performs two actions:
    a. It **updates the `status` field** on the existing record in the `tasks` table.
    b. It creates a **new `Message`** in the conversation with `message_type: 'task_status_updated'`. This message can also be linked to the `Task` entity. This new message serves as the public announcement of the change.

### 4. Rendering in the UI

*   When the UI encounters a `message` with `message_type: 'task_created'`, it should render a component that displays the task's details.
*   Crucially, to ensure the *latest* data is always shown, this component should use the `taskId` from the message to fetch the current state of the task directly from the `Task` entity.
*   Messages like `task_status_updated` can be rendered as simple, informational text in the chat ("Jules marked this task as done") or be used to trigger updates in the UI.

This pattern ensures that the conversational interface remains the central point of interaction while leveraging the power of a structured, relational database for managing the state of complex application entities.

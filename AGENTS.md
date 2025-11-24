# Simflo Agent Instructions

This document provides guidance for AI agents working on the Simflo project.

## Core Architecture: Conversation and Messages

The foundational principle of Simflo is that all interactions, transactions, and data points can be represented as conversations and messages. This is a unique and powerful approach that allows for a unified and flexible system.

### Thought Process

*   **Everything is communication:** At its core, any action within an application is a form of communication between users or systems.
*   **Communication is messages:** Communication is broken down into individual messages.
*   **Messages belong to conversations:** Messages are grouped into conversations, which provide context and a timeline of interactions.
*   **Use cases are message types:** Different features and workflows are simply different types of messages being exchanged within a conversation.

### Personas

#### Experienced Dev Architect

As an experienced architect, my goal is to ensure that every developer understands the core concepts of our architecture and can contribute to a clean, scalable, and maintainable system.

*   **Architectural Vision:** We are building a system where the concepts of "conversation" and "message" are the fundamental building blocks. This is not just a chat application; it's a transactional, scheduling, and notification system built on a messaging paradigm.
*   **Visuals and Diagrams:** To communicate this effectively, we will use block and sequence diagrams to illustrate the flow of messages in different scenarios. For example, a block diagram would show the frontend, backend, and database layers, with `socket.io` as the real-time communication channel. A sequence diagram would illustrate the end-to-end flow of a school admission process, showing how each step is a message sent within a conversation.
*   **Gap Analysis:** By documenting our architecture with these visuals, we can identify potential gaps in our design. For example, how do we handle message ordering and delivery guarantees? How do we manage the state of a multi-step process like a school admission? These are questions that we need to address in our design.

#### Experienced Product Manager

As a product manager, my role is to translate the architectural vision into a product that solves real-world problems and creates value for our customers.

*   **Product Research and Discovery:** Our unique architecture allows us to penetrate a wide range of markets with a single, solid foundation. I will create detailed storyboards and workflows for various use cases, such as:
    *   **School ERP:** From admission to graduation, every interaction between the school, students, and parents is a conversation.
    *   **Split Money:** A group of friends splitting a bill is a conversation, and each expense is a message.
    *   **To-Do List:** A to-do list is a conversation with yourself or your team, and each task is a message that can be assigned, tracked, and completed.
*   **User Experience (UX):** The storyboards and workflows I create will be so detailed that a UX designer or developer (human or AI) can use them to create a clean and intuitive user experience.
*   **Go-to-Market Strategy:** I will also use these materials to create marketing and sales content, user guides, brochures, and pitch decks. By focusing on the Pune/Maharashtra region initially, we can gather feedback and iterate quickly before expanding to other markets.

## Tech Stack

*   **Full Stack:** TypeScript
*   **Backend:** NestJS with Swagger for API documentation.
*   **Database:** PostgreSQL for production, SQLite for local development.
*   **Frontend (Mobile):** React Native with Nativewind.
*   **Frontend (Web):** ReactJS with Shadcn and Tailwind CSS.
*   **SDK:** Auto-generated from Swagger, with a base service for API calls, caching, and local storage.
*   **Common Business Logic:** A shared TypeScript library used by both the web and mobile applications.

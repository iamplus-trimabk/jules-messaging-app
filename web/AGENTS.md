# Web App (ReactJS) Agent Instructions

This document provides guidance for AI agents working on the Simflo ReactJS web application.

## Tech Stack

*   **Framework:** ReactJS
*   **UI Components:** Shadcn
*   **Styling:** Tailwind CSS
*   **Dependencies:**
    *   `@simflo/sdk`: The Simflo client SDK.
    *   `@simflo/common`: The shared business logic library.

## Experienced UX Designer Persona

As a UX designer with expertise in consumer, SME, and enterprise products, my goal is to create a user experience that is clean, intuitive, and consistent across all of our applications.

### UX Guidelines

*   **Consistency:** Follow a consistent design language throughout the app. Use the Shadcn component library to ensure that UI elements look and behave the same way on every screen.
*   **Clarity:** The UI should be clear and easy to understand. Avoid clutter and unnecessary information. Use visual cues to guide the user's attention.
*   **Feedback:** Provide immediate and clear feedback for all user interactions. For example, show a loading indicator when data is being fetched, and display a confirmation message when an action is successful.
*   **Error Handling:** Handle errors gracefully. Display user-friendly error messages that explain what went wrong and how to fix it.

### Workflow Guidelines

*   **Storyboards:** Before implementing a new feature, refer to the product manager's storyboards to understand the user flow and the different states of the UI.
*   **Component Library:** Leverage the Shadcn component library to build the UI. If a custom component is needed, it should be designed to match the look and feel of the existing components.
*   **Design Briefs:** For complex features, I will provide detailed design briefs with wireframes, mockups, and interaction guidelines.

### Task List

*   [ ] Set up a new ReactJS project.
*   [ ] Integrate Shadcn and Tailwind CSS.
*   [ ] Create a basic layout for the application.
*   [ ] Implement the basic messaging UI, including a conversation list and a message view.
*   [ ] Integrate the `@simflo/sdk` and `@simflo/common` libraries.
*   [ ] Implement user authentication.

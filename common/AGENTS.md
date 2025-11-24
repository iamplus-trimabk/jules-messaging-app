# Common Business Logic Agent Instructions

This document provides guidance for AI agents working on the Simflo common business logic library.

## Purpose

The `common` directory contains a TypeScript library that is shared between the React Native (`app`) and ReactJS (`web`) applications. The primary goal of this library is to avoid code duplication and ensure that business logic is consistent across both platforms.

## What Belongs Here?

*   **Shared Types and Interfaces:** Any data structures that are used by both the web and mobile apps.
*   **Validation Logic:** Functions for validating user input (e.g., email format, password strength).
*   **Utility Functions:** General-purpose helper functions (e.g., date formatting, string manipulation).
*   **Business Logic:** Any application logic that is not tied to a specific UI framework. For example, logic for calculating split money amounts or processing form data before sending it to the API.

## What Does NOT Belong Here?

*   **UI Components:** All UI components should be specific to either the web or mobile application.
*   **Framework-Specific Code:** Do not include any code that is specific to React or React Native (e.g., hooks, components).
*   **State Management:** State management logic should be handled within the respective applications.

## Tech Stack

*   **Language:** TypeScript

## Task List

*   [ ] Set up a new TypeScript project for the common library.
*   [ ] Define shared types and interfaces for the core conversation and message models.
*   [ ] Implement utility functions for common tasks like date formatting.
*   [ ] Create a build process that compiles the TypeScript code into a format that can be consumed by both the web and mobile apps.

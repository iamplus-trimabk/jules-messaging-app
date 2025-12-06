/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MessageDto } from './MessageDto';
import type { UserDto } from './UserDto';
export type TaskDto = {
    id: string;
    message: MessageDto;
    assignee?: UserDto;
    status: TaskDto.status;
    dueDate?: string;
};
export namespace TaskDto {
    export enum status {
        TODO = 'todo',
        IN_PROGRESS = 'in-progress',
        DONE = 'done',
    }
}

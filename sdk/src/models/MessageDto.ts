/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MessageContentDto } from './MessageContentDto';
import type { UserDto } from './UserDto';
export type MessageDto = {
    id: string;
    sender: UserDto;
    conversationId: string;
    content: MessageContentDto;
    status: MessageDto.status;
    createdAt: string;
};
export namespace MessageDto {
    export enum status {
        SENT = 'SENT',
        DELIVERED = 'DELIVERED',
        READ = 'READ',
    }
}

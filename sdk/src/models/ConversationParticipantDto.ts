/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDto } from './UserDto';
export type ConversationParticipantDto = {
    id: string;
    role: ConversationParticipantDto.role;
    user: UserDto;
};
export namespace ConversationParticipantDto {
    export enum role {
        ADMIN = 'ADMIN',
        MEMBER = 'MEMBER',
        SUBSCRIBER = 'SUBSCRIBER',
        NOTIFIER = 'NOTIFIER',
    }
}

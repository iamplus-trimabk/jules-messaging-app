/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConversationParticipantDto } from './ConversationParticipantDto';
export type ConversationDto = {
    id: string;
    title: string;
    type: ConversationDto.type;
    tags: Array<string>;
    participants: Array<ConversationParticipantDto>;
    createdAt: string;
    updatedAt: string;
};
export namespace ConversationDto {
    export enum type {
        DIRECT_MESSAGE = 'DIRECT_MESSAGE',
        GROUP_CHAT = 'GROUP_CHAT',
    }
}

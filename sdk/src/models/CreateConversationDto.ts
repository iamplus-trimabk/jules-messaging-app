/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ParticipantDto } from './ParticipantDto';
export type CreateConversationDto = {
    title: string;
    type: CreateConversationDto.type;
    tags?: Array<string>;
    participants: Array<ParticipantDto>;
};
export namespace CreateConversationDto {
    export enum type {
        DIRECT_MESSAGE = 'DIRECT_MESSAGE',
        GROUP_CHAT = 'GROUP_CHAT',
    }
}

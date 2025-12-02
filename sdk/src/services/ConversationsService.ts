/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddParticipantsDto } from '../models/AddParticipantsDto';
import type { ConversationDto } from '../models/ConversationDto';
import type { CreateConversationDto } from '../models/CreateConversationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ConversationsService {
    /**
     * @param requestBody
     * @returns ConversationDto
     * @throws ApiError
     */
    public static conversationsControllerCreate(
        requestBody: CreateConversationDto,
    ): CancelablePromise<ConversationDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/conversations',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns ConversationDto
     * @throws ApiError
     */
    public static conversationsControllerFindAll(): CancelablePromise<Array<ConversationDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/conversations',
        });
    }
    /**
     * @param id
     * @returns ConversationDto
     * @throws ApiError
     */
    public static conversationsControllerFindOne(
        id: string,
    ): CancelablePromise<ConversationDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/conversations/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ConversationDto
     * @throws ApiError
     */
    public static conversationsControllerAddParticipants(
        id: string,
        requestBody: AddParticipantsDto,
    ): CancelablePromise<ConversationDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/conversations/{id}/participants',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

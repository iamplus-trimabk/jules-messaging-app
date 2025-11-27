/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MessagesService {
    /**
     * @param id
     * @param before Cursor for pagination (a message ID)
     * @param limit The maximum number of messages to return
     * @returns any
     * @throws ApiError
     */
    public static messagesControllerFindAll(
        id: string,
        before?: string,
        limit: number = 20,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/conversations/{id}/messages',
            path: {
                'id': id,
            },
            query: {
                'before': before,
                'limit': limit,
            },
        });
    }
}

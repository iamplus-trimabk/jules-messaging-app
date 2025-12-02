/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TaskDto } from '../models/TaskDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TasksService {
    /**
     * @param id
     * @returns TaskDto
     * @throws ApiError
     */
    public static tasksControllerFindAll(
        id: string,
    ): CancelablePromise<Array<TaskDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/conversations/{id}/tasks',
            path: {
                'id': id,
            },
        });
    }
}

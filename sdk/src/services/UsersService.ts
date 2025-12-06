/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedUserResultDto } from '../models/PaginatedUserResultDto';
import type { UpdateProfileDto } from '../models/UpdateProfileDto';
import type { UserDto } from '../models/UserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * @param q The search query for name or mobile number.
     * @param limit The number of items per page.
     * @param page The page number for pagination.
     * @returns PaginatedUserResultDto
     * @throws ApiError
     */
    public static usersControllerSearch(
        q: any,
        limit?: any,
        page?: any,
    ): CancelablePromise<PaginatedUserResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/search',
            query: {
                'limit': limit,
                'page': page,
                'q': q,
            },
        });
    }
    /**
     * @returns UserDto
     * @throws ApiError
     */
    public static usersControllerGetProfile(): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me',
        });
    }
    /**
     * @param requestBody
     * @returns UserDto
     * @throws ApiError
     */
    public static usersControllerUpdateProfile(
        requestBody: UpdateProfileDto,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/me',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

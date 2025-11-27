/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RequestOtpDto } from '../models/RequestOtpDto';
import type { VerifyOtpDto } from '../models/VerifyOtpDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authControllerRequestOtp(
        requestBody: RequestOtpDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/request-otp',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authControllerVerifyOtp(
        requestBody: VerifyOtpDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/verify-otp',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ParticipantDto = {
    userId: string;
    role: ParticipantDto.role;
};
export namespace ParticipantDto {
    export enum role {
        ADMIN = 'ADMIN',
        MEMBER = 'MEMBER',
        SUBSCRIBER = 'SUBSCRIBER',
        NOTIFIER = 'NOTIFIER',
    }
}

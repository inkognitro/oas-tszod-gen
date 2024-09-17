import {ResponseBodyData, ResponseData} from '@/test-outputs/petstore1-with-zod/core';
import {z} from 'zod';
import {Error, errorZodSchema, Authorizations, authorizationsZodSchema, DrsObject, drsObjectZodSchema, Summary, Unresolved, summaryZodSchema, unresolvedZodSchema, AccessURL, accessURLZodSchema, BulkAccessURL, bulkAccessURLZodSchema} from '@/test-outputs/petstore1-with-zod';

export type $200ServiceInfoResponse = ResponseData<ResponseBodyData<'application/json', any>>

export const $200ServiceInfoResponse = {
bodyByContentType: {
'application/json': {
zodSchema: z.any()
}
}
}

export type $500InternalServerErrorResponse = ResponseData<ResponseBodyData<'application/json', Error>>

export const $500InternalServerErrorResponse = {
bodyByContentType: {
'application/json': {
zodSchema: errorZodSchema
}
}
}

export type $200OkAuthorizationsResponse = ResponseData<ResponseBodyData<'application/json', Authorizations>>

export const $200OkAuthorizationsResponse = {
bodyByContentType: {
'application/json': {
zodSchema: authorizationsZodSchema
}
}
}

export type AuthorizationsNotSupportedResponse = any

export const authorizationsNotSupportedResponse = {
bodyByContentType: {}
}

export type $400BadRequestResponse = ResponseData<ResponseBodyData<'application/json', Error>>

export const $400BadRequestResponse = {
bodyByContentType: {
'application/json': {
zodSchema: errorZodSchema
}
}
}

export type $404NotFoundDrsObjectResponse = ResponseData<ResponseBodyData<'application/json', Error>>

export const $404NotFoundDrsObjectResponse = {
bodyByContentType: {
'application/json': {
zodSchema: errorZodSchema
}
}
}

export type $200OkDrsObjectResponse = ResponseData<ResponseBodyData<'application/json', DrsObject>>

export const $200OkDrsObjectResponse = {
bodyByContentType: {
'application/json': {
zodSchema: drsObjectZodSchema
}
}
}

export type $202AcceptedResponse = ResponseData<any, {
'Retry-After': string;
}>

export const $202AcceptedResponse = {
headersZodSchema: z.object({
'Retry-After': z.number().int().safe().finite(),
}),
bodyByContentType: {}
}

export type $401UnauthorizedResponse = ResponseData<ResponseBodyData<'application/json', Error>>

export const $401UnauthorizedResponse = {
bodyByContentType: {
'application/json': {
zodSchema: errorZodSchema
}
}
}

export type $403ForbiddenResponse = ResponseData<ResponseBodyData<'application/json', Error>>

export const $403ForbiddenResponse = {
bodyByContentType: {
'application/json': {
zodSchema: errorZodSchema
}
}
}

export type $404NotFoundAccessResponse = ResponseData<ResponseBodyData<'application/json', Error>>

export const $404NotFoundAccessResponse = {
bodyByContentType: {
'application/json': {
zodSchema: errorZodSchema
}
}
}

export type $200OkBulkAuthorizationsResponse = ResponseData<ResponseBodyData<'application/json', {
'summary'?: Summary;
'unresolved_drs_objects'?: Unresolved;
'resolved_drs_object'?: (Authorizations)[];
}>>

export const $200OkBulkAuthorizationsResponse = {
bodyByContentType: {
'application/json': {
zodSchema: z.object({
'summary': summaryZodSchema.optional(),
'unresolved_drs_objects': unresolvedZodSchema.optional(),
'resolved_drs_object': z.array(authorizationsZodSchema).optional(),
})
}
}
}

export type $413RequestTooLargeResponse = ResponseData<ResponseBodyData<'application/json', Error>>

export const $413RequestTooLargeResponse = {
bodyByContentType: {
'application/json': {
zodSchema: errorZodSchema
}
}
}

export type $200OkDrsObjectsResponse = ResponseData<ResponseBodyData<'application/json', {
'summary'?: Summary;
'unresolved_drs_objects'?: Unresolved;
'resolved_drs_object'?: (DrsObject)[];
}>>

export const $200OkDrsObjectsResponse = {
bodyByContentType: {
'application/json': {
zodSchema: z.object({
'summary': summaryZodSchema.optional(),
'unresolved_drs_objects': unresolvedZodSchema.optional(),
'resolved_drs_object': z.array(drsObjectZodSchema).optional(),
})
}
}
}

export type $200OkAccessResponse = ResponseData<ResponseBodyData<'application/json', AccessURL>>

export const $200OkAccessResponse = {
bodyByContentType: {
'application/json': {
zodSchema: accessURLZodSchema
}
}
}

export type $200OkAccessesResponse = ResponseData<ResponseBodyData<'application/json', {
'summary'?: Summary;
'unresolved_drs_objects'?: Unresolved;
'resolved_drs_object_access_urls'?: (BulkAccessURL)[];
}>>

export const $200OkAccessesResponse = {
bodyByContentType: {
'application/json': {
zodSchema: z.object({
'summary': summaryZodSchema.optional(),
'unresolved_drs_objects': unresolvedZodSchema.optional(),
'resolved_drs_object_access_urls': z.array(bulkAccessURLZodSchema).optional(),
})
}
}
}
import {ResponseBodyData, ResponseData} from '@/test-outputs/petstore1/core';
import {Error, Authorizations, DrsObject, Summary, Unresolved, AccessURL, BulkAccessURL} from '@/test-outputs/petstore1';

export type $200ServiceInfoResponse = ResponseData<ResponseBodyData<'application/json', any>>

export const $200ServiceInfoResponse = {
bodyByContentType: {
'application/json': {

}
}
}

export type $500InternalServerErrorResponse = ResponseData<ResponseBodyData<'application/json', Error>>

export const $500InternalServerErrorResponse = {
bodyByContentType: {
'application/json': {

}
}
}

export type $200OkAuthorizationsResponse = ResponseData<ResponseBodyData<'application/json', Authorizations>>

export const $200OkAuthorizationsResponse = {
bodyByContentType: {
'application/json': {

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

}
}
}

export type $404NotFoundDrsObjectResponse = ResponseData<ResponseBodyData<'application/json', Error>>

export const $404NotFoundDrsObjectResponse = {
bodyByContentType: {
'application/json': {

}
}
}

export type $200OkDrsObjectResponse = ResponseData<ResponseBodyData<'application/json', DrsObject>>

export const $200OkDrsObjectResponse = {
bodyByContentType: {
'application/json': {

}
}
}

export type $202AcceptedResponse = ResponseData<any, {
'Retry-After': string;
}>

export const $202AcceptedResponse = {
bodyByContentType: {}
}

export type $401UnauthorizedResponse = ResponseData<ResponseBodyData<'application/json', Error>>

export const $401UnauthorizedResponse = {
bodyByContentType: {
'application/json': {

}
}
}

export type $403ForbiddenResponse = ResponseData<ResponseBodyData<'application/json', Error>>

export const $403ForbiddenResponse = {
bodyByContentType: {
'application/json': {

}
}
}

export type $404NotFoundAccessResponse = ResponseData<ResponseBodyData<'application/json', Error>>

export const $404NotFoundAccessResponse = {
bodyByContentType: {
'application/json': {

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

}
}
}

export type $413RequestTooLargeResponse = ResponseData<ResponseBodyData<'application/json', Error>>

export const $413RequestTooLargeResponse = {
bodyByContentType: {
'application/json': {

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

}
}
}

export type $200OkAccessResponse = ResponseData<ResponseBodyData<'application/json', AccessURL>>

export const $200OkAccessResponse = {
bodyByContentType: {
'application/json': {

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

}
}
}
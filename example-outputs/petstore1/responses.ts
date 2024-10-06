import {
  Service,
  DrsService,
  Error,
  Authorizations,
  DrsObject,
  Summary,
  Unresolved,
  AccessURL,
  BulkAccessURL,
} from '@example-outputs/petstore1';
import {ResponseBodyData, ResponseUnion} from '@example-outputs/petstore1/core';

export type $200ServiceInfoResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<'application/json', Service & DrsService>
>;

export const $200ServiceInfoResponseSchema = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $500InternalServerErrorResponse<S extends number = any> =
  ResponseUnion<S, ResponseBodyData<'application/json', Error>>;

export const $500InternalServerErrorResponseSchema = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $200OkAuthorizationsResponse<S extends number = any> =
  ResponseUnion<S, ResponseBodyData<'application/json', Authorizations>>;

export const $200OkAuthorizationsResponseSchema = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type AuthorizationsNotSupportedResponse<S extends number = any> =
  ResponseUnion<S>;

export const authorizationsNotSupportedResponseSchema = {
  bodyByContentType: {},
};

export type $400BadRequestResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $400BadRequestResponseSchema = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $404NotFoundDrsObjectResponse<S extends number = any> =
  ResponseUnion<S, ResponseBodyData<'application/json', Error>>;

export const $404NotFoundDrsObjectResponseSchema = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $200OkDrsObjectResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<'application/json', DrsObject>
>;

export const $200OkDrsObjectResponseSchema = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $202AcceptedResponse<S extends number = any> = ResponseUnion<
  S,
  any,
  {
    'Retry-After'?: string;
  }
>;

export const $202AcceptedResponseSchema = {
  bodyByContentType: {},
};

export type $401UnauthorizedResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $401UnauthorizedResponseSchema = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $403ForbiddenResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $403ForbiddenResponseSchema = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $404NotFoundAccessResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $404NotFoundAccessResponseSchema = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $200OkBulkAuthorizationsResponse<S extends number = any> =
  ResponseUnion<
    S,
    ResponseBodyData<
      'application/json',
      {
        summary?: Summary;
        unresolved_drs_objects?: Unresolved;
        resolved_drs_object?: Authorizations[];
      }
    >
  >;

export const $200OkBulkAuthorizationsResponseSchema = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $413RequestTooLargeResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $413RequestTooLargeResponseSchema = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $200OkDrsObjectsResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<
    'application/json',
    {
      summary?: Summary;
      unresolved_drs_objects?: Unresolved;
      resolved_drs_object?: DrsObject[];
    }
  >
>;

export const $200OkDrsObjectsResponseSchema = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $200OkAccessResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<'application/json', AccessURL>
>;

export const $200OkAccessResponseSchema = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $200OkAccessesResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<
    'application/json',
    {
      summary?: Summary;
      unresolved_drs_objects?: Unresolved;
      resolved_drs_object_access_urls?: BulkAccessURL[];
    }
  >
>;

export const $200OkAccessesResponseSchema = {
  bodyByContentType: {
    'application/json': {},
  },
};

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
import {ResponseBodyData, Response} from '@example-outputs/petstore1/core';

export type $200ServiceInfoResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Service & DrsService>
>;

export const $200ServiceInfoResponse = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $500InternalServerErrorResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $500InternalServerErrorResponse = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $200OkAuthorizationsResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Authorizations>
>;

export const $200OkAuthorizationsResponse = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type AuthorizationsNotSupportedResponse<S extends number = any> =
  Response<S>;

export const authorizationsNotSupportedResponse = {
  bodyByContentType: {},
};

export type $400BadRequestResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $400BadRequestResponse = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $404NotFoundDrsObjectResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $404NotFoundDrsObjectResponse = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $200OkDrsObjectResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', DrsObject>
>;

export const $200OkDrsObjectResponse = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $202AcceptedResponse<S extends number = any> = Response<
  S,
  any,
  {
    'Retry-After': string;
  }
>;

export const $202AcceptedResponse = {
  bodyByContentType: {},
};

export type $401UnauthorizedResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $401UnauthorizedResponse = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $403ForbiddenResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $403ForbiddenResponse = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $404NotFoundAccessResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $404NotFoundAccessResponse = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $200OkBulkAuthorizationsResponse<S extends number = any> = Response<
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

export const $200OkBulkAuthorizationsResponse = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $413RequestTooLargeResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $413RequestTooLargeResponse = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $200OkDrsObjectsResponse<S extends number = any> = Response<
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

export const $200OkDrsObjectsResponse = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $200OkAccessResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', AccessURL>
>;

export const $200OkAccessResponse = {
  bodyByContentType: {
    'application/json': {},
  },
};

export type $200OkAccessesResponse<S extends number = any> = Response<
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

export const $200OkAccessesResponse = {
  bodyByContentType: {
    'application/json': {},
  },
};

import {
  Service,
  DrsService,
  z_Service,
  z_DrsService,
  Error,
  z_Error,
  Authorizations,
  z_Authorizations,
  DrsObject,
  z_DrsObject,
  Summary,
  Unresolved,
  z_Summary,
  z_Unresolved,
  AccessURL,
  z_AccessURL,
  BulkAccessURL,
  z_BulkAccessURL,
} from './schemas';
import {ResponseBodyData, ResponseUnion, Response} from './core';
import {z} from 'zod';

export type $200ServiceInfoResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<'application/json', Service & DrsService>
>;

export const $200ServiceInfoResponseSchema = {
  bodyByContentType: {
    'application/json': {
      zodSchema: z.intersection(z_Service, z_DrsService),
    },
  },
};

export type $500InternalServerErrorResponse<S extends number = any> =
  ResponseUnion<S, ResponseBodyData<'application/json', Error>>;

export const $500InternalServerErrorResponseSchema = {
  bodyByContentType: {
    'application/json': {
      zodSchema: z_Error,
    },
  },
};

export type $200OkAuthorizationsResponse<S extends number = any> =
  ResponseUnion<S, ResponseBodyData<'application/json', Authorizations>>;

export const $200OkAuthorizationsResponseSchema = {
  bodyByContentType: {
    'application/json': {
      zodSchema: z_Authorizations,
    },
  },
};

export type AuthorizationsNotSupportedResponse<S extends number = any> =
  Response<S>;

export const authorizationsNotSupportedResponseSchema = {
  bodyByContentType: {},
};

export type $400BadRequestResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $400BadRequestResponseSchema = {
  bodyByContentType: {
    'application/json': {
      zodSchema: z_Error,
    },
  },
};

export type $404NotFoundDrsObjectResponse<S extends number = any> =
  ResponseUnion<S, ResponseBodyData<'application/json', Error>>;

export const $404NotFoundDrsObjectResponseSchema = {
  bodyByContentType: {
    'application/json': {
      zodSchema: z_Error,
    },
  },
};

export type $200OkDrsObjectResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<'application/json', DrsObject>
>;

export const $200OkDrsObjectResponseSchema = {
  bodyByContentType: {
    'application/json': {
      zodSchema: z_DrsObject,
    },
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
  headersZodSchema: z.object({
    'Retry-After': z.string().optional(),
  }),
  bodyByContentType: {},
};

export type $401UnauthorizedResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $401UnauthorizedResponseSchema = {
  bodyByContentType: {
    'application/json': {
      zodSchema: z_Error,
    },
  },
};

export type $403ForbiddenResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $403ForbiddenResponseSchema = {
  bodyByContentType: {
    'application/json': {
      zodSchema: z_Error,
    },
  },
};

export type $404NotFoundAccessResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $404NotFoundAccessResponseSchema = {
  bodyByContentType: {
    'application/json': {
      zodSchema: z_Error,
    },
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
    'application/json': {
      zodSchema: z.object({
        summary: z_Summary.optional(),
        unresolved_drs_objects: z_Unresolved.optional(),
        resolved_drs_object: z.array(z_Authorizations).optional(),
      }),
    },
  },
};

export type $413RequestTooLargeResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $413RequestTooLargeResponseSchema = {
  bodyByContentType: {
    'application/json': {
      zodSchema: z_Error,
    },
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
    'application/json': {
      zodSchema: z.object({
        summary: z_Summary.optional(),
        unresolved_drs_objects: z_Unresolved.optional(),
        resolved_drs_object: z.array(z_DrsObject).optional(),
      }),
    },
  },
};

export type $200OkAccessResponse<S extends number = any> = ResponseUnion<
  S,
  ResponseBodyData<'application/json', AccessURL>
>;

export const $200OkAccessResponseSchema = {
  bodyByContentType: {
    'application/json': {
      zodSchema: z_AccessURL,
    },
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
    'application/json': {
      zodSchema: z.object({
        summary: z_Summary.optional(),
        unresolved_drs_objects: z_Unresolved.optional(),
        resolved_drs_object_access_urls: z.array(z_BulkAccessURL).optional(),
      }),
    },
  },
};

import {
  Service,
  DrsService,
  serviceZodSchema,
  drsServiceZodSchema,
  Error,
  errorZodSchema,
  Authorizations,
  authorizationsZodSchema,
  DrsObject,
  drsObjectZodSchema,
  Summary,
  Unresolved,
  summaryZodSchema,
  unresolvedZodSchema,
  AccessURL,
  accessURLZodSchema,
  BulkAccessURL,
  bulkAccessURLZodSchema,
} from '@example-outputs/petstore1-with-zod';
import {
  ResponseBodyData,
  Response,
} from '@example-outputs/petstore1-with-zod/core';
import {z} from 'zod';

export type $200ServiceInfoResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Service & DrsService>
>;

export const $200ServiceInfoResponse = {
  bodyByContentType: {
    'application/json': {
      zodSchema: z.intersection([serviceZodSchema, drsServiceZodSchema]),
    },
  },
};

export type $500InternalServerErrorResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $500InternalServerErrorResponse = {
  bodyByContentType: {
    'application/json': {
      zodSchema: errorZodSchema,
    },
  },
};

export type $200OkAuthorizationsResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Authorizations>
>;

export const $200OkAuthorizationsResponse = {
  bodyByContentType: {
    'application/json': {
      zodSchema: authorizationsZodSchema,
    },
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
    'application/json': {
      zodSchema: errorZodSchema,
    },
  },
};

export type $404NotFoundDrsObjectResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $404NotFoundDrsObjectResponse = {
  bodyByContentType: {
    'application/json': {
      zodSchema: errorZodSchema,
    },
  },
};

export type $200OkDrsObjectResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', DrsObject>
>;

export const $200OkDrsObjectResponse = {
  bodyByContentType: {
    'application/json': {
      zodSchema: drsObjectZodSchema,
    },
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
  headersZodSchema: z.object({
    'Retry-After': z.number().int().safe().finite(),
  }),
  bodyByContentType: {},
};

export type $401UnauthorizedResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $401UnauthorizedResponse = {
  bodyByContentType: {
    'application/json': {
      zodSchema: errorZodSchema,
    },
  },
};

export type $403ForbiddenResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $403ForbiddenResponse = {
  bodyByContentType: {
    'application/json': {
      zodSchema: errorZodSchema,
    },
  },
};

export type $404NotFoundAccessResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $404NotFoundAccessResponse = {
  bodyByContentType: {
    'application/json': {
      zodSchema: errorZodSchema,
    },
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
    'application/json': {
      zodSchema: z.object({
        summary: summaryZodSchema.optional(),
        unresolved_drs_objects: unresolvedZodSchema.optional(),
        resolved_drs_object: z.array(authorizationsZodSchema).optional(),
      }),
    },
  },
};

export type $413RequestTooLargeResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', Error>
>;

export const $413RequestTooLargeResponse = {
  bodyByContentType: {
    'application/json': {
      zodSchema: errorZodSchema,
    },
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
    'application/json': {
      zodSchema: z.object({
        summary: summaryZodSchema.optional(),
        unresolved_drs_objects: unresolvedZodSchema.optional(),
        resolved_drs_object: z.array(drsObjectZodSchema).optional(),
      }),
    },
  },
};

export type $200OkAccessResponse<S extends number = any> = Response<
  S,
  ResponseBodyData<'application/json', AccessURL>
>;

export const $200OkAccessResponse = {
  bodyByContentType: {
    'application/json': {
      zodSchema: accessURLZodSchema,
    },
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
    'application/json': {
      zodSchema: z.object({
        summary: summaryZodSchema.optional(),
        unresolved_drs_objects: unresolvedZodSchema.optional(),
        resolved_drs_object_access_urls: z
          .array(bulkAccessURLZodSchema)
          .optional(),
      }),
    },
  },
};

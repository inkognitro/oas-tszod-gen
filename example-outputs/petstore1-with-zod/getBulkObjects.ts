import {
  z_BulkObjectId,
  BulkObjectId,
} from '@example-outputs/petstore1-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  RequestBodyData,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/petstore1-with-zod/core';

export const getBulkObjectsEndpointSchema = {
  path: '/objects',
  method: 'post',
  supportedSecuritySchemas: [{name: 'PassportAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    expand: z.boolean().optional(),
  }),
  bodyByContentType: {
    'application/json': {
      zodSchema: z_BulkObjectId,
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {},
    },
    '202': {
      bodyByContentType: {},
    },
    '400': {
      bodyByContentType: {},
    },
    '401': {
      bodyByContentType: {},
    },
    '403': {
      bodyByContentType: {},
    },
    '404': {
      bodyByContentType: {},
    },
    '413': {
      bodyByContentType: {},
    },
    '500': {
      bodyByContentType: {},
    },
  },
};

export type GetBulkObjectsRequest = RequestUnion<
  RequestBodyData<'application/json', BulkObjectId>,
  any,
  {
    expand?: boolean;
  }
>;

export type GetBulkObjectsResponse =
  | Response<200>
  | Response<202>
  | Response<400>
  | Response<401>
  | Response<403>
  | Response<404>
  | Response<413>
  | Response<500>;

export type GetBulkObjectsRequestResult = RequestResult<
  GetBulkObjectsRequest,
  GetBulkObjectsResponse
>;

export function getBulkObjects(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBulkObjectsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBulkObjectsRequestResult> {
  return requestHandler.execute(
    createRequest(getBulkObjectsEndpointSchema, payload),
    config
  );
}

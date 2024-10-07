import {z} from 'zod';
import {
  RequestUnion,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/petstore1-with-zod/core';

export const getAccessURLEndpointSchema = {
  path: '/objects/{object_id}/access/{access_id}',
  method: 'get',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    object_id: z.string(),
    access_id: z.string(),
  }),
  bodyByContentType: {},
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
    '500': {
      bodyByContentType: {},
    },
  },
};

export type GetAccessURLRequest = RequestUnion<
  any,
  {
    object_id: string;
    access_id: string;
  }
>;

export type GetAccessURLResponse =
  | Response<200>
  | Response<202>
  | Response<400>
  | Response<401>
  | Response<403>
  | Response<404>
  | Response<500>;

export type GetAccessURLRequestResult = RequestResult<
  GetAccessURLRequest,
  GetAccessURLResponse
>;

export function getAccessURL(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAccessURLRequest, 'pathParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccessURLRequestResult> {
  return requestHandler.execute(
    createRequest(getAccessURLEndpointSchema, payload),
    config
  );
}

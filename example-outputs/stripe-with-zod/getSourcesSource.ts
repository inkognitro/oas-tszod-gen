import {
  z_Source,
  z_Error,
  Source,
  Error,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/stripe-with-zod/core';

export const getSourcesSourceEndpointSchema = {
  path: '/v1/sources/{source}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    client_secret: z.string().optional(),
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    source: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Source,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetSourcesSourceRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    source: string;
  },
  {
    client_secret?: string;
    expand?: string[];
  }
>;

export type GetSourcesSourceResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Source>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSourcesSourceRequestResult = RequestResult<
  GetSourcesSourceRequest,
  GetSourcesSourceResponse
>;

export function getSourcesSource(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSourcesSourceRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSourcesSourceRequestResult> {
  return requestHandler.execute(
    createRequest(getSourcesSourceEndpointSchema, payload),
    config
  );
}

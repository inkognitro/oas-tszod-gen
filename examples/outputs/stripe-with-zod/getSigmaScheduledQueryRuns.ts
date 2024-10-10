import {
  z_Scheduled_query_run,
  z_Error,
  Scheduled_query_run,
  Error,
} from './schemas';
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
} from './core';

export const getSigmaScheduledQueryRunsEndpointSchema = {
  path: '/v1/sigma/scheduled_query_runs',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
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
          zodSchema: z.object({
            data: z.array(z_Scheduled_query_run),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/sigma\/scheduled_query_runs/),
          }),
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

export type GetSigmaScheduledQueryRunsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetSigmaScheduledQueryRunsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Scheduled_query_run[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSigmaScheduledQueryRunsRequestResult = RequestResult<
  GetSigmaScheduledQueryRunsRequest,
  GetSigmaScheduledQueryRunsResponse
>;

export function getSigmaScheduledQueryRuns(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSigmaScheduledQueryRunsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSigmaScheduledQueryRunsRequestResult> {
  return requestHandler.execute(
    createRequest(getSigmaScheduledQueryRunsEndpointSchema, payload),
    config
  );
}

import {z_Forwarding_Request, Forwarding_Request} from './forwarding';
import {z_Error, Error} from './schemas';
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

export const getForwardingRequestsEndpointSchema = {
  path: '/v1/forwarding/requests',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    created: z
      .object({
        gt: z.number().int().safe().finite().optional(),
        gte: z.number().int().safe().finite().optional(),
        lt: z.number().int().safe().finite().optional(),
        lte: z.number().int().safe().finite().optional(),
      })
      .optional(),
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
            data: z.array(z_Forwarding_Request),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string(),
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

export type GetForwardingRequestsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    created?: {
      gt?: number; // int
      gte?: number; // int
      lt?: number; // int
      lte?: number; // int
    };
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetForwardingRequestsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Forwarding_Request[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetForwardingRequestsRequestResult = RequestResult<
  GetForwardingRequestsRequest,
  GetForwardingRequestsResponse
>;

export function getForwardingRequests(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetForwardingRequestsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetForwardingRequestsRequestResult> {
  return requestHandler.execute(
    createRequest(getForwardingRequestsEndpointSchema, payload),
    config
  );
}

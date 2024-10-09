import {z_Quote, z_Error, Quote, Error} from '@example-outputs/stripe-with-zod';
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

export const getQuotesEndpointSchema = {
  path: '/v1/quotes',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    customer: z.string().optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
    status: z.enum(['accepted', 'canceled', 'draft', 'open']).optional(),
    test_clock: z.string().optional(),
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
            data: z.array(z_Quote),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/quotes/),
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

export type GetQuotesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    customer?: string;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
    status?: 'accepted' | 'canceled' | 'draft' | 'open';
    test_clock?: string;
  }
>;

export type GetQuotesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Quote[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetQuotesRequestResult = RequestResult<
  GetQuotesRequest,
  GetQuotesResponse
>;

export function getQuotes(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetQuotesRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetQuotesRequestResult> {
  return requestHandler.execute(
    createRequest(getQuotesEndpointSchema, payload),
    config
  );
}

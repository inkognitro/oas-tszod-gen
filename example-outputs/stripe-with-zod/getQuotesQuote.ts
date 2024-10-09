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

export const getQuotesQuoteEndpointSchema = {
  path: '/v1/quotes/{quote}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    quote: z.string(),
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
          zodSchema: z_Quote,
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

export type GetQuotesQuoteRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    quote: string;
  },
  {
    expand?: string[];
  }
>;

export type GetQuotesQuoteResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Quote>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetQuotesQuoteRequestResult = RequestResult<
  GetQuotesQuoteRequest,
  GetQuotesQuoteResponse
>;

export function getQuotesQuote(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetQuotesQuoteRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetQuotesQuoteRequestResult> {
  return requestHandler.execute(
    createRequest(getQuotesQuoteEndpointSchema, payload),
    config
  );
}

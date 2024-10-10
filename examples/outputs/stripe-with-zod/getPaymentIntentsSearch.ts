import {z_Payment_intent, z_Error, Payment_intent, Error} from './schemas';
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

export const getPaymentIntentsSearchEndpointSchema = {
  path: '/v1/payment_intents/search',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    page: z.string().optional(),
    query: z.string(),
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
            data: z.array(z_Payment_intent),
            has_more: z.boolean(),
            next_page: z.string().nullable().optional(),
            object: z.enum(['search_result']),
            total_count: z.number().int().safe().finite().optional(),
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

export type GetPaymentIntentsSearchRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    expand?: string[];
    limit?: number; // int
    page?: string;
    query: string;
  }
>;

export type GetPaymentIntentsSearchResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Payment_intent[];
          has_more: boolean;
          next_page?: string | null;
          object: 'search_result';
          total_count?: number; // int
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPaymentIntentsSearchRequestResult = RequestResult<
  GetPaymentIntentsSearchRequest,
  GetPaymentIntentsSearchResponse
>;

export function getPaymentIntentsSearch(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPaymentIntentsSearchRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPaymentIntentsSearchRequestResult> {
  return requestHandler.execute(
    createRequest(getPaymentIntentsSearchEndpointSchema, payload),
    config
  );
}

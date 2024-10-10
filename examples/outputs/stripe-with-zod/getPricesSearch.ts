import {z_Price, z_Error, Price, Error} from './schemas';
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

export const getPricesSearchEndpointSchema = {
  path: '/v1/prices/search',
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
            data: z.array(z_Price),
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

export type GetPricesSearchRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    expand?: string[];
    limit?: number; // int
    page?: string;
    query: string;
  }
>;

export type GetPricesSearchResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Price[];
          has_more: boolean;
          next_page?: string | null;
          object: 'search_result';
          total_count?: number; // int
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPricesSearchRequestResult = RequestResult<
  GetPricesSearchRequest,
  GetPricesSearchResponse
>;

export function getPricesSearch(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPricesSearchRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPricesSearchRequestResult> {
  return requestHandler.execute(
    createRequest(getPricesSearchEndpointSchema, payload),
    config
  );
}

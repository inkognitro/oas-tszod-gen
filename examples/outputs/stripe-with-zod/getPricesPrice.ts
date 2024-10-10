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

export const getPricesPriceEndpointSchema = {
  path: '/v1/prices/{price}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    price: z.string(),
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
          zodSchema: z_Price,
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

export type GetPricesPriceRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    price: string;
  },
  {
    expand?: string[];
  }
>;

export type GetPricesPriceResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Price>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPricesPriceRequestResult = RequestResult<
  GetPricesPriceRequest,
  GetPricesPriceResponse
>;

export function getPricesPrice(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPricesPriceRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPricesPriceRequestResult> {
  return requestHandler.execute(
    createRequest(getPricesPriceEndpointSchema, payload),
    config
  );
}

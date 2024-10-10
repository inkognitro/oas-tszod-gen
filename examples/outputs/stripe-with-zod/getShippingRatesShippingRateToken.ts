import {z_Shipping_rate, z_Error, Shipping_rate, Error} from './schemas';
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

export const getShippingRatesShippingRateTokenEndpointSchema = {
  path: '/v1/shipping_rates/{shipping_rate_token}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    shipping_rate_token: z.string(),
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
          zodSchema: z_Shipping_rate,
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

export type GetShippingRatesShippingRateTokenRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    shipping_rate_token: string;
  },
  {
    expand?: string[];
  }
>;

export type GetShippingRatesShippingRateTokenResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Shipping_rate>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetShippingRatesShippingRateTokenRequestResult = RequestResult<
  GetShippingRatesShippingRateTokenRequest,
  GetShippingRatesShippingRateTokenResponse
>;

export function getShippingRatesShippingRateToken(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetShippingRatesShippingRateTokenRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetShippingRatesShippingRateTokenRequestResult> {
  return requestHandler.execute(
    createRequest(getShippingRatesShippingRateTokenEndpointSchema, payload),
    config
  );
}

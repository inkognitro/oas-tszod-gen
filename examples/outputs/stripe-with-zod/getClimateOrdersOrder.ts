import {z_Climate_Order, Climate_Order} from './climate';
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

export const getClimateOrdersOrderEndpointSchema = {
  path: '/v1/climate/orders/{order}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    order: z.string(),
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
          zodSchema: z_Climate_Order,
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

export type GetClimateOrdersOrderRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    order: string;
  },
  {
    expand?: string[];
  }
>;

export type GetClimateOrdersOrderResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Climate_Order>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetClimateOrdersOrderRequestResult = RequestResult<
  GetClimateOrdersOrderRequest,
  GetClimateOrdersOrderResponse
>;

export function getClimateOrdersOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetClimateOrdersOrderRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetClimateOrdersOrderRequestResult> {
  return requestHandler.execute(
    createRequest(getClimateOrdersOrderEndpointSchema, payload),
    config
  );
}

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
import {Climate_Order} from './climate';
import {Error} from './schemas';

export const postClimateOrdersEndpointSchema = {
  path: '/v1/climate/orders',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type PostClimateOrdersRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      beneficiary?: {
        public_name: string;
      };
      currency?: string;
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      metric_tons?: string; // decimal
      product: string;
    }
  >
>;

export type PostClimateOrdersResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Climate_Order>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostClimateOrdersRequestResult = RequestResult<
  PostClimateOrdersRequest,
  PostClimateOrdersResponse
>;

export function postClimateOrders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostClimateOrdersRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostClimateOrdersRequestResult> {
  return requestHandler.execute(
    createRequest(postClimateOrdersEndpointSchema, payload),
    config
  );
}

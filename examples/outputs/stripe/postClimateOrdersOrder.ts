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

export const postClimateOrdersOrderEndpointSchema = {
  path: '/v1/climate/orders/{order}',
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

export type PostClimateOrdersOrderRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      beneficiary?: (
        | {
            public_name: string | '';
          }
        | ''
      ) &
        Partial<{
          public_name: string | '';
        }>;
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
    }
  >,
  {
    order: string;
  }
>;

export type PostClimateOrdersOrderResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Climate_Order>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostClimateOrdersOrderRequestResult = RequestResult<
  PostClimateOrdersOrderRequest,
  PostClimateOrdersOrderResponse
>;

export function postClimateOrdersOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostClimateOrdersOrderRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostClimateOrdersOrderRequestResult> {
  return requestHandler.execute(
    createRequest(postClimateOrdersOrderEndpointSchema, payload),
    config
  );
}

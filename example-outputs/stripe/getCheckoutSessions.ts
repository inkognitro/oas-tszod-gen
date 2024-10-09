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
} from '@example-outputs/stripe/core';
import {Checkout_Session, Error} from '@example-outputs/stripe';

export const getCheckoutSessionsEndpointSchema = {
  path: '/v1/checkout/sessions',
  method: 'get',
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

export type GetCheckoutSessionsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    created?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    customer?: string;
    customer_details?: {
      email: string;
    };
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    payment_intent?: string;
    payment_link?: string;
    starting_after?: string;
    status?: 'complete' | 'expired' | 'open';
    subscription?: string;
  }
>;

export type GetCheckoutSessionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Checkout_Session[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCheckoutSessionsRequestResult = RequestResult<
  GetCheckoutSessionsRequest,
  GetCheckoutSessionsResponse
>;

export function getCheckoutSessions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCheckoutSessionsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCheckoutSessionsRequestResult> {
  return requestHandler.execute(
    createRequest(getCheckoutSessionsEndpointSchema, payload),
    config
  );
}

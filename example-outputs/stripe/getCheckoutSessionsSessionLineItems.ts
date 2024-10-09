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
import {Item, Error} from '@example-outputs/stripe';

export const getCheckoutSessionsSessionLineItemsEndpointSchema = {
  path: '/v1/checkout/sessions/{session}/line_items',
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

export type GetCheckoutSessionsSessionLineItemsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    session: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetCheckoutSessionsSessionLineItemsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Item[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCheckoutSessionsSessionLineItemsRequestResult = RequestResult<
  GetCheckoutSessionsSessionLineItemsRequest,
  GetCheckoutSessionsSessionLineItemsResponse
>;

export function getCheckoutSessionsSessionLineItems(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCheckoutSessionsSessionLineItemsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCheckoutSessionsSessionLineItemsRequestResult> {
  return requestHandler.execute(
    createRequest(getCheckoutSessionsSessionLineItemsEndpointSchema, payload),
    config
  );
}

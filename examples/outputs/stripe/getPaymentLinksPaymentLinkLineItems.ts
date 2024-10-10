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
import {Item, Error} from './schemas';

export const getPaymentLinksPaymentLinkLineItemsEndpointSchema = {
  path: '/v1/payment_links/{payment_link}/line_items',
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

export type GetPaymentLinksPaymentLinkLineItemsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    payment_link: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetPaymentLinksPaymentLinkLineItemsResponse =
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

export type GetPaymentLinksPaymentLinkLineItemsRequestResult = RequestResult<
  GetPaymentLinksPaymentLinkLineItemsRequest,
  GetPaymentLinksPaymentLinkLineItemsResponse
>;

export function getPaymentLinksPaymentLinkLineItems(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPaymentLinksPaymentLinkLineItemsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPaymentLinksPaymentLinkLineItemsRequestResult> {
  return requestHandler.execute(
    createRequest(getPaymentLinksPaymentLinkLineItemsEndpointSchema, payload),
    config
  );
}

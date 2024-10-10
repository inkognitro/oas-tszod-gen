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
import {Payment_link, Error} from './schemas';

export const getPaymentLinksPaymentLinkEndpointSchema = {
  path: '/v1/payment_links/{payment_link}',
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

export type GetPaymentLinksPaymentLinkRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    payment_link: string;
  },
  {
    expand?: string[];
  }
>;

export type GetPaymentLinksPaymentLinkResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_link>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPaymentLinksPaymentLinkRequestResult = RequestResult<
  GetPaymentLinksPaymentLinkRequest,
  GetPaymentLinksPaymentLinkResponse
>;

export function getPaymentLinksPaymentLink(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPaymentLinksPaymentLinkRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPaymentLinksPaymentLinkRequestResult> {
  return requestHandler.execute(
    createRequest(getPaymentLinksPaymentLinkEndpointSchema, payload),
    config
  );
}

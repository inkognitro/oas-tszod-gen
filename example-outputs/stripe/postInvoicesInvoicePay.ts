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
import {Invoice, Error} from '@example-outputs/stripe';

export const postInvoicesInvoicePayEndpointSchema = {
  path: '/v1/invoices/{invoice}/pay',
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

export type PostInvoicesInvoicePayRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      forgive?: boolean;
      mandate?: string | '';
      off_session?: boolean;
      paid_out_of_band?: boolean;
      payment_method?: string;
      source?: string;
    }
  >,
  {
    invoice: string;
  }
>;

export type PostInvoicesInvoicePayResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoice>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoicesInvoicePayRequestResult = RequestResult<
  PostInvoicesInvoicePayRequest,
  PostInvoicesInvoicePayResponse
>;

export function postInvoicesInvoicePay(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoicesInvoicePayRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoicesInvoicePayRequestResult> {
  return requestHandler.execute(
    createRequest(postInvoicesInvoicePayEndpointSchema, payload),
    config
  );
}

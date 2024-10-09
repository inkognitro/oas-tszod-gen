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

export const postInvoicesInvoiceMarkUncollectibleEndpointSchema = {
  path: '/v1/invoices/{invoice}/mark_uncollectible',
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

export type PostInvoicesInvoiceMarkUncollectibleRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    invoice: string;
  }
>;

export type PostInvoicesInvoiceMarkUncollectibleResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoice>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoicesInvoiceMarkUncollectibleRequestResult = RequestResult<
  PostInvoicesInvoiceMarkUncollectibleRequest,
  PostInvoicesInvoiceMarkUncollectibleResponse
>;

export function postInvoicesInvoiceMarkUncollectible(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoicesInvoiceMarkUncollectibleRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoicesInvoiceMarkUncollectibleRequestResult> {
  return requestHandler.execute(
    createRequest(postInvoicesInvoiceMarkUncollectibleEndpointSchema, payload),
    config
  );
}

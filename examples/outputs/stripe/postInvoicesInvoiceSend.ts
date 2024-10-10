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
import {Invoice, Error} from './schemas';

export const postInvoicesInvoiceSendEndpointSchema = {
  path: '/v1/invoices/{invoice}/send',
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

export type PostInvoicesInvoiceSendRequest = RequestUnion<
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

export type PostInvoicesInvoiceSendResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoice>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoicesInvoiceSendRequestResult = RequestResult<
  PostInvoicesInvoiceSendRequest,
  PostInvoicesInvoiceSendResponse
>;

export function postInvoicesInvoiceSend(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoicesInvoiceSendRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoicesInvoiceSendRequestResult> {
  return requestHandler.execute(
    createRequest(postInvoicesInvoiceSendEndpointSchema, payload),
    config
  );
}

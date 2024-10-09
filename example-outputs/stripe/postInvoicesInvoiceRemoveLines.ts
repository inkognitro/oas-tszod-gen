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

export const postInvoicesInvoiceRemoveLinesEndpointSchema = {
  path: '/v1/invoices/{invoice}/remove_lines',
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

export type PostInvoicesInvoiceRemoveLinesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      invoice_metadata?:
        | {
            [key: string]: string;
          }
        | '';
      lines: {
        behavior: 'delete' | 'unassign';
        id: string;
      }[];
    }
  >,
  {
    invoice: string;
  }
>;

export type PostInvoicesInvoiceRemoveLinesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoice>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoicesInvoiceRemoveLinesRequestResult = RequestResult<
  PostInvoicesInvoiceRemoveLinesRequest,
  PostInvoicesInvoiceRemoveLinesResponse
>;

export function postInvoicesInvoiceRemoveLines(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoicesInvoiceRemoveLinesRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoicesInvoiceRemoveLinesRequestResult> {
  return requestHandler.execute(
    createRequest(postInvoicesInvoiceRemoveLinesEndpointSchema, payload),
    config
  );
}

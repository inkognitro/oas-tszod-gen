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
import {Line_item, Error} from '@example-outputs/stripe';

export const getInvoicesInvoiceLinesEndpointSchema = {
  path: '/v1/invoices/{invoice}/lines',
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

export type GetInvoicesInvoiceLinesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    invoice: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetInvoicesInvoiceLinesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Line_item[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetInvoicesInvoiceLinesRequestResult = RequestResult<
  GetInvoicesInvoiceLinesRequest,
  GetInvoicesInvoiceLinesResponse
>;

export function getInvoicesInvoiceLines(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetInvoicesInvoiceLinesRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetInvoicesInvoiceLinesRequestResult> {
  return requestHandler.execute(
    createRequest(getInvoicesInvoiceLinesEndpointSchema, payload),
    config
  );
}

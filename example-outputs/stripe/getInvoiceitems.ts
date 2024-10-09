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
import {Invoiceitem, Error} from '@example-outputs/stripe';

export const getInvoiceitemsEndpointSchema = {
  path: '/v1/invoiceitems',
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

export type GetInvoiceitemsRequest = RequestUnion<
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
    ending_before?: string;
    expand?: string[];
    invoice?: string;
    limit?: number; // int
    pending?: boolean;
    starting_after?: string;
  }
>;

export type GetInvoiceitemsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Invoiceitem[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetInvoiceitemsRequestResult = RequestResult<
  GetInvoiceitemsRequest,
  GetInvoiceitemsResponse
>;

export function getInvoiceitems(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetInvoiceitemsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetInvoiceitemsRequestResult> {
  return requestHandler.execute(
    createRequest(getInvoiceitemsEndpointSchema, payload),
    config
  );
}

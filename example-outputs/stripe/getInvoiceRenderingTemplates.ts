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
import {Invoice_rendering_template, Error} from '@example-outputs/stripe';

export const getInvoiceRenderingTemplatesEndpointSchema = {
  path: '/v1/invoice_rendering_templates',
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

export type GetInvoiceRenderingTemplatesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
    status?: 'active' | 'archived';
  }
>;

export type GetInvoiceRenderingTemplatesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Invoice_rendering_template[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetInvoiceRenderingTemplatesRequestResult = RequestResult<
  GetInvoiceRenderingTemplatesRequest,
  GetInvoiceRenderingTemplatesResponse
>;

export function getInvoiceRenderingTemplates(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetInvoiceRenderingTemplatesRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetInvoiceRenderingTemplatesRequestResult> {
  return requestHandler.execute(
    createRequest(getInvoiceRenderingTemplatesEndpointSchema, payload),
    config
  );
}

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
import {Invoice_rendering_template, Error} from './schemas';

export const getInvoiceRenderingTemplatesTemplateEndpointSchema = {
  path: '/v1/invoice_rendering_templates/{template}',
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

export type GetInvoiceRenderingTemplatesTemplateRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    template: string;
  },
  {
    expand?: string[];
    version?: number; // int
  }
>;

export type GetInvoiceRenderingTemplatesTemplateResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Invoice_rendering_template>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetInvoiceRenderingTemplatesTemplateRequestResult = RequestResult<
  GetInvoiceRenderingTemplatesTemplateRequest,
  GetInvoiceRenderingTemplatesTemplateResponse
>;

export function getInvoiceRenderingTemplatesTemplate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetInvoiceRenderingTemplatesTemplateRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetInvoiceRenderingTemplatesTemplateRequestResult> {
  return requestHandler.execute(
    createRequest(getInvoiceRenderingTemplatesTemplateEndpointSchema, payload),
    config
  );
}

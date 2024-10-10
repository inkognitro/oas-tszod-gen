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

export const postInvoiceRenderingTemplatesTemplateUnarchiveEndpointSchema = {
  path: '/v1/invoice_rendering_templates/{template}/unarchive',
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

export type PostInvoiceRenderingTemplatesTemplateUnarchiveRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
      }
    >,
    {
      template: string;
    }
  >;

export type PostInvoiceRenderingTemplatesTemplateUnarchiveResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Invoice_rendering_template>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoiceRenderingTemplatesTemplateUnarchiveRequestResult =
  RequestResult<
    PostInvoiceRenderingTemplatesTemplateUnarchiveRequest,
    PostInvoiceRenderingTemplatesTemplateUnarchiveResponse
  >;

export function postInvoiceRenderingTemplatesTemplateUnarchive(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoiceRenderingTemplatesTemplateUnarchiveRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoiceRenderingTemplatesTemplateUnarchiveRequestResult> {
  return requestHandler.execute(
    createRequest(
      postInvoiceRenderingTemplatesTemplateUnarchiveEndpointSchema,
      payload
    ),
    config
  );
}

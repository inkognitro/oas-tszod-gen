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

export const postInvoiceRenderingTemplatesTemplateArchiveEndpointSchema = {
  path: '/v1/invoice_rendering_templates/{template}/archive',
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

export type PostInvoiceRenderingTemplatesTemplateArchiveRequest = RequestUnion<
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

export type PostInvoiceRenderingTemplatesTemplateArchiveResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Invoice_rendering_template>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoiceRenderingTemplatesTemplateArchiveRequestResult =
  RequestResult<
    PostInvoiceRenderingTemplatesTemplateArchiveRequest,
    PostInvoiceRenderingTemplatesTemplateArchiveResponse
  >;

export function postInvoiceRenderingTemplatesTemplateArchive(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoiceRenderingTemplatesTemplateArchiveRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoiceRenderingTemplatesTemplateArchiveRequestResult> {
  return requestHandler.execute(
    createRequest(
      postInvoiceRenderingTemplatesTemplateArchiveEndpointSchema,
      payload
    ),
    config
  );
}

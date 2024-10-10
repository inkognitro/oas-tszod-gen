import {
  z_Invoice_rendering_template,
  z_Error,
  Invoice_rendering_template,
  Error,
} from './schemas';
import {z} from 'zod';
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

export const postInvoiceRenderingTemplatesTemplateArchiveEndpointSchema = {
  path: '/v1/invoice_rendering_templates/{template}/archive',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    template: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Invoice_rendering_template,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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

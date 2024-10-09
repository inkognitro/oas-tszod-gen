import {
  z_Invoice_rendering_template,
  z_Error,
  Invoice_rendering_template,
  Error,
} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const postInvoiceRenderingTemplatesTemplateUnarchiveEndpointSchema = {
  path: '/v1/invoice_rendering_templates/{template}/unarchive',
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

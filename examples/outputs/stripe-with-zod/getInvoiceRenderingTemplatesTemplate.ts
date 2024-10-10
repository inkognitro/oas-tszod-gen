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

export const getInvoiceRenderingTemplatesTemplateEndpointSchema = {
  path: '/v1/invoice_rendering_templates/{template}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
    version: z.number().int().safe().finite().optional(),
  }),
  pathParamsZodSchema: z.object({
    template: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
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

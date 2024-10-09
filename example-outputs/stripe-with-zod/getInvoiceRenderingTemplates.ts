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

export const getInvoiceRenderingTemplatesEndpointSchema = {
  path: '/v1/invoice_rendering_templates',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
    status: z.enum(['active', 'archived']).optional(),
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
          zodSchema: z.object({
            data: z.array(z_Invoice_rendering_template),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string(),
          }),
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

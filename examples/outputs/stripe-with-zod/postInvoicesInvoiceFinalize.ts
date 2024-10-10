import {z_Invoice, z_Error, Invoice, Error} from './schemas';
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

export const postInvoicesInvoiceFinalizeEndpointSchema = {
  path: '/v1/invoices/{invoice}/finalize',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    invoice: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        auto_advance: z.boolean().optional(),
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Invoice,
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

export type PostInvoicesInvoiceFinalizeRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      auto_advance?: boolean;
      expand?: string[];
    }
  >,
  {
    invoice: string;
  }
>;

export type PostInvoicesInvoiceFinalizeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoice>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoicesInvoiceFinalizeRequestResult = RequestResult<
  PostInvoicesInvoiceFinalizeRequest,
  PostInvoicesInvoiceFinalizeResponse
>;

export function postInvoicesInvoiceFinalize(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoicesInvoiceFinalizeRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoicesInvoiceFinalizeRequestResult> {
  return requestHandler.execute(
    createRequest(postInvoicesInvoiceFinalizeEndpointSchema, payload),
    config
  );
}

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

export const postInvoicesInvoicePayEndpointSchema = {
  path: '/v1/invoices/{invoice}/pay',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    invoice: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        forgive: z.boolean().optional(),
        mandate: z.union([z.string(), z.enum([''])]).optional(),
        off_session: z.boolean().optional(),
        paid_out_of_band: z.boolean().optional(),
        payment_method: z.string().optional(),
        source: z.string().optional(),
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

export type PostInvoicesInvoicePayRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      forgive?: boolean;
      mandate?: string | '';
      off_session?: boolean;
      paid_out_of_band?: boolean;
      payment_method?: string;
      source?: string;
    }
  >,
  {
    invoice: string;
  }
>;

export type PostInvoicesInvoicePayResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoice>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoicesInvoicePayRequestResult = RequestResult<
  PostInvoicesInvoicePayRequest,
  PostInvoicesInvoicePayResponse
>;

export function postInvoicesInvoicePay(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoicesInvoicePayRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoicesInvoicePayRequestResult> {
  return requestHandler.execute(
    createRequest(postInvoicesInvoicePayEndpointSchema, payload),
    config
  );
}

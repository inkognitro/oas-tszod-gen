import {
  z_Invoice,
  z_Error,
  Invoice,
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

export const postInvoicesInvoiceVoidEndpointSchema = {
  path: '/v1/invoices/{invoice}/void',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    invoice: z.string(),
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

export type PostInvoicesInvoiceVoidRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    invoice: string;
  }
>;

export type PostInvoicesInvoiceVoidResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoice>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoicesInvoiceVoidRequestResult = RequestResult<
  PostInvoicesInvoiceVoidRequest,
  PostInvoicesInvoiceVoidResponse
>;

export function postInvoicesInvoiceVoid(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoicesInvoiceVoidRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoicesInvoiceVoidRequestResult> {
  return requestHandler.execute(
    createRequest(postInvoicesInvoiceVoidEndpointSchema, payload),
    config
  );
}

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

export const postInvoicesInvoiceSendEndpointSchema = {
  path: '/v1/invoices/{invoice}/send',
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

export type PostInvoicesInvoiceSendRequest = RequestUnion<
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

export type PostInvoicesInvoiceSendResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoice>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoicesInvoiceSendRequestResult = RequestResult<
  PostInvoicesInvoiceSendRequest,
  PostInvoicesInvoiceSendResponse
>;

export function postInvoicesInvoiceSend(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoicesInvoiceSendRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoicesInvoiceSendRequestResult> {
  return requestHandler.execute(
    createRequest(postInvoicesInvoiceSendEndpointSchema, payload),
    config
  );
}

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

export const postInvoicesInvoiceRemoveLinesEndpointSchema = {
  path: '/v1/invoices/{invoice}/remove_lines',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    invoice: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        invoice_metadata: z
          .union([z.record(z.string()), z.enum([''])])
          .optional(),
        lines: z.array(
          z.object({
            behavior: z.enum(['delete', 'unassign']),
            id: z.string(),
          })
        ),
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

export type PostInvoicesInvoiceRemoveLinesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      invoice_metadata?:
        | {
            [key: string]: string;
          }
        | '';
      lines: {
        behavior: 'delete' | 'unassign';
        id: string;
      }[];
    }
  >,
  {
    invoice: string;
  }
>;

export type PostInvoicesInvoiceRemoveLinesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoice>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoicesInvoiceRemoveLinesRequestResult = RequestResult<
  PostInvoicesInvoiceRemoveLinesRequest,
  PostInvoicesInvoiceRemoveLinesResponse
>;

export function postInvoicesInvoiceRemoveLines(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoicesInvoiceRemoveLinesRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoicesInvoiceRemoveLinesRequestResult> {
  return requestHandler.execute(
    createRequest(postInvoicesInvoiceRemoveLinesEndpointSchema, payload),
    config
  );
}

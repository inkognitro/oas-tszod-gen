import {
  z_Issuing_Transaction,
  z_Error,
  Issuing_Transaction,
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

export const postIssuingTransactionsTransactionEndpointSchema = {
  path: '/v1/issuing/transactions/{transaction}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    transaction: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Issuing_Transaction,
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

export type PostIssuingTransactionsTransactionRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    transaction: string;
  }
>;

export type PostIssuingTransactionsTransactionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIssuingTransactionsTransactionRequestResult = RequestResult<
  PostIssuingTransactionsTransactionRequest,
  PostIssuingTransactionsTransactionResponse
>;

export function postIssuingTransactionsTransaction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIssuingTransactionsTransactionRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIssuingTransactionsTransactionRequestResult> {
  return requestHandler.execute(
    createRequest(postIssuingTransactionsTransactionEndpointSchema, payload),
    config
  );
}

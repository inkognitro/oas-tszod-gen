import {z_Issuing_Transaction, Issuing_Transaction} from './issuing';
import {z_Error, Error} from './schemas';
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

export const postTestHelpersIssuingTransactionsTransactionRefundEndpointSchema =
  {
    path: '/v1/test_helpers/issuing/transactions/{transaction}/refund',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      transaction: z.string(),
    }),
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({
          expand: z.array(z.string()).optional(),
          refund_amount: z.number().int().safe().finite().optional(),
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

export type PostTestHelpersIssuingTransactionsTransactionRefundRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
        refund_amount?: number; // int
      }
    >,
    {
      transaction: string;
    }
  >;

export type PostTestHelpersIssuingTransactionsTransactionRefundResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersIssuingTransactionsTransactionRefundRequestResult =
  RequestResult<
    PostTestHelpersIssuingTransactionsTransactionRefundRequest,
    PostTestHelpersIssuingTransactionsTransactionRefundResponse
  >;

export function postTestHelpersIssuingTransactionsTransactionRefund(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersIssuingTransactionsTransactionRefundRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersIssuingTransactionsTransactionRefundRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersIssuingTransactionsTransactionRefundEndpointSchema,
      payload
    ),
    config
  );
}

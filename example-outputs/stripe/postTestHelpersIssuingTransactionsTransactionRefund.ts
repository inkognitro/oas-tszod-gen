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
} from '@example-outputs/stripe/core';
import {Issuing_Transaction, Error} from '@example-outputs/stripe';

export const postTestHelpersIssuingTransactionsTransactionRefundEndpointSchema =
  {
    path: '/v1/test_helpers/issuing/transactions/{transaction}/refund',
    method: 'post',
    supportedSecuritySchemas: [],
    bodyByContentType: {
      'application/x-www-form-urlencoded': {},
    },
    responseByStatus: {
      '200': {
        bodyByContentType: {
          'application/json': {},
        },
      },
      default: {
        bodyByContentType: {
          'application/json': {},
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

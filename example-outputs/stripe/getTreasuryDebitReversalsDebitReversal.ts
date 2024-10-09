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
import {Treasury_Debit_reversal, Error} from '@example-outputs/stripe';

export const getTreasuryDebitReversalsDebitReversalEndpointSchema = {
  path: '/v1/treasury/debit_reversals/{debit_reversal}',
  method: 'get',
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

export type GetTreasuryDebitReversalsDebitReversalRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    debit_reversal: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTreasuryDebitReversalsDebitReversalResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Debit_reversal>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryDebitReversalsDebitReversalRequestResult = RequestResult<
  GetTreasuryDebitReversalsDebitReversalRequest,
  GetTreasuryDebitReversalsDebitReversalResponse
>;

export function getTreasuryDebitReversalsDebitReversal(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryDebitReversalsDebitReversalRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryDebitReversalsDebitReversalRequestResult> {
  return requestHandler.execute(
    createRequest(
      getTreasuryDebitReversalsDebitReversalEndpointSchema,
      payload
    ),
    config
  );
}

import {
  z_Treasury_Debit_reversal,
  z_Error,
  Treasury_Debit_reversal,
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

export const getTreasuryDebitReversalsDebitReversalEndpointSchema = {
  path: '/v1/treasury/debit_reversals/{debit_reversal}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    debit_reversal: z.string(),
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
          zodSchema: z_Treasury_Debit_reversal,
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

import {
  repaymentInfoZodSchema,
  repaymentInfo2ZodSchema,
  errorZodSchema,
  RepaymentInfo,
  RepaymentInfo2,
  Error,
} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1LoanRepayEndpointSchema = {
  path: '/sapi/v1/loan/repay',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    orderId: z.number().int().safe().finite(),
    amount: z.number().safe().finite(),
    type: z.number().int().safe().finite().optional(),
    collateralReturn: z.boolean().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.union([repaymentInfoZodSchema, repaymentInfo2ZodSchema]),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type PostSapiV1LoanRepayPayload = {
  queryParams: {
    orderId: number; // int
    amount: number;
    type?: number; // int
    collateralReturn?: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1LoanRepayResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', RepaymentInfo | RepaymentInfo2>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LoanRepayRequestResult = RequestResult<
  Request,
  PostSapiV1LoanRepayResponse
>;

export function postSapiV1LoanRepay(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LoanRepayPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanRepayRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LoanRepayEndpointSchema,
    }),
    config
  );
}

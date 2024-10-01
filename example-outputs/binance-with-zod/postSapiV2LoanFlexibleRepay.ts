import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const postSapiV2LoanFlexibleRepayEndpointSchema = {
  path: '/sapi/v2/loan/flexible/repay',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    loanCoin: z.string().optional(),
    collateralCoin: z.string().optional(),
    repayAmount: z.number().safe().finite(),
    collateralReturn: z.boolean().optional(),
    fullRepayment: z.boolean().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            loanCoin: z.string(),
            collateralCoin: z.string(),
            remainingDebt: z.string(),
            remainingCollateral: z.string(),
            fullRepayment: z.boolean(),
            currentLTV: z.string(),
            repayStatus: z.string(),
          }),
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

export type PostSapiV2LoanFlexibleRepayPayload = {
  queryParams: {
    loanCoin?: string;
    collateralCoin?: string;
    repayAmount: number;
    collateralReturn?: boolean;
    fullRepayment?: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV2LoanFlexibleRepayResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          loanCoin: string;
          collateralCoin: string;
          remainingDebt: string;
          remainingCollateral: string;
          fullRepayment: boolean;
          currentLTV: string;
          repayStatus: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV2LoanFlexibleRepayRequestResult = RequestResult<
  Request,
  PostSapiV2LoanFlexibleRepayResponse
>;

export function postSapiV2LoanFlexibleRepay(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV2LoanFlexibleRepayPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV2LoanFlexibleRepayRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV2LoanFlexibleRepayEndpointSchema,
    }),
    config
  );
}

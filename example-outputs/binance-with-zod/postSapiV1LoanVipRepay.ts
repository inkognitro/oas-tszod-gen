import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1LoanVipRepayEndpointSchema = {
  path: '/sapi/v1/loan/vip/repay',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    orderId: z.number().int().safe().finite().optional(),
    amount: z.number().safe().finite(),
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
            repayAmount: z.string(),
            remainingPrincipal: z.string(),
            remainingInterest: z.string(),
            collateralCoin: z.string(),
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

export type PostSapiV1LoanVipRepayPayload = {
  queryParams: {
    orderId?: number; // int
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1LoanVipRepayResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            loanCoin: string;
            repayAmount: string;
            remainingPrincipal: string;
            remainingInterest: string;
            collateralCoin: string;
            currentLTV: string;
            repayStatus: string;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1LoanVipRepayRequestResult = RequestResult<
  Request,
  PostSapiV1LoanVipRepayResponse
>;

export function postSapiV1LoanVipRepay(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LoanVipRepayPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanVipRepayRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LoanVipRepayEndpointSchema,
    }),
    config
  );
}

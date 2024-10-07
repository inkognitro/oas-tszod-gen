import {z_Error, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1LoanVipRepayEndpointSchema = {
  path: '/sapi/v1/loan/vip/repay',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type PostSapiV1LoanVipRepayRequest = RequestUnion<
  any,
  any,
  {
    orderId?: number; // int
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1LoanVipRepayResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LoanVipRepayRequestResult = RequestResult<
  PostSapiV1LoanVipRepayRequest,
  PostSapiV1LoanVipRepayResponse
>;

export function postSapiV1LoanVipRepay(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1LoanVipRepayRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanVipRepayRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1LoanVipRepayEndpointSchema, payload),
    config
  );
}

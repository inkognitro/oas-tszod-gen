import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1LoanVipRequestInterestrateEndpointSchema = {
  path: '/sapi/v1/loan/vip/request/interestRate',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    loanCoin: z.string().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              asset: z.string(),
              flexibleDailyInterestRate: z.string(),
              flexibleYearlyInterestRate: z.string(),
              time: z.number().int().safe().finite(),
            })
          ),
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

export type GetSapiV1LoanVipRequestInterestratePayload = {
  queryParams: {
    loanCoin?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanVipRequestInterestrateResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          flexibleDailyInterestRate: string;
          flexibleYearlyInterestRate: string;
          time: number; // int
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanVipRequestInterestrateRequestResult = RequestResult<
  Request,
  GetSapiV1LoanVipRequestInterestrateResponse
>;

export function getSapiV1LoanVipRequestInterestrate(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LoanVipRequestInterestratePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanVipRequestInterestrateRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanVipRequestInterestrateEndpointSchema,
    }),
    config
  );
}

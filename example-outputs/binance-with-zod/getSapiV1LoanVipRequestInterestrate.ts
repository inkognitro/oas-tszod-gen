import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const getSapiV1LoanVipRequestInterestrateEndpointSchema = {
  path: '/sapi/v1/loan/vip/request/interestRate',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type GetSapiV1LoanVipRequestInterestrateRequest = RequestUnion<
  any,
  any,
  {
    loanCoin?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1LoanVipRequestInterestrateResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanVipRequestInterestrateRequestResult = RequestResult<
  GetSapiV1LoanVipRequestInterestrateRequest,
  GetSapiV1LoanVipRequestInterestrateResponse
>;

export function getSapiV1LoanVipRequestInterestrate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1LoanVipRequestInterestrateRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanVipRequestInterestrateRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1LoanVipRequestInterestrateEndpointSchema, payload),
    config
  );
}

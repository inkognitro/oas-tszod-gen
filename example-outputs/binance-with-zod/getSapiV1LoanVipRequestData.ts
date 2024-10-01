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

export const getSapiV1LoanVipRequestDataEndpointSchema = {
  path: '/sapi/v1/loan/vip/request/data',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    current: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
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
            total: z.number().int().safe().finite(),
            rows: z.array(
              z.object({
                loanAccountId: z.string(),
                orderId: z.string(),
                requestId: z.string(),
                loanCoin: z.string(),
                loanAmount: z.string(),
                collateralAccountId: z.string(),
                collateralCoin: z.string(),
                loanTerm: z.number().int().safe().finite(),
                status: z.number().int().safe().finite(),
              })
            ),
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

export type GetSapiV1LoanVipRequestDataPayload = {
  queryParams: {
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanVipRequestDataResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          rows: {
            loanAccountId: string;
            orderId: string;
            requestId: string;
            loanCoin: string;
            loanAmount: string;
            collateralAccountId: string;
            collateralCoin: string;
            loanTerm: number; // int
            status: number; // int
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanVipRequestDataRequestResult = RequestResult<
  Request,
  GetSapiV1LoanVipRequestDataResponse
>;

export function getSapiV1LoanVipRequestData(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LoanVipRequestDataPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanVipRequestDataRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanVipRequestDataEndpointSchema,
    }),
    config
  );
}

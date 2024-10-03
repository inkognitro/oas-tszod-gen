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

export const getSapiV2LoanFlexibleLoanableDataEndpointSchema = {
  path: '/sapi/v2/loan/flexible/loanable/data',
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
          zodSchema: z.object({
            rows: z.array(
              z.object({
                loanCoin: z.string(),
                flexibleInterestRate: z.string(),
                flexibleMinLimit: z.string(),
                flexibleMaxLimit: z.string(),
              })
            ),
            total: z.number().int().safe().finite(),
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

export type GetSapiV2LoanFlexibleLoanableDataRequest = RequestUnion<
  any,
  any,
  {
    loanCoin?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV2LoanFlexibleLoanableDataResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            loanCoin: string;
            flexibleInterestRate: string;
            flexibleMinLimit: string;
            flexibleMaxLimit: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2LoanFlexibleLoanableDataRequestResult = RequestResult<
  GetSapiV2LoanFlexibleLoanableDataRequest,
  GetSapiV2LoanFlexibleLoanableDataResponse
>;

export function getSapiV2LoanFlexibleLoanableData(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV2LoanFlexibleLoanableDataRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2LoanFlexibleLoanableDataRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV2LoanFlexibleLoanableDataEndpointSchema, payload),
    config
  );
}

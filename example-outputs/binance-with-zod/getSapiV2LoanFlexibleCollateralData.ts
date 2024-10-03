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

export const getSapiV2LoanFlexibleCollateralDataEndpointSchema = {
  path: '/sapi/v2/loan/flexible/collateral/data',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    collateralCoin: z.string().optional(),
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
                collateralCoin: z.string(),
                initialLTV: z.string(),
                marginCallLTV: z.string(),
                liquidationLTV: z.string(),
                maxLimit: z.string(),
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

export type GetSapiV2LoanFlexibleCollateralDataRequest = RequestUnion<
  any,
  any,
  {
    collateralCoin?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV2LoanFlexibleCollateralDataResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            collateralCoin: string;
            initialLTV: string;
            marginCallLTV: string;
            liquidationLTV: string;
            maxLimit: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2LoanFlexibleCollateralDataRequestResult = RequestResult<
  GetSapiV2LoanFlexibleCollateralDataRequest,
  GetSapiV2LoanFlexibleCollateralDataResponse
>;

export function getSapiV2LoanFlexibleCollateralData(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV2LoanFlexibleCollateralDataRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2LoanFlexibleCollateralDataRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV2LoanFlexibleCollateralDataEndpointSchema, payload),
    config
  );
}

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

export const getSapiV1DciProductPositionsEndpointSchema = {
  path: '/sapi/v1/dci/product/positions',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    status: z
      .enum([
        'PENDING',
        'PURCHASE_SUCCESS',
        'SETTLED',
        'PURCHASE_FAIL',
        'REFUNDING',
        'REFUND_SUCCESS',
        'SETTLING',
      ])
      .optional(),
    pageSize: z.string().optional(),
    pageIndex: z.number().int().safe().finite().optional(),
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
            list: z.array(
              z.object({
                id: z.string(),
                investCoin: z.string(),
                exercisedCoin: z.string(),
                subscriptionAmount: z.string(),
                strikePrice: z.string(),
                duration: z.number().int().safe().finite(),
                settleDate: z.number().int().safe().finite(),
                purchaseStatus: z.string(),
                apr: z.string(),
                orderId: z.number().int().safe().finite(),
                purchaseEndTime: z.number().int().safe().finite(),
                optionType: z.string(),
                autoCompoundPlan: z.string(),
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

export type GetSapiV1DciProductPositionsPayload = {
  queryParams: {
    status?:
      | 'PENDING'
      | 'PURCHASE_SUCCESS'
      | 'SETTLED'
      | 'PURCHASE_FAIL'
      | 'REFUNDING'
      | 'REFUND_SUCCESS'
      | 'SETTLING';
    pageSize?: string;
    pageIndex?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1DciProductPositionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          list: {
            id: string;
            investCoin: string;
            exercisedCoin: string;
            subscriptionAmount: string;
            strikePrice: string;
            duration: number; // int
            settleDate: number; // int
            purchaseStatus: string;
            apr: string;
            orderId: number; // int
            purchaseEndTime: number; // int
            optionType: string;
            autoCompoundPlan: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1DciProductPositionsRequestResult = RequestResult<
  Request,
  GetSapiV1DciProductPositionsResponse
>;

export function getSapiV1DciProductPositions(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1DciProductPositionsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1DciProductPositionsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1DciProductPositionsEndpointSchema,
    }),
    config
  );
}

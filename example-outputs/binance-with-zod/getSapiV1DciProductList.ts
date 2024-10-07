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

export const getSapiV1DciProductListEndpointSchema = {
  path: '/sapi/v1/dci/product/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    optionType: z.enum(['CALL', 'PUT']),
    exercisedCoin: z.string(),
    investCoin: z.string(),
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
                strikePrice: z.string(),
                duration: z.number().int().safe().finite(),
                settleDate: z.number().int().safe().finite(),
                purchaseDecimal: z.number().int().safe().finite(),
                purchaseEndTime: z.number().int().safe().finite(),
                canPurchase: z.boolean(),
                apr: z.string(),
                orderId: z.number().int().safe().finite(),
                minAmount: z.string(),
                maxAmount: z.string(),
                createTimestamp: z.number().int().safe().finite(),
                optionType: z.string(),
                isAutoCompoundEnable: z.boolean(),
                autoCompoundPlanList: z.array(z.string()),
              })
            ),
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

export type GetSapiV1DciProductListRequest = RequestUnion<
  any,
  any,
  {
    optionType: 'CALL' | 'PUT';
    exercisedCoin: string;
    investCoin: string;
    pageSize?: string;
    pageIndex?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1DciProductListResponse =
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
            strikePrice: string;
            duration: number; // int
            settleDate: number; // int
            purchaseDecimal: number; // int
            purchaseEndTime: number; // int
            canPurchase: boolean;
            apr: string;
            orderId: number; // int
            minAmount: string;
            maxAmount: string;
            createTimestamp: number; // int
            optionType: string;
            isAutoCompoundEnable: boolean;
            autoCompoundPlanList: string[];
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1DciProductListRequestResult = RequestResult<
  GetSapiV1DciProductListRequest,
  GetSapiV1DciProductListResponse
>;

export function getSapiV1DciProductList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1DciProductListRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1DciProductListRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1DciProductListEndpointSchema, payload),
    config
  );
}

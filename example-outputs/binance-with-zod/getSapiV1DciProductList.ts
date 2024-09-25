import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1DciProductListEndpointSchema = {
  path: '/sapi/v1/dci/product/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    optionType: z.enum('CALL', 'PUT'),
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

export type GetSapiV1DciProductListPayload = {
  queryParams: {
    optionType: 'CALL' | 'PUT';
    exercisedCoin: string;
    investCoin: string;
    pageSize?: string;
    pageIndex?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1DciProductListResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1DciProductListRequestResult = RequestResult<
  Request,
  GetSapiV1DciProductListResponse
>;

export function getSapiV1DciProductList(
  requestHandler: RequestHandler,
  payload: GetSapiV1DciProductListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1DciProductListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1DciProductListEndpointSchema,
    }),
    config
  );
}

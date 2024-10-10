import {z_Error, Error} from '../../../../';
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
} from '../../../../core';

export const getListUserOrderHistoryEndpointSchema = {
  path: '/sapi/v1/c2c/orderMatch/listUserOrderHistory',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    tradeType: z.enum(['BUY', 'SELL']),
    startTimestamp: z.number().int().safe().finite().optional(),
    endTimestamp: z.number().int().safe().finite().optional(),
    page: z.number().int().safe().finite().optional(),
    rows: z.number().int().safe().finite().optional(),
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
            code: z.string(),
            message: z.string(),
            data: z.array(
              z.object({
                orderNumber: z.string(),
                advNo: z.string(),
                tradeType: z.string(),
                asset: z.string(),
                fiat: z.string(),
                fiatSymbol: z.string(),
                amount: z.string(),
                totalPrice: z.string(),
                unitPrice: z.string(),
                orderStatus: z.string(),
                createTime: z.number().int().safe().finite(),
                commission: z.string(),
                counterPartNickName: z.string(),
                advertisementRole: z.string(),
              })
            ),
            total: z.number().int().safe().finite(),
            success: z.boolean(),
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

export type GetListUserOrderHistoryRequest = RequestUnion<
  any,
  any,
  {
    tradeType: 'BUY' | 'SELL';
    startTimestamp?: number; // int
    endTimestamp?: number; // int
    page?: number; // int
    rows?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetListUserOrderHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: {
            orderNumber: string;
            advNo: string;
            tradeType: string;
            asset: string;
            fiat: string;
            fiatSymbol: string;
            amount: string;
            totalPrice: string;
            unitPrice: string;
            orderStatus: string;
            createTime: number; // int
            commission: string;
            counterPartNickName: string;
            advertisementRole: string;
          }[];
          total: number; // int
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetListUserOrderHistoryRequestResult = RequestResult<
  GetListUserOrderHistoryRequest,
  GetListUserOrderHistoryResponse
>;

export function getListUserOrderHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetListUserOrderHistoryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetListUserOrderHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getListUserOrderHistoryEndpointSchema, payload),
    config
  );
}

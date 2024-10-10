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

export const getPositionsEndpointSchema = {
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

export type GetPositionsRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type GetPositionsResponse =
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

export type GetPositionsRequestResult = RequestResult<
  GetPositionsRequest,
  GetPositionsResponse
>;

export function getPositions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetPositionsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetPositionsRequestResult> {
  return requestHandler.execute(
    createRequest(getPositionsEndpointSchema, payload),
    config
  );
}

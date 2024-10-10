import {z_Error, Error} from '../../../../../';
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
} from '../../../../../core';

export const getListEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
    current: z.number().int().safe().finite().optional(),
    size: z.number().int().safe().finite().optional(),
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
                asset: z.string(),
                latestAnnualPercentageRate: z.string(),
                tierAnnualPercentageRate: z.object({
                  '0-5BTC': z.number().safe().finite(),
                  '5-10BTC': z.number().safe().finite(),
                }),
                airDropPercentageRate: z.string(),
                canPurchase: z.boolean(),
                canRedeem: z.boolean(),
                isSoldOut: z.boolean(),
                hot: z.boolean(),
                minPurchaseAmount: z.string(),
                productId: z.string(),
                subscriptionStartTime: z.string(),
                status: z.string(),
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

export type GetListRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            asset: string;
            latestAnnualPercentageRate: string;
            tierAnnualPercentageRate: {
              '0-5BTC': number;
              '5-10BTC': number;
            };
            airDropPercentageRate: string;
            canPurchase: boolean;
            canRedeem: boolean;
            isSoldOut: boolean;
            hot: boolean;
            minPurchaseAmount: string;
            productId: string;
            subscriptionStartTime: string;
            status: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetListRequestResult = RequestResult<
  GetListRequest,
  GetListResponse
>;

export function getList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetListRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetListRequestResult> {
  return requestHandler.execute(
    createRequest(getListEndpointSchema, payload),
    config
  );
}

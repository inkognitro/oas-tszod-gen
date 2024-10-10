import {z_Error, Error} from '../../../';
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
} from '../../../core';

export const getTokenInfoEndpointSchema = {
  path: '/sapi/v1/blvt/tokenInfo',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    tokenName: z.string().optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              tokenName: z.string(),
              description: z.string(),
              underlying: z.string(),
              tokenIssued: z.string(),
              basket: z.string(),
              currentBaskets: z.array(
                z.object({
                  symbol: z.string(),
                  amount: z.string(),
                  notionalValue: z.string(),
                })
              ),
              nav: z.string(),
              realLeverage: z.string(),
              fundingRate: z.string(),
              dailyManagementFee: z.string(),
              purchaseFeePct: z.string(),
              dailyPurchaseLimit: z.string(),
              redeemFeePct: z.string(),
              dailyRedeemLimit: z.string(),
              timestamp: z.number().int().safe().finite(),
            })
          ),
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
  },
};

export type GetTokenInfoRequest = RequestUnion<
  any,
  any,
  {
    tokenName?: string;
  }
>;

export type GetTokenInfoResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          tokenName: string;
          description: string;
          underlying: string;
          tokenIssued: string;
          basket: string;
          currentBaskets: {
            symbol: string;
            amount: string;
            notionalValue: string;
          }[];
          nav: string;
          realLeverage: string;
          fundingRate: string;
          dailyManagementFee: string;
          purchaseFeePct: string;
          dailyPurchaseLimit: string;
          redeemFeePct: string;
          dailyRedeemLimit: string;
          timestamp: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetTokenInfoRequestResult = RequestResult<
  GetTokenInfoRequest,
  GetTokenInfoResponse
>;

export function getTokenInfo(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetTokenInfoRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetTokenInfoRequestResult> {
  return requestHandler.execute(
    createRequest(getTokenInfoEndpointSchema, payload),
    config
  );
}

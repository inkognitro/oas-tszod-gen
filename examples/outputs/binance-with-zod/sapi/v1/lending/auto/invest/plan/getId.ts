import {z_Error, Error} from '../../../../../../';
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
} from '../../../../../../core';

export const getIdEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/plan/id',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    planId: z.number().int().safe().finite().optional(),
    requestId: z.string().optional(),
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
            planValueInUSD: z.string().optional(),
            planValueInBTC: z.string().optional(),
            pnlInUSD: z.string().optional(),
            roi: z.string().optional(),
            plan: z
              .array(
                z.object({
                  planId: z.number().int().safe().finite(),
                  planType: z.string(),
                  editAllowed: z.string(),
                  flexibleAllowedToUse: z.string(),
                  creationDateTime: z.number().int().safe().finite(),
                  firstExecutionDateTime: z.number().int().safe().finite(),
                  nextExecutionDateTime: z.number().int().safe().finite(),
                  status: z.string(),
                  targetAsset: z.string(),
                  sourceAsset: z.string(),
                  totalInvestedInUSD: z.string(),
                  planValueInUSD: z.string(),
                  pnlInUSD: z.string(),
                  roi: z.string(),
                  details: z.array(
                    z.object({
                      targetAsset: z.string(),
                      averagePriceInUSD: z.string(),
                      totalInvestedInUSD: z.string(),
                      purchasedAmount: z.string(),
                      purchasedAmountUnit: z.string(),
                      pnlInUSD: z.string(),
                      roi: z.string(),
                      percentage: z.string(),
                      assetStatus: z.string(),
                      availableAmount: z.string(),
                      availableAmountUnit: z.string(),
                      redeemedAmout: z.string(),
                      redeemedAmoutUnit: z.string(),
                      assetValueInUSD: z.string(),
                    })
                  ),
                })
              )
              .optional(),
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

export type GetIdRequest = RequestUnion<
  any,
  any,
  {
    planId?: number; // int
    requestId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          planValueInUSD?: string;
          planValueInBTC?: string;
          pnlInUSD?: string;
          roi?: string;
          plan?: {
            planId: number; // int
            planType: string;
            editAllowed: string;
            flexibleAllowedToUse: string;
            creationDateTime: number; // int
            firstExecutionDateTime: number; // int
            nextExecutionDateTime: number; // int
            status: string;
            targetAsset: string;
            sourceAsset: string;
            totalInvestedInUSD: string;
            planValueInUSD: string;
            pnlInUSD: string;
            roi: string;
            details: {
              targetAsset: string;
              averagePriceInUSD: string;
              totalInvestedInUSD: string;
              purchasedAmount: string;
              purchasedAmountUnit: string;
              pnlInUSD: string;
              roi: string;
              percentage: string;
              assetStatus: string;
              availableAmount: string;
              availableAmountUnit: string;
              redeemedAmout: string;
              redeemedAmoutUnit: string;
              assetValueInUSD: string;
            }[];
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetIdRequestResult = RequestResult<GetIdRequest, GetIdResponse>;

export function getId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetIdRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetIdRequestResult> {
  return requestHandler.execute(
    createRequest(getIdEndpointSchema, payload),
    config
  );
}

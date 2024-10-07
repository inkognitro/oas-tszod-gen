import {z_Error, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MarginLeveragebracketEndpointSchema = {
  path: '/sapi/v1/margin/leverageBracket',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              assetNames: z.array(z.string()),
              rank: z.number().int().safe().finite(),
              brackets: z.array(
                z.object({
                  leverage: z.number().int().safe().finite().optional(),
                  maxDebt: z.number().safe().finite().optional(),
                  maintenanceMarginRate: z.number().safe().finite().optional(),
                  initialMarginRate: z.number().safe().finite().optional(),
                  fastNum: z.number().safe().finite().optional(),
                })
              ),
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

export type GetSapiV1MarginLeveragebracketRequest = Request;

export type GetSapiV1MarginLeveragebracketResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          assetNames: string[];
          rank: number; // int
          brackets: {
            leverage?: number; // int
            maxDebt?: number;
            maintenanceMarginRate?: number;
            initialMarginRate?: number;
            fastNum?: number;
          }[];
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginLeveragebracketRequestResult = RequestResult<
  GetSapiV1MarginLeveragebracketRequest,
  GetSapiV1MarginLeveragebracketResponse
>;

export function getSapiV1MarginLeveragebracket(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginLeveragebracketRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginLeveragebracketEndpointSchema),
    config
  );
}

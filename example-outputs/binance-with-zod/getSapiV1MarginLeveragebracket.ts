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

export const getSapiV1MarginLeveragebracketEndpointSchema = {
  path: '/sapi/v1/margin/leverageBracket',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type GetSapiV1MarginLeveragebracketResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1MarginLeveragebracketRequestResult = RequestResult<
  Request,
  GetSapiV1MarginLeveragebracketResponse
>;

export function getSapiV1MarginLeveragebracket(
  requestHandler: RequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginLeveragebracketRequestResult> {
  return requestHandler.execute(
    createRequest({
      endpointSchema: getSapiV1MarginLeveragebracketEndpointSchema,
    }),
    config
  );
}

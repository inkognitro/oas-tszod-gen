import {z_Error, Error} from '../../../';
import {z} from 'zod';
import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '../../../core';

export const getLeverageBracketEndpointSchema = {
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

export type GetLeverageBracketRequest = Request;

export type GetLeverageBracketResponse =
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

export type GetLeverageBracketRequestResult = RequestResult<
  GetLeverageBracketRequest,
  GetLeverageBracketResponse
>;

export function getLeverageBracket(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetLeverageBracketRequestResult> {
  return requestHandler.execute(
    createRequest(getLeverageBracketEndpointSchema),
    config
  );
}

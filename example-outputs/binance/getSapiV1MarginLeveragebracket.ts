import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1MarginLeveragebracketEndpointSchema = {
  path: '/sapi/v1/margin/leverageBracket',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetSapiV1MarginLeveragebracketResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginLeveragebracketRequestResult = RequestResult<
  Request,
  GetSapiV1MarginLeveragebracketResponse
>;

export function getSapiV1MarginLeveragebracket(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginLeveragebracketRequestResult> {
  return requestHandler.execute(
    createRequest({
      endpointSchema: getSapiV1MarginLeveragebracketEndpointSchema,
    }),
    config
  );
}

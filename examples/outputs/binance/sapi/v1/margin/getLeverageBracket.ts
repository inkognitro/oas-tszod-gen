import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '../../../core';
import {Error} from '../../../';

export const getLeverageBracketEndpointSchema = {
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

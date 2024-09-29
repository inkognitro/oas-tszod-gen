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

export const postSapiV1MarginManualLiquidationEndpointSchema = {
  path: '/sapi/v1/margin/manual-liquidation',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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
    '401': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type PostSapiV1MarginManualLiquidationPayload = {
  queryParams: {
    type: 'MARGIN' | 'ISOLATED';
    symbol?: string;
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1MarginManualLiquidationResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          interest: string;
          principal: string;
          liabilityAsset: string;
          liabilityQty: number;
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1MarginManualLiquidationRequestResult = RequestResult<
  Request,
  PostSapiV1MarginManualLiquidationResponse
>;

export function postSapiV1MarginManualLiquidation(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1MarginManualLiquidationPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MarginManualLiquidationRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1MarginManualLiquidationEndpointSchema,
    }),
    config
  );
}

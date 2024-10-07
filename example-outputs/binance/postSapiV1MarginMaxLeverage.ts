import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postSapiV1MarginMaxLeverageEndpointSchema = {
  path: '/sapi/v1/margin/max-leverage',
  method: 'post',
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
    '401': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type PostSapiV1MarginMaxLeverageRequest = RequestUnion<
  any,
  any,
  {
    maxLeverage: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1MarginMaxLeverageResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1MarginMaxLeverageRequestResult = RequestResult<
  PostSapiV1MarginMaxLeverageRequest,
  PostSapiV1MarginMaxLeverageResponse
>;

export function postSapiV1MarginMaxLeverage(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1MarginMaxLeverageRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MarginMaxLeverageRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1MarginMaxLeverageEndpointSchema, payload),
    config
  );
}

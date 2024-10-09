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

export const postPositionChangedEndpointSchema = {
  path: '/sapi/v1/lending/positionChanged',
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

export type PostPositionChangedRequest = RequestUnion<
  any,
  any,
  {
    projectId: string;
    lot: string;
    positionId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostPositionChangedResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          dailyPurchaseId: number; // int
          success: boolean;
          time: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostPositionChangedRequestResult = RequestResult<
  PostPositionChangedRequest,
  PostPositionChangedResponse
>;

export function postPositionChanged(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostPositionChangedRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostPositionChangedRequestResult> {
  return requestHandler.execute(
    createRequest(postPositionChangedEndpointSchema, payload),
    config
  );
}

import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1LendingPositionchangedEndpointSchema = {
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

export type PostSapiV1LendingPositionchangedPayload = {
  queryParams: {
    projectId: string;
    lot: string;
    positionId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1LendingPositionchangedResponse =
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

export type PostSapiV1LendingPositionchangedRequestResult = RequestResult<
  Request,
  PostSapiV1LendingPositionchangedResponse
>;

export function postSapiV1LendingPositionchanged(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LendingPositionchangedPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LendingPositionchangedRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LendingPositionchangedEndpointSchema,
    }),
    config
  );
}

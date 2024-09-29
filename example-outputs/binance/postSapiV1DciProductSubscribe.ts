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

export const postSapiV1DciProductSubscribeEndpointSchema = {
  path: '/sapi/v1/dci/product/subscribe',
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

export type PostSapiV1DciProductSubscribePayload = {
  queryParams: {
    id: string;
    orderId: string;
    depositAmount: number;
    autoCompoundPlan: 'NONE' | 'STANDARD' | 'ADVANCE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1DciProductSubscribeResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          positionId: number; // int
          investCoin: string;
          exercisedCoin: string;
          subscriptionAmount: string;
          duration: number; // int
          autoCompoundPlan: string;
          strikePrice: string;
          settleDate: number; // int
          purchaseStatus: string;
          apr: string;
          orderId: number; // int
          purchaseTime: number; // int
          'optionType"'?: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1DciProductSubscribeRequestResult = RequestResult<
  Request,
  PostSapiV1DciProductSubscribeResponse
>;

export function postSapiV1DciProductSubscribe(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1DciProductSubscribePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1DciProductSubscribeRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1DciProductSubscribeEndpointSchema,
    }),
    config
  );
}

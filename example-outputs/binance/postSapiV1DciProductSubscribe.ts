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

export const postSapiV1DciProductSubscribeEndpointSchema = {
  path: '/sapi/v1/dci/product/subscribe',
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

export type PostSapiV1DciProductSubscribeRequest = RequestUnion<
  any,
  any,
  {
    id: string;
    orderId: string;
    depositAmount: number;
    autoCompoundPlan: 'NONE' | 'STANDARD' | 'ADVANCE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1DciProductSubscribeResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1DciProductSubscribeRequestResult = RequestResult<
  PostSapiV1DciProductSubscribeRequest,
  PostSapiV1DciProductSubscribeResponse
>;

export function postSapiV1DciProductSubscribe(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1DciProductSubscribeRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1DciProductSubscribeRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1DciProductSubscribeEndpointSchema, payload),
    config
  );
}

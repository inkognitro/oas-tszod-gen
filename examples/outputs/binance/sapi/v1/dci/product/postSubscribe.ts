import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../core';
import {Error} from '../../../../';

export const postSubscribeEndpointSchema = {
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

export type PostSubscribeRequest = RequestUnion<
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

export type PostSubscribeResponse =
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

export type PostSubscribeRequestResult = RequestResult<
  PostSubscribeRequest,
  PostSubscribeResponse
>;

export function postSubscribe(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSubscribeRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSubscribeRequestResult> {
  return requestHandler.execute(
    createRequest(postSubscribeEndpointSchema, payload),
    config
  );
}

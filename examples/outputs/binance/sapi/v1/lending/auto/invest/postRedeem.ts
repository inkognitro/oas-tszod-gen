import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../../core';
import {Error} from '../../../../../';

export const postRedeemEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/redeem',
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

export type PostRedeemRequest = RequestUnion<
  any,
  any,
  {
    indexId: number; // int
    requestId?: string;
    redemptionPercentage: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostRedeemResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          redemptionId: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostRedeemRequestResult = RequestResult<
  PostRedeemRequest,
  PostRedeemResponse
>;

export function postRedeem(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostRedeemRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostRedeemRequestResult> {
  return requestHandler.execute(
    createRequest(postRedeemEndpointSchema, payload),
    config
  );
}

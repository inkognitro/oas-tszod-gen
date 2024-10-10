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

export const postRepayEndpointSchema = {
  path: '/sapi/v1/margin/borrow-repay',
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
  },
};

export type PostRepayRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
    isIsolated: string;
    symbol: string;
    amount: number;
    type: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostRepayResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type PostRepayRequestResult = RequestResult<
  PostRepayRequest,
  PostRepayResponse
>;

export function postRepay(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostRepayRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostRepayRequestResult> {
  return requestHandler.execute(
    createRequest(postRepayEndpointSchema, payload),
    config
  );
}

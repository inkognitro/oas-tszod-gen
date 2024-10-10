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

export const postLtvEndpointSchema = {
  path: '/sapi/v2/loan/flexible/adjust/ltv',
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

export type PostLtvRequest = RequestUnion<
  any,
  any,
  {
    loanCoin?: string;
    collateralCoin?: string;
    adjustmentAmount: number;
    direction: 'ADDITIONAL' | 'REDUCED';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostLtvResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          loanCoin: string;
          collateralCoin: string;
          direction: string;
          adjustmentAmount: string;
          currentLTV: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostLtvRequestResult = RequestResult<
  PostLtvRequest,
  PostLtvResponse
>;

export function postLtv(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostLtvRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostLtvRequestResult> {
  return requestHandler.execute(
    createRequest(postLtvEndpointSchema, payload),
    config
  );
}

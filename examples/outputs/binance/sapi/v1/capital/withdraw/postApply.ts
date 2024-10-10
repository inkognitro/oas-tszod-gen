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

export const postApplyEndpointSchema = {
  path: '/sapi/v1/capital/withdraw/apply',
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

export type PostApplyRequest = RequestUnion<
  any,
  any,
  {
    coin: string;
    withdrawOrderId?: string;
    network?: string;
    address: string;
    addressTag?: string;
    amount: number;
    transactionFeeFlag?: boolean;
    name?: string;
    walletType?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostApplyResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          id: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostApplyRequestResult = RequestResult<
  PostApplyRequest,
  PostApplyResponse
>;

export function postApply(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostApplyRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostApplyRequestResult> {
  return requestHandler.execute(
    createRequest(postApplyEndpointSchema, payload),
    config
  );
}

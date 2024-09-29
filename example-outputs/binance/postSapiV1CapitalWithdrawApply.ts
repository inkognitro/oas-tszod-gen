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

export const postSapiV1CapitalWithdrawApplyEndpointSchema = {
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

export type PostSapiV1CapitalWithdrawApplyPayload = {
  queryParams: {
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
  };
};

export type PostSapiV1CapitalWithdrawApplyResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          id: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1CapitalWithdrawApplyRequestResult = RequestResult<
  Request,
  PostSapiV1CapitalWithdrawApplyResponse
>;

export function postSapiV1CapitalWithdrawApply(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1CapitalWithdrawApplyPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1CapitalWithdrawApplyRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1CapitalWithdrawApplyEndpointSchema,
    }),
    config
  );
}

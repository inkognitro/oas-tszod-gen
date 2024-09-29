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

export const postSapiV1CapitalDepositCreditApplyEndpointSchema = {
  path: '/sapi/v1/capital/deposit/credit-apply',
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

export type PostSapiV1CapitalDepositCreditApplyPayload = {
  queryParams: {
    depositId?: number; // int
    txId?: string;
    subAccountId?: number; // int
    subUserId?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1CapitalDepositCreditApplyResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: boolean;
          success: boolean;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1CapitalDepositCreditApplyRequestResult = RequestResult<
  Request,
  PostSapiV1CapitalDepositCreditApplyResponse
>;

export function postSapiV1CapitalDepositCreditApply(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1CapitalDepositCreditApplyPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1CapitalDepositCreditApplyRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1CapitalDepositCreditApplyEndpointSchema,
    }),
    config
  );
}

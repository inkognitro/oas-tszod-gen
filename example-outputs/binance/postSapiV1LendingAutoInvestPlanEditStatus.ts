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

export const postSapiV1LendingAutoInvestPlanEditStatusEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/plan/edit-status',
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

export type PostSapiV1LendingAutoInvestPlanEditStatusPayload = {
  queryParams: {
    planId: number; // int
    status: 'ONGOING' | 'PAUSED' | 'REMOVED';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1LendingAutoInvestPlanEditStatusResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          planId: number; // int
          nextExecutionDateTime: number; // int
          status: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LendingAutoInvestPlanEditStatusRequestResult =
  RequestResult<Request, PostSapiV1LendingAutoInvestPlanEditStatusResponse>;

export function postSapiV1LendingAutoInvestPlanEditStatus(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LendingAutoInvestPlanEditStatusPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LendingAutoInvestPlanEditStatusRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LendingAutoInvestPlanEditStatusEndpointSchema,
    }),
    config
  );
}

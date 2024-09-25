import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1LendingAutoInvestPlanAddEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/plan/add',
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

export type PostSapiV1LendingAutoInvestPlanAddPayload = {
  queryParams: {
    sourceType: 'MAIN_SITE' | 'TR';
    requestId?: string;
    planType: 'SINGLE' | 'PORTFOLIO' | 'INDEX';
    IndexId?: number; // int
    subscriptionAmount: number;
    subscriptionCycle:
      | 'H1'
      | 'H4'
      | 'H8'
      | 'H12'
      | 'WEEKLY'
      | 'DAILY'
      | 'MONTHLY'
      | 'BI_WEEKLY';
    subscriptionStartDay?: number; // int
    subscriptionStartWeekday?:
      | 'MON'
      | 'TUE'
      | 'WED'
      | 'THU'
      | 'FRI'
      | 'SAT'
      | 'SUN';
    subscriptionStartTime: number; // int
    sourceAsset: string;
    flexibleAllowedToUse?: boolean;
    details: {
      targetAsset?: string;
      percentage?: number; // int
    }[];
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1LendingAutoInvestPlanAddResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            planId: number; // int
            nextExecutionDateTime: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1LendingAutoInvestPlanAddRequestResult = RequestResult<
  Request,
  PostSapiV1LendingAutoInvestPlanAddResponse
>;

export function postSapiV1LendingAutoInvestPlanAdd(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LendingAutoInvestPlanAddPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LendingAutoInvestPlanAddRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LendingAutoInvestPlanAddEndpointSchema,
    }),
    config
  );
}

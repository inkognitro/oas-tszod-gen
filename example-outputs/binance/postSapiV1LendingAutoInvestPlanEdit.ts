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

export const postSapiV1LendingAutoInvestPlanEditEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/plan/edit',
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

export type PostSapiV1LendingAutoInvestPlanEditRequest = RequestUnion<
  any,
  any,
  {
    planId: number; // int
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
    details?: {
      targetAsset?: string;
      percentage?: number; // int
    }[];
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1LendingAutoInvestPlanEditResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          planId: number; // int
          nextExecutionDateTime: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LendingAutoInvestPlanEditRequestResult = RequestResult<
  PostSapiV1LendingAutoInvestPlanEditRequest,
  PostSapiV1LendingAutoInvestPlanEditResponse
>;

export function postSapiV1LendingAutoInvestPlanEdit(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1LendingAutoInvestPlanEditRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LendingAutoInvestPlanEditRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1LendingAutoInvestPlanEditEndpointSchema, payload),
    config
  );
}

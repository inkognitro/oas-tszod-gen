import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1LendingAutoInvestPlanEditEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/plan/edit',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    planId: z.number().int().safe().finite(),
    subscriptionAmount: z.number().safe().finite(),
    subscriptionCycle: z.enum([
      'H1',
      'H4',
      'H8',
      'H12',
      'WEEKLY',
      'DAILY',
      'MONTHLY',
      'BI_WEEKLY',
    ]),
    subscriptionStartDay: z.number().int().safe().finite().optional(),
    subscriptionStartWeekday: z
      .enum(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'])
      .optional(),
    subscriptionStartTime: z.number().int().safe().finite(),
    sourceAsset: z.string(),
    flexibleAllowedToUse: z.boolean().optional(),
    details: z
      .array(
        z.object({
          targetAsset: z.string().optional(),
          percentage: z.number().int().safe().finite().optional(),
        })
      )
      .optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            planId: z.number().int().safe().finite(),
            nextExecutionDateTime: z.number().int().safe().finite(),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type PostSapiV1LendingAutoInvestPlanEditPayload = {
  queryParams: {
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
  };
};

export type PostSapiV1LendingAutoInvestPlanEditResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          planId: number; // int
          nextExecutionDateTime: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LendingAutoInvestPlanEditRequestResult = RequestResult<
  Request,
  PostSapiV1LendingAutoInvestPlanEditResponse
>;

export function postSapiV1LendingAutoInvestPlanEdit(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LendingAutoInvestPlanEditPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LendingAutoInvestPlanEditRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LendingAutoInvestPlanEditEndpointSchema,
    }),
    config
  );
}

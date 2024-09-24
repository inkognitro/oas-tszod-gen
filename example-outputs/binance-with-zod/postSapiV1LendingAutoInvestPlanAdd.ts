import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1LendingAutoInvestPlanAddEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/plan/add',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    sourceType: z.union([z.literal('MAIN_SITE'), z.literal('TR')]),
    requestId: z.string().optional(),
    planType: z.union([
      z.literal('SINGLE'),
      z.literal('PORTFOLIO'),
      z.literal('INDEX'),
    ]),
    IndexId: z.number().int().safe().finite().optional(),
    subscriptionAmount: z.number().safe().finite(),
    subscriptionCycle: z.union([
      z.literal('H1'),
      z.literal('H4'),
      z.literal('H8'),
      z.literal('H12'),
      z.literal('WEEKLY'),
      z.literal('DAILY'),
      z.literal('MONTHLY'),
      z.literal('BI_WEEKLY'),
    ]),
    subscriptionStartDay: z.number().int().safe().finite().optional(),
    subscriptionStartWeekday: z
      .union([
        z.literal('MON'),
        z.literal('TUE'),
        z.literal('WED'),
        z.literal('THU'),
        z.literal('FRI'),
        z.literal('SAT'),
        z.literal('SUN'),
      ])
      .optional(),
    subscriptionStartTime: z.number().int().safe().finite(),
    sourceAsset: z.string(),
    flexibleAllowedToUse: z.boolean().optional(),
    details: z.array(
      z.object({
        targetAsset: z.string().optional(),
        percentage: z.number().int().safe().finite().optional(),
      })
    ),
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
  requestHandler: RequestHandler,
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

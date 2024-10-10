import {z_Error, Error} from '../../../../../../';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../../../core';

export const postEditEndpointSchema = {
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
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type PostEditRequest = RequestUnion<
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

export type PostEditResponse =
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

export type PostEditRequestResult = RequestResult<
  PostEditRequest,
  PostEditResponse
>;

export function postEdit(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostEditRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostEditRequestResult> {
  return requestHandler.execute(
    createRequest(postEditEndpointSchema, payload),
    config
  );
}

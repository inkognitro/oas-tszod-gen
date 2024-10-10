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

export const postAddEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/plan/add',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    sourceType: z.enum(['MAIN_SITE', 'TR']),
    requestId: z.string().optional(),
    planType: z.enum(['SINGLE', 'PORTFOLIO', 'INDEX']),
    IndexId: z.number().int().safe().finite().optional(),
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

export type PostAddRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type PostAddResponse =
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

export type PostAddRequestResult = RequestResult<
  PostAddRequest,
  PostAddResponse
>;

export function postAdd(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostAddRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostAddRequestResult> {
  return requestHandler.execute(
    createRequest(postAddEndpointSchema, payload),
    config
  );
}

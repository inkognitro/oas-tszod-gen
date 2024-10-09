import {z_Plan, z_Error, Plan, Error} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/stripe-with-zod/core';

export const postPlansPlanEndpointSchema = {
  path: '/v1/plans/{plan}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    plan: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        active: z.boolean().optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        nickname: z.string().optional(),
        product: z.string().optional(),
        trial_period_days: z.number().int().safe().finite().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Plan,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type PostPlansPlanRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      nickname?: string;
      product?: string;
      trial_period_days?: number; // int
    }
  >,
  {
    plan: string;
  }
>;

export type PostPlansPlanResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Plan>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPlansPlanRequestResult = RequestResult<
  PostPlansPlanRequest,
  PostPlansPlanResponse
>;

export function postPlansPlan(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPlansPlanRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPlansPlanRequestResult> {
  return requestHandler.execute(
    createRequest(postPlansPlanEndpointSchema, payload),
    config
  );
}

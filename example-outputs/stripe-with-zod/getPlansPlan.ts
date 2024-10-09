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

export const getPlansPlanEndpointSchema = {
  path: '/v1/plans/{plan}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    plan: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
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

export type GetPlansPlanRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    plan: string;
  },
  {
    expand?: string[];
  }
>;

export type GetPlansPlanResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Plan>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPlansPlanRequestResult = RequestResult<
  GetPlansPlanRequest,
  GetPlansPlanResponse
>;

export function getPlansPlan(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPlansPlanRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPlansPlanRequestResult> {
  return requestHandler.execute(
    createRequest(getPlansPlanEndpointSchema, payload),
    config
  );
}

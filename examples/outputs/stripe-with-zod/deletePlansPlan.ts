import {z_Deleted_plan, z_Error, Deleted_plan, Error} from './schemas';
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
} from './core';

export const deletePlansPlanEndpointSchema = {
  path: '/v1/plans/{plan}',
  method: 'delete',
  supportedSecuritySchemas: [],
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
          zodSchema: z_Deleted_plan,
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

export type DeletePlansPlanRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    plan: string;
  }
>;

export type DeletePlansPlanResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Deleted_plan>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeletePlansPlanRequestResult = RequestResult<
  DeletePlansPlanRequest,
  DeletePlansPlanResponse
>;

export function deletePlansPlan(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeletePlansPlanRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeletePlansPlanRequestResult> {
  return requestHandler.execute(
    createRequest(deletePlansPlanEndpointSchema, payload),
    config
  );
}

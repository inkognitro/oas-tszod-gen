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
} from '@example-outputs/stripe/core';
import {Deleted_plan, Error} from '@example-outputs/stripe';

export const deletePlansPlanEndpointSchema = {
  path: '/v1/plans/{plan}',
  method: 'delete',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
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

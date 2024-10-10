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
import {Plan, Error} from './schemas';

export const getPlansPlanEndpointSchema = {
  path: '/v1/plans/{plan}',
  method: 'get',
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

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

export const postPlansPlanEndpointSchema = {
  path: '/v1/plans/{plan}',
  method: 'post',
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

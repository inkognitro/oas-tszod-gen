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
import {Billing_Meter} from './billing';
import {Error} from './schemas';

export const postBillingMetersIdReactivateEndpointSchema = {
  path: '/v1/billing/meters/{id}/reactivate',
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

export type PostBillingMetersIdReactivateRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    id: string;
  }
>;

export type PostBillingMetersIdReactivateResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Billing_Meter>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingMetersIdReactivateRequestResult = RequestResult<
  PostBillingMetersIdReactivateRequest,
  PostBillingMetersIdReactivateResponse
>;

export function postBillingMetersIdReactivate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingMetersIdReactivateRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingMetersIdReactivateRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingMetersIdReactivateEndpointSchema, payload),
    config
  );
}

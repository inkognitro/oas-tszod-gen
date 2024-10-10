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

export const postBillingMetersIdDeactivateEndpointSchema = {
  path: '/v1/billing/meters/{id}/deactivate',
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

export type PostBillingMetersIdDeactivateRequest = RequestUnion<
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

export type PostBillingMetersIdDeactivateResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Billing_Meter>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingMetersIdDeactivateRequestResult = RequestResult<
  PostBillingMetersIdDeactivateRequest,
  PostBillingMetersIdDeactivateResponse
>;

export function postBillingMetersIdDeactivate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingMetersIdDeactivateRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingMetersIdDeactivateRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingMetersIdDeactivateEndpointSchema, payload),
    config
  );
}

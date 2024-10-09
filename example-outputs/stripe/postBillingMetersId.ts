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
import {Billing_Meter, Error} from '@example-outputs/stripe';

export const postBillingMetersIdEndpointSchema = {
  path: '/v1/billing/meters/{id}',
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

export type PostBillingMetersIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      display_name?: string;
      expand?: string[];
    }
  >,
  {
    id: string;
  }
>;

export type PostBillingMetersIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Billing_Meter>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingMetersIdRequestResult = RequestResult<
  PostBillingMetersIdRequest,
  PostBillingMetersIdResponse
>;

export function postBillingMetersId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingMetersIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingMetersIdRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingMetersIdEndpointSchema, payload),
    config
  );
}

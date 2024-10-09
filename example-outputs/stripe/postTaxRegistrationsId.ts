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
import {Tax_Registration, Error} from '@example-outputs/stripe';

export const postTaxRegistrationsIdEndpointSchema = {
  path: '/v1/tax/registrations/{id}',
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

export type PostTaxRegistrationsIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active_from?: 'now' | number;
      expand?: string[];
      expires_at?: 'now' | number | '';
    }
  >,
  {
    id: string;
  }
>;

export type PostTaxRegistrationsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_Registration>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTaxRegistrationsIdRequestResult = RequestResult<
  PostTaxRegistrationsIdRequest,
  PostTaxRegistrationsIdResponse
>;

export function postTaxRegistrationsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTaxRegistrationsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTaxRegistrationsIdRequestResult> {
  return requestHandler.execute(
    createRequest(postTaxRegistrationsIdEndpointSchema, payload),
    config
  );
}

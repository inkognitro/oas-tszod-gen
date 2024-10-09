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

export const getTaxRegistrationsIdEndpointSchema = {
  path: '/v1/tax/registrations/{id}',
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

export type GetTaxRegistrationsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTaxRegistrationsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_Registration>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxRegistrationsIdRequestResult = RequestResult<
  GetTaxRegistrationsIdRequest,
  GetTaxRegistrationsIdResponse
>;

export function getTaxRegistrationsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxRegistrationsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxRegistrationsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTaxRegistrationsIdEndpointSchema, payload),
    config
  );
}

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

export const getTaxRegistrationsEndpointSchema = {
  path: '/v1/tax/registrations',
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

export type GetTaxRegistrationsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
    status?: 'active' | 'all' | 'expired' | 'scheduled';
  }
>;

export type GetTaxRegistrationsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Tax_Registration[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxRegistrationsRequestResult = RequestResult<
  GetTaxRegistrationsRequest,
  GetTaxRegistrationsResponse
>;

export function getTaxRegistrations(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxRegistrationsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxRegistrationsRequestResult> {
  return requestHandler.execute(
    createRequest(getTaxRegistrationsEndpointSchema, payload),
    config
  );
}

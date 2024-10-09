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
import {Tax_Settings, Error} from '@example-outputs/stripe';

export const getTaxSettingsEndpointSchema = {
  path: '/v1/tax/settings',
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

export type GetTaxSettingsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    expand?: string[];
  }
>;

export type GetTaxSettingsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_Settings>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxSettingsRequestResult = RequestResult<
  GetTaxSettingsRequest,
  GetTaxSettingsResponse
>;

export function getTaxSettings(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxSettingsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxSettingsRequestResult> {
  return requestHandler.execute(
    createRequest(getTaxSettingsEndpointSchema, payload),
    config
  );
}

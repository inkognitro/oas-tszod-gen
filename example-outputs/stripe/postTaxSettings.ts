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

export const postTaxSettingsEndpointSchema = {
  path: '/v1/tax/settings',
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

export type PostTaxSettingsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      defaults?: {
        tax_behavior?: 'exclusive' | 'inclusive' | 'inferred_by_currency';
        tax_code?: string;
      };
      expand?: string[];
      head_office?: {
        address: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
        };
      };
    }
  >
>;

export type PostTaxSettingsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_Settings>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTaxSettingsRequestResult = RequestResult<
  PostTaxSettingsRequest,
  PostTaxSettingsResponse
>;

export function postTaxSettings(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTaxSettingsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTaxSettingsRequestResult> {
  return requestHandler.execute(
    createRequest(postTaxSettingsEndpointSchema, payload),
    config
  );
}

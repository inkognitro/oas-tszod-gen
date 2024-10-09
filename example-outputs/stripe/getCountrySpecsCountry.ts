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
import {Country_spec, Error} from '@example-outputs/stripe';

export const getCountrySpecsCountryEndpointSchema = {
  path: '/v1/country_specs/{country}',
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

export type GetCountrySpecsCountryRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    country: string;
  },
  {
    expand?: string[];
  }
>;

export type GetCountrySpecsCountryResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Country_spec>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCountrySpecsCountryRequestResult = RequestResult<
  GetCountrySpecsCountryRequest,
  GetCountrySpecsCountryResponse
>;

export function getCountrySpecsCountry(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCountrySpecsCountryRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCountrySpecsCountryRequestResult> {
  return requestHandler.execute(
    createRequest(getCountrySpecsCountryEndpointSchema, payload),
    config
  );
}

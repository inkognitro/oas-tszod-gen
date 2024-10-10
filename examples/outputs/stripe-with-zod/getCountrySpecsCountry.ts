import {z_Country_spec, z_Error, Country_spec, Error} from './schemas';
import {z} from 'zod';
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

export const getCountrySpecsCountryEndpointSchema = {
  path: '/v1/country_specs/{country}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    country: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Country_spec,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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

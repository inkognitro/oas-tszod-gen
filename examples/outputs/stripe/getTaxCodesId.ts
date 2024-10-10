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
import {Tax_code, Error} from './schemas';

export const getTaxCodesIdEndpointSchema = {
  path: '/v1/tax_codes/{id}',
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

export type GetTaxCodesIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTaxCodesIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_code>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxCodesIdRequestResult = RequestResult<
  GetTaxCodesIdRequest,
  GetTaxCodesIdResponse
>;

export function getTaxCodesId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxCodesIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxCodesIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTaxCodesIdEndpointSchema, payload),
    config
  );
}

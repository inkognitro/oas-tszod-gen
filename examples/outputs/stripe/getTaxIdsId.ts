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
import {Tax_id, Error} from './schemas';

export const getTaxIdsIdEndpointSchema = {
  path: '/v1/tax_ids/{id}',
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

export type GetTaxIdsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTaxIdsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_id>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxIdsIdRequestResult = RequestResult<
  GetTaxIdsIdRequest,
  GetTaxIdsIdResponse
>;

export function getTaxIdsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxIdsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxIdsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTaxIdsIdEndpointSchema, payload),
    config
  );
}

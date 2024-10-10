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
import {Climate_Supplier} from './climate';
import {Error} from './schemas';

export const getClimateSuppliersEndpointSchema = {
  path: '/v1/climate/suppliers',
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

export type GetClimateSuppliersRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetClimateSuppliersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Climate_Supplier[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetClimateSuppliersRequestResult = RequestResult<
  GetClimateSuppliersRequest,
  GetClimateSuppliersResponse
>;

export function getClimateSuppliers(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetClimateSuppliersRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetClimateSuppliersRequestResult> {
  return requestHandler.execute(
    createRequest(getClimateSuppliersEndpointSchema, payload),
    config
  );
}

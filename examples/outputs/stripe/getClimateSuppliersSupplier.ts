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

export const getClimateSuppliersSupplierEndpointSchema = {
  path: '/v1/climate/suppliers/{supplier}',
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

export type GetClimateSuppliersSupplierRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    supplier: string;
  },
  {
    expand?: string[];
  }
>;

export type GetClimateSuppliersSupplierResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Climate_Supplier>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetClimateSuppliersSupplierRequestResult = RequestResult<
  GetClimateSuppliersSupplierRequest,
  GetClimateSuppliersSupplierResponse
>;

export function getClimateSuppliersSupplier(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetClimateSuppliersSupplierRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetClimateSuppliersSupplierRequestResult> {
  return requestHandler.execute(
    createRequest(getClimateSuppliersSupplierEndpointSchema, payload),
    config
  );
}

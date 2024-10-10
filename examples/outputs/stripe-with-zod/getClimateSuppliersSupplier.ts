import {z_Climate_Supplier, Climate_Supplier} from './climate';
import {z_Error, Error} from './schemas';
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

export const getClimateSuppliersSupplierEndpointSchema = {
  path: '/v1/climate/suppliers/{supplier}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    supplier: z.string(),
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
          zodSchema: z_Climate_Supplier,
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

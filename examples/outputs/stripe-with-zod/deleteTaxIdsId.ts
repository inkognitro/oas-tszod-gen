import {z_Deleted_tax_id, z_Error, Deleted_tax_id, Error} from './schemas';
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

export const deleteTaxIdsIdEndpointSchema = {
  path: '/v1/tax_ids/{id}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
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
          zodSchema: z_Deleted_tax_id,
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

export type DeleteTaxIdsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  }
>;

export type DeleteTaxIdsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Deleted_tax_id>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteTaxIdsIdRequestResult = RequestResult<
  DeleteTaxIdsIdRequest,
  DeleteTaxIdsIdResponse
>;

export function deleteTaxIdsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteTaxIdsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteTaxIdsIdRequestResult> {
  return requestHandler.execute(
    createRequest(deleteTaxIdsIdEndpointSchema, payload),
    config
  );
}

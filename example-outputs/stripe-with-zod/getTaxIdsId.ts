import {
  z_Tax_id,
  z_Error,
  Tax_id,
  Error,
} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const getTaxIdsIdEndpointSchema = {
  path: '/v1/tax_ids/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
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
          zodSchema: z_Tax_id,
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

import {
  z_Tax_Registration,
  z_Error,
  Tax_Registration,
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

export const getTaxRegistrationsIdEndpointSchema = {
  path: '/v1/tax/registrations/{id}',
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
          zodSchema: z_Tax_Registration,
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

export type GetTaxRegistrationsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTaxRegistrationsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_Registration>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxRegistrationsIdRequestResult = RequestResult<
  GetTaxRegistrationsIdRequest,
  GetTaxRegistrationsIdResponse
>;

export function getTaxRegistrationsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxRegistrationsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxRegistrationsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTaxRegistrationsIdEndpointSchema, payload),
    config
  );
}

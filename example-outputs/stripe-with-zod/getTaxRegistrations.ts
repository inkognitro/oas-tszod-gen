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

export const getTaxRegistrationsEndpointSchema = {
  path: '/v1/tax/registrations',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
    status: z.enum(['active', 'all', 'expired', 'scheduled']).optional(),
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
          zodSchema: z.object({
            data: z.array(z_Tax_Registration),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/tax\/registrations/),
          }),
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

export type GetTaxRegistrationsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
    status?: 'active' | 'all' | 'expired' | 'scheduled';
  }
>;

export type GetTaxRegistrationsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Tax_Registration[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxRegistrationsRequestResult = RequestResult<
  GetTaxRegistrationsRequest,
  GetTaxRegistrationsResponse
>;

export function getTaxRegistrations(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxRegistrationsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxRegistrationsRequestResult> {
  return requestHandler.execute(
    createRequest(getTaxRegistrationsEndpointSchema, payload),
    config
  );
}

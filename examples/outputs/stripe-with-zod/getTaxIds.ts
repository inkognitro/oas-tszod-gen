import {z_Tax_id, z_Error, Tax_id, Error} from './schemas';
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

export const getTaxIdsEndpointSchema = {
  path: '/v1/tax_ids',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    owner: z
      .object({
        account: z.string().optional(),
        customer: z.string().optional(),
        type: z.enum(['account', 'application', 'customer', 'self']),
      })
      .optional(),
    starting_after: z.string().optional(),
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
            data: z.array(z_Tax_id),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string(),
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

export type GetTaxIdsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    owner?: {
      account?: string;
      customer?: string;
      type: 'account' | 'application' | 'customer' | 'self';
    };
    starting_after?: string;
  }
>;

export type GetTaxIdsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Tax_id[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxIdsRequestResult = RequestResult<
  GetTaxIdsRequest,
  GetTaxIdsResponse
>;

export function getTaxIds(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxIdsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxIdsRequestResult> {
  return requestHandler.execute(
    createRequest(getTaxIdsEndpointSchema, payload),
    config
  );
}

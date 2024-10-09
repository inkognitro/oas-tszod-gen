import {
  z_Tax_Calculation_line_item,
  z_Error,
  Tax_Calculation_line_item,
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

export const getTaxCalculationsCalculationLineItemsEndpointSchema = {
  path: '/v1/tax/calculations/{calculation}/line_items',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
  }),
  pathParamsZodSchema: z.object({
    calculation: z.string(),
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
            data: z.array(z_Tax_Calculation_line_item),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z
              .string()
              .regex(/\^\/v1\/tax\/calculations\/\[\^\/\]\+\/line_items/),
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

export type GetTaxCalculationsCalculationLineItemsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    calculation: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetTaxCalculationsCalculationLineItemsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Tax_Calculation_line_item[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxCalculationsCalculationLineItemsRequestResult = RequestResult<
  GetTaxCalculationsCalculationLineItemsRequest,
  GetTaxCalculationsCalculationLineItemsResponse
>;

export function getTaxCalculationsCalculationLineItems(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxCalculationsCalculationLineItemsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxCalculationsCalculationLineItemsRequestResult> {
  return requestHandler.execute(
    createRequest(
      getTaxCalculationsCalculationLineItemsEndpointSchema,
      payload
    ),
    config
  );
}

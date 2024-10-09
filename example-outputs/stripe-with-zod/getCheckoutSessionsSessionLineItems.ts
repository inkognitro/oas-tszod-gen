import {z_Item, z_Error, Item, Error} from '@example-outputs/stripe-with-zod';
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

export const getCheckoutSessionsSessionLineItemsEndpointSchema = {
  path: '/v1/checkout/sessions/{session}/line_items',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
  }),
  pathParamsZodSchema: z.object({
    session: z.string(),
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
            data: z.array(z_Item),
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

export type GetCheckoutSessionsSessionLineItemsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    session: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetCheckoutSessionsSessionLineItemsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Item[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCheckoutSessionsSessionLineItemsRequestResult = RequestResult<
  GetCheckoutSessionsSessionLineItemsRequest,
  GetCheckoutSessionsSessionLineItemsResponse
>;

export function getCheckoutSessionsSessionLineItems(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCheckoutSessionsSessionLineItemsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCheckoutSessionsSessionLineItemsRequestResult> {
  return requestHandler.execute(
    createRequest(getCheckoutSessionsSessionLineItemsEndpointSchema, payload),
    config
  );
}

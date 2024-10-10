import {z_Item, z_Error, Item, Error} from './schemas';
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

export const getQuotesQuoteComputedUpfrontLineItemsEndpointSchema = {
  path: '/v1/quotes/{quote}/computed_upfront_line_items',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
  }),
  pathParamsZodSchema: z.object({
    quote: z.string(),
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

export type GetQuotesQuoteComputedUpfrontLineItemsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    quote: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetQuotesQuoteComputedUpfrontLineItemsResponse =
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

export type GetQuotesQuoteComputedUpfrontLineItemsRequestResult = RequestResult<
  GetQuotesQuoteComputedUpfrontLineItemsRequest,
  GetQuotesQuoteComputedUpfrontLineItemsResponse
>;

export function getQuotesQuoteComputedUpfrontLineItems(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetQuotesQuoteComputedUpfrontLineItemsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetQuotesQuoteComputedUpfrontLineItemsRequestResult> {
  return requestHandler.execute(
    createRequest(
      getQuotesQuoteComputedUpfrontLineItemsEndpointSchema,
      payload
    ),
    config
  );
}

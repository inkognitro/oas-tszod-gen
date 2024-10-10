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
import {Tax_Calculation_line_item} from './tax';
import {Error} from './schemas';

export const getTaxCalculationsCalculationLineItemsEndpointSchema = {
  path: '/v1/tax/calculations/{calculation}/line_items',
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

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
import {Tax_Transaction} from './tax';
import {Error} from './schemas';

export const postTaxTransactionsCreateFromCalculationEndpointSchema = {
  path: '/v1/tax/transactions/create_from_calculation',
  method: 'post',
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

export type PostTaxTransactionsCreateFromCalculationRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      calculation: string;
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      posted_at?: number; // int
      reference: string;
    }
  >
>;

export type PostTaxTransactionsCreateFromCalculationResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_Transaction>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTaxTransactionsCreateFromCalculationRequestResult =
  RequestResult<
    PostTaxTransactionsCreateFromCalculationRequest,
    PostTaxTransactionsCreateFromCalculationResponse
  >;

export function postTaxTransactionsCreateFromCalculation(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTaxTransactionsCreateFromCalculationRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTaxTransactionsCreateFromCalculationRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTaxTransactionsCreateFromCalculationEndpointSchema,
      payload
    ),
    config
  );
}

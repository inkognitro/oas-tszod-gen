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
import {Tax_id, Error} from './schemas';

export const getTaxIdsEndpointSchema = {
  path: '/v1/tax_ids',
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

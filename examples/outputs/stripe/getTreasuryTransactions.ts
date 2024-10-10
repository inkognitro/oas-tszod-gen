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
import {Treasury_Transaction} from './treasury';
import {Error} from './schemas';

export const getTreasuryTransactionsEndpointSchema = {
  path: '/v1/treasury/transactions',
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

export type GetTreasuryTransactionsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    created?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    ending_before?: string;
    expand?: string[];
    financial_account: string;
    limit?: number; // int
    order_by?: 'created' | 'posted_at';
    starting_after?: string;
    status?: 'open' | 'posted' | 'void';
    status_transitions?: {
      posted_at?: (
        | {
            gt?: number; // int
            gte?: number; // int
            lt?: number; // int
            lte?: number; // int
          }
        | number
      ) &
        Partial<{
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }>;
    };
  }
>;

export type GetTreasuryTransactionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Treasury_Transaction[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryTransactionsRequestResult = RequestResult<
  GetTreasuryTransactionsRequest,
  GetTreasuryTransactionsResponse
>;

export function getTreasuryTransactions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryTransactionsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryTransactionsRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryTransactionsEndpointSchema, payload),
    config
  );
}

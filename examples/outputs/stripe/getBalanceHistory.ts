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
import {Balance_transaction, Error} from './schemas';

export const getBalanceHistoryEndpointSchema = {
  path: '/v1/balance/history',
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

export type GetBalanceHistoryRequest = RequestUnion<
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
    currency?: string;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    payout?: string;
    source?: string;
    starting_after?: string;
    type?: string;
  }
>;

export type GetBalanceHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Balance_transaction[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetBalanceHistoryRequestResult = RequestResult<
  GetBalanceHistoryRequest,
  GetBalanceHistoryResponse
>;

export function getBalanceHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBalanceHistoryRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBalanceHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getBalanceHistoryEndpointSchema, payload),
    config
  );
}

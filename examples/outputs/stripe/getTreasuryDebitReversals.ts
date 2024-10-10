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
import {Treasury_Debit_reversal} from './treasury';
import {Error} from './schemas';

export const getTreasuryDebitReversalsEndpointSchema = {
  path: '/v1/treasury/debit_reversals',
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

export type GetTreasuryDebitReversalsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    financial_account: string;
    limit?: number; // int
    received_debit?: string;
    resolution?: 'lost' | 'won';
    starting_after?: string;
    status?: 'canceled' | 'completed' | 'processing';
  }
>;

export type GetTreasuryDebitReversalsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Treasury_Debit_reversal[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryDebitReversalsRequestResult = RequestResult<
  GetTreasuryDebitReversalsRequest,
  GetTreasuryDebitReversalsResponse
>;

export function getTreasuryDebitReversals(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryDebitReversalsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryDebitReversalsRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryDebitReversalsEndpointSchema, payload),
    config
  );
}

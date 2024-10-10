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
import {Treasury_Received_debit} from './treasury';
import {Error} from './schemas';

export const getTreasuryReceivedDebitsEndpointSchema = {
  path: '/v1/treasury/received_debits',
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

export type GetTreasuryReceivedDebitsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    financial_account: string;
    limit?: number; // int
    starting_after?: string;
    status?: 'failed' | 'succeeded';
  }
>;

export type GetTreasuryReceivedDebitsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Treasury_Received_debit[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryReceivedDebitsRequestResult = RequestResult<
  GetTreasuryReceivedDebitsRequest,
  GetTreasuryReceivedDebitsResponse
>;

export function getTreasuryReceivedDebits(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryReceivedDebitsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryReceivedDebitsRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryReceivedDebitsEndpointSchema, payload),
    config
  );
}

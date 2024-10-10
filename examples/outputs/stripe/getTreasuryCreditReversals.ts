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
import {Treasury_Credit_reversal} from './treasury';
import {Error} from './schemas';

export const getTreasuryCreditReversalsEndpointSchema = {
  path: '/v1/treasury/credit_reversals',
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

export type GetTreasuryCreditReversalsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    financial_account: string;
    limit?: number; // int
    received_credit?: string;
    starting_after?: string;
    status?: 'canceled' | 'posted' | 'processing';
  }
>;

export type GetTreasuryCreditReversalsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Treasury_Credit_reversal[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryCreditReversalsRequestResult = RequestResult<
  GetTreasuryCreditReversalsRequest,
  GetTreasuryCreditReversalsResponse
>;

export function getTreasuryCreditReversals(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryCreditReversalsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryCreditReversalsRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryCreditReversalsEndpointSchema, payload),
    config
  );
}

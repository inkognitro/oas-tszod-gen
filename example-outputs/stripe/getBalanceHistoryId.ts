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
} from '@example-outputs/stripe/core';
import {Balance_transaction, Error} from '@example-outputs/stripe';

export const getBalanceHistoryIdEndpointSchema = {
  path: '/v1/balance/history/{id}',
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

export type GetBalanceHistoryIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetBalanceHistoryIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Balance_transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetBalanceHistoryIdRequestResult = RequestResult<
  GetBalanceHistoryIdRequest,
  GetBalanceHistoryIdResponse
>;

export function getBalanceHistoryId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBalanceHistoryIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBalanceHistoryIdRequestResult> {
  return requestHandler.execute(
    createRequest(getBalanceHistoryIdEndpointSchema, payload),
    config
  );
}

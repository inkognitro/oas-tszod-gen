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
import {Treasury_Credit_reversal, Error} from '@example-outputs/stripe';

export const getTreasuryCreditReversalsCreditReversalEndpointSchema = {
  path: '/v1/treasury/credit_reversals/{credit_reversal}',
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

export type GetTreasuryCreditReversalsCreditReversalRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    credit_reversal: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTreasuryCreditReversalsCreditReversalResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Credit_reversal>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryCreditReversalsCreditReversalRequestResult =
  RequestResult<
    GetTreasuryCreditReversalsCreditReversalRequest,
    GetTreasuryCreditReversalsCreditReversalResponse
  >;

export function getTreasuryCreditReversalsCreditReversal(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryCreditReversalsCreditReversalRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryCreditReversalsCreditReversalRequestResult> {
  return requestHandler.execute(
    createRequest(
      getTreasuryCreditReversalsCreditReversalEndpointSchema,
      payload
    ),
    config
  );
}

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

export const postTreasuryCreditReversalsEndpointSchema = {
  path: '/v1/treasury/credit_reversals',
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

export type PostTreasuryCreditReversalsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      received_credit: string;
    }
  >
>;

export type PostTreasuryCreditReversalsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Credit_reversal>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTreasuryCreditReversalsRequestResult = RequestResult<
  PostTreasuryCreditReversalsRequest,
  PostTreasuryCreditReversalsResponse
>;

export function postTreasuryCreditReversals(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTreasuryCreditReversalsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTreasuryCreditReversalsRequestResult> {
  return requestHandler.execute(
    createRequest(postTreasuryCreditReversalsEndpointSchema, payload),
    config
  );
}

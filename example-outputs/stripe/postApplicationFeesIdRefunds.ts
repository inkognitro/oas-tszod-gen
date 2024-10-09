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
import {Fee_refund, Error} from '@example-outputs/stripe';

export const postApplicationFeesIdRefundsEndpointSchema = {
  path: '/v1/application_fees/{id}/refunds',
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

export type PostApplicationFeesIdRefundsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
    }
  >,
  {
    id: string;
  }
>;

export type PostApplicationFeesIdRefundsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Fee_refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostApplicationFeesIdRefundsRequestResult = RequestResult<
  PostApplicationFeesIdRefundsRequest,
  PostApplicationFeesIdRefundsResponse
>;

export function postApplicationFeesIdRefunds(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostApplicationFeesIdRefundsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostApplicationFeesIdRefundsRequestResult> {
  return requestHandler.execute(
    createRequest(postApplicationFeesIdRefundsEndpointSchema, payload),
    config
  );
}

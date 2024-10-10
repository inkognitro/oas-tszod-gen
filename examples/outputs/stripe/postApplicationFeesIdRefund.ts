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
import {Application_fee, Error} from './schemas';

export const postApplicationFeesIdRefundEndpointSchema = {
  path: '/v1/application_fees/{id}/refund',
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

export type PostApplicationFeesIdRefundRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      directive?: string;
      expand?: string[];
    }
  >,
  {
    id: string;
  }
>;

export type PostApplicationFeesIdRefundResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Application_fee>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostApplicationFeesIdRefundRequestResult = RequestResult<
  PostApplicationFeesIdRefundRequest,
  PostApplicationFeesIdRefundResponse
>;

export function postApplicationFeesIdRefund(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostApplicationFeesIdRefundRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostApplicationFeesIdRefundRequestResult> {
  return requestHandler.execute(
    createRequest(postApplicationFeesIdRefundEndpointSchema, payload),
    config
  );
}

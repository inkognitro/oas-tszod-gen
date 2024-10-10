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
import {Refund, Error} from './schemas';

export const postTestHelpersRefundsRefundExpireEndpointSchema = {
  path: '/v1/test_helpers/refunds/{refund}/expire',
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

export type PostTestHelpersRefundsRefundExpireRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    refund: string;
  }
>;

export type PostTestHelpersRefundsRefundExpireResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersRefundsRefundExpireRequestResult = RequestResult<
  PostTestHelpersRefundsRefundExpireRequest,
  PostTestHelpersRefundsRefundExpireResponse
>;

export function postTestHelpersRefundsRefundExpire(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersRefundsRefundExpireRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersRefundsRefundExpireRequestResult> {
  return requestHandler.execute(
    createRequest(postTestHelpersRefundsRefundExpireEndpointSchema, payload),
    config
  );
}

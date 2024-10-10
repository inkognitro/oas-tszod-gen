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

export const postRefundsRefundCancelEndpointSchema = {
  path: '/v1/refunds/{refund}/cancel',
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

export type PostRefundsRefundCancelRequest = RequestUnion<
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

export type PostRefundsRefundCancelResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostRefundsRefundCancelRequestResult = RequestResult<
  PostRefundsRefundCancelRequest,
  PostRefundsRefundCancelResponse
>;

export function postRefundsRefundCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostRefundsRefundCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostRefundsRefundCancelRequestResult> {
  return requestHandler.execute(
    createRequest(postRefundsRefundCancelEndpointSchema, payload),
    config
  );
}

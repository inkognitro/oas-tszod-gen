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

export const postRefundsRefundEndpointSchema = {
  path: '/v1/refunds/{refund}',
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

export type PostRefundsRefundRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    refund: string;
  }
>;

export type PostRefundsRefundResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostRefundsRefundRequestResult = RequestResult<
  PostRefundsRefundRequest,
  PostRefundsRefundResponse
>;

export function postRefundsRefund(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostRefundsRefundRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostRefundsRefundRequestResult> {
  return requestHandler.execute(
    createRequest(postRefundsRefundEndpointSchema, payload),
    config
  );
}

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

export const getRefundsRefundEndpointSchema = {
  path: '/v1/refunds/{refund}',
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

export type GetRefundsRefundRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    refund: string;
  },
  {
    expand?: string[];
  }
>;

export type GetRefundsRefundResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetRefundsRefundRequestResult = RequestResult<
  GetRefundsRefundRequest,
  GetRefundsRefundResponse
>;

export function getRefundsRefund(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetRefundsRefundRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetRefundsRefundRequestResult> {
  return requestHandler.execute(
    createRequest(getRefundsRefundEndpointSchema, payload),
    config
  );
}

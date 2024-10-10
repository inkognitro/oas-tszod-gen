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
import {Treasury_Outbound_payment} from './treasury';
import {Error} from './schemas';

export const postTreasuryOutboundPaymentsIdCancelEndpointSchema = {
  path: '/v1/treasury/outbound_payments/{id}/cancel',
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

export type PostTreasuryOutboundPaymentsIdCancelRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    id: string;
  }
>;

export type PostTreasuryOutboundPaymentsIdCancelResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Outbound_payment>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTreasuryOutboundPaymentsIdCancelRequestResult = RequestResult<
  PostTreasuryOutboundPaymentsIdCancelRequest,
  PostTreasuryOutboundPaymentsIdCancelResponse
>;

export function postTreasuryOutboundPaymentsIdCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTreasuryOutboundPaymentsIdCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTreasuryOutboundPaymentsIdCancelRequestResult> {
  return requestHandler.execute(
    createRequest(postTreasuryOutboundPaymentsIdCancelEndpointSchema, payload),
    config
  );
}

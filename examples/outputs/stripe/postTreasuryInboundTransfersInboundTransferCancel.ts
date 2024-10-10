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
import {Treasury_Inbound_transfer} from './treasury';
import {Error} from './schemas';

export const postTreasuryInboundTransfersInboundTransferCancelEndpointSchema = {
  path: '/v1/treasury/inbound_transfers/{inbound_transfer}/cancel',
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

export type PostTreasuryInboundTransfersInboundTransferCancelRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
      }
    >,
    {
      inbound_transfer: string;
    }
  >;

export type PostTreasuryInboundTransfersInboundTransferCancelResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Inbound_transfer>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTreasuryInboundTransfersInboundTransferCancelRequestResult =
  RequestResult<
    PostTreasuryInboundTransfersInboundTransferCancelRequest,
    PostTreasuryInboundTransfersInboundTransferCancelResponse
  >;

export function postTreasuryInboundTransfersInboundTransferCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTreasuryInboundTransfersInboundTransferCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTreasuryInboundTransfersInboundTransferCancelRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTreasuryInboundTransfersInboundTransferCancelEndpointSchema,
      payload
    ),
    config
  );
}

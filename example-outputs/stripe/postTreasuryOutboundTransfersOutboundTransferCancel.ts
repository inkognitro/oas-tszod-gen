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
import {Treasury_Outbound_transfer, Error} from '@example-outputs/stripe';

export const postTreasuryOutboundTransfersOutboundTransferCancelEndpointSchema =
  {
    path: '/v1/treasury/outbound_transfers/{outbound_transfer}/cancel',
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

export type PostTreasuryOutboundTransfersOutboundTransferCancelRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
      }
    >,
    {
      outbound_transfer: string;
    }
  >;

export type PostTreasuryOutboundTransfersOutboundTransferCancelResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Outbound_transfer>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTreasuryOutboundTransfersOutboundTransferCancelRequestResult =
  RequestResult<
    PostTreasuryOutboundTransfersOutboundTransferCancelRequest,
    PostTreasuryOutboundTransfersOutboundTransferCancelResponse
  >;

export function postTreasuryOutboundTransfersOutboundTransferCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTreasuryOutboundTransfersOutboundTransferCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTreasuryOutboundTransfersOutboundTransferCancelRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTreasuryOutboundTransfersOutboundTransferCancelEndpointSchema,
      payload
    ),
    config
  );
}

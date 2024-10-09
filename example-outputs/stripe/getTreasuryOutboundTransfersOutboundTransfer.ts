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

export const getTreasuryOutboundTransfersOutboundTransferEndpointSchema = {
  path: '/v1/treasury/outbound_transfers/{outbound_transfer}',
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

export type GetTreasuryOutboundTransfersOutboundTransferRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    outbound_transfer: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTreasuryOutboundTransfersOutboundTransferResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Outbound_transfer>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryOutboundTransfersOutboundTransferRequestResult =
  RequestResult<
    GetTreasuryOutboundTransfersOutboundTransferRequest,
    GetTreasuryOutboundTransfersOutboundTransferResponse
  >;

export function getTreasuryOutboundTransfersOutboundTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryOutboundTransfersOutboundTransferRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryOutboundTransfersOutboundTransferRequestResult> {
  return requestHandler.execute(
    createRequest(
      getTreasuryOutboundTransfersOutboundTransferEndpointSchema,
      payload
    ),
    config
  );
}

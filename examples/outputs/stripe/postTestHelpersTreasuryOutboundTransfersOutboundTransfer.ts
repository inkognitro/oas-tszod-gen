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
import {Treasury_Outbound_transfer} from './treasury';
import {Error} from './schemas';

export const postTestHelpersTreasuryOutboundTransfersOutboundTransferEndpointSchema =
  {
    path: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}',
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

export type PostTestHelpersTreasuryOutboundTransfersOutboundTransferRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
        tracking_details: {
          ach?: {
            trace_id: string;
          };
          type: 'ach' | 'us_domestic_wire';
          us_domestic_wire?: {
            chips?: string;
            imad?: string;
            omad?: string;
          };
        };
      }
    >,
    {
      outbound_transfer: string;
    }
  >;

export type PostTestHelpersTreasuryOutboundTransfersOutboundTransferResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Outbound_transfer>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTreasuryOutboundTransfersOutboundTransferRequestResult =
  RequestResult<
    PostTestHelpersTreasuryOutboundTransfersOutboundTransferRequest,
    PostTestHelpersTreasuryOutboundTransfersOutboundTransferResponse
  >;

export function postTestHelpersTreasuryOutboundTransfersOutboundTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTreasuryOutboundTransfersOutboundTransferRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTreasuryOutboundTransfersOutboundTransferRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersTreasuryOutboundTransfersOutboundTransferEndpointSchema,
      payload
    ),
    config
  );
}

import {
  z_Treasury_Inbound_transfer,
  Treasury_Inbound_transfer,
} from './treasury';
import {z_Error, Error} from './schemas';
import {z} from 'zod';
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

export const postTreasuryInboundTransfersInboundTransferCancelEndpointSchema = {
  path: '/v1/treasury/inbound_transfers/{inbound_transfer}/cancel',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    inbound_transfer: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Treasury_Inbound_transfer,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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

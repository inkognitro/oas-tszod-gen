import {
  z_Treasury_Outbound_transfer,
  z_Error,
  Treasury_Outbound_transfer,
  Error,
} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const getTreasuryOutboundTransfersOutboundTransferEndpointSchema = {
  path: '/v1/treasury/outbound_transfers/{outbound_transfer}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    outbound_transfer: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Treasury_Outbound_transfer,
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

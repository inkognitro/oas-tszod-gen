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

export const postTestHelpersTreasuryOutboundTransfersOutboundTransferFailEndpointSchema =
  {
    path: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      outbound_transfer: z.string(),
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

export type PostTestHelpersTreasuryOutboundTransfersOutboundTransferFailRequest =
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

export type PostTestHelpersTreasuryOutboundTransfersOutboundTransferFailResponse =

    | ResponseUnion<
        200,
        ResponseBodyData<'application/json', Treasury_Outbound_transfer>
      >
    | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTreasuryOutboundTransfersOutboundTransferFailRequestResult =
  RequestResult<
    PostTestHelpersTreasuryOutboundTransfersOutboundTransferFailRequest,
    PostTestHelpersTreasuryOutboundTransfersOutboundTransferFailResponse
  >;

export function postTestHelpersTreasuryOutboundTransfersOutboundTransferFail(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTreasuryOutboundTransfersOutboundTransferFailRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTreasuryOutboundTransfersOutboundTransferFailRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersTreasuryOutboundTransfersOutboundTransferFailEndpointSchema,
      payload
    ),
    config
  );
}

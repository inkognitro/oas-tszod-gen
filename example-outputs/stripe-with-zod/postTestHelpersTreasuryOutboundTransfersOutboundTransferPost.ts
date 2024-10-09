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

export const postTestHelpersTreasuryOutboundTransfersOutboundTransferPostEndpointSchema =
  {
    path: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post',
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

export type PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostRequest =
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

export type PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostResponse =

    | ResponseUnion<
        200,
        ResponseBodyData<'application/json', Treasury_Outbound_transfer>
      >
    | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostRequestResult =
  RequestResult<
    PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostRequest,
    PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostResponse
  >;

export function postTestHelpersTreasuryOutboundTransfersOutboundTransferPost(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersTreasuryOutboundTransfersOutboundTransferPostEndpointSchema,
      payload
    ),
    config
  );
}

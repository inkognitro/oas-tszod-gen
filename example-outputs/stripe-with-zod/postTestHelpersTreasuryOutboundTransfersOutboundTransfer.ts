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

export const postTestHelpersTreasuryOutboundTransfersOutboundTransferEndpointSchema =
  {
    path: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      outbound_transfer: z.string(),
    }),
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({
          expand: z.array(z.string()).optional(),
          tracking_details: z.object({
            ach: z
              .object({
                trace_id: z.string(),
              })
              .optional(),
            type: z.enum(['ach', 'us_domestic_wire']),
            us_domestic_wire: z
              .object({
                chips: z.string().optional(),
                imad: z.string().optional(),
                omad: z.string().optional(),
              })
              .optional(),
          }),
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

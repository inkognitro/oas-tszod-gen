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

export const postTestHelpersTreasuryOutboundTransfersOutboundTransferReturnEndpointSchema =
  {
    path: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      outbound_transfer: z.string(),
    }),
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({
          expand: z.array(z.string()).optional(),
          returned_details: z
            .object({
              code: z
                .enum([
                  'account_closed',
                  'account_frozen',
                  'bank_account_restricted',
                  'bank_ownership_changed',
                  'declined',
                  'incorrect_account_holder_name',
                  'invalid_account_number',
                  'invalid_currency',
                  'no_account',
                  'other',
                ])
                .optional(),
            })
            .optional(),
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

export type PostTestHelpersTreasuryOutboundTransfersOutboundTransferReturnRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
        returned_details?: {
          code?:
            | 'account_closed'
            | 'account_frozen'
            | 'bank_account_restricted'
            | 'bank_ownership_changed'
            | 'declined'
            | 'incorrect_account_holder_name'
            | 'invalid_account_number'
            | 'invalid_currency'
            | 'no_account'
            | 'other';
        };
      }
    >,
    {
      outbound_transfer: string;
    }
  >;

export type PostTestHelpersTreasuryOutboundTransfersOutboundTransferReturnResponse =

    | ResponseUnion<
        200,
        ResponseBodyData<'application/json', Treasury_Outbound_transfer>
      >
    | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTreasuryOutboundTransfersOutboundTransferReturnRequestResult =
  RequestResult<
    PostTestHelpersTreasuryOutboundTransfersOutboundTransferReturnRequest,
    PostTestHelpersTreasuryOutboundTransfersOutboundTransferReturnResponse
  >;

export function postTestHelpersTreasuryOutboundTransfersOutboundTransferReturn(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTreasuryOutboundTransfersOutboundTransferReturnRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTreasuryOutboundTransfersOutboundTransferReturnRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersTreasuryOutboundTransfersOutboundTransferReturnEndpointSchema,
      payload
    ),
    config
  );
}

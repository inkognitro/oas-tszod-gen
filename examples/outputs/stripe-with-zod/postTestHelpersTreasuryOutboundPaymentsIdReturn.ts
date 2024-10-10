import {
  z_Treasury_Outbound_payment,
  Treasury_Outbound_payment,
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

export const postTestHelpersTreasuryOutboundPaymentsIdReturnEndpointSchema = {
  path: '/v1/test_helpers/treasury/outbound_payments/{id}/return',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
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
          zodSchema: z_Treasury_Outbound_payment,
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

export type PostTestHelpersTreasuryOutboundPaymentsIdReturnRequest =
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
      id: string;
    }
  >;

export type PostTestHelpersTreasuryOutboundPaymentsIdReturnResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Outbound_payment>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTreasuryOutboundPaymentsIdReturnRequestResult =
  RequestResult<
    PostTestHelpersTreasuryOutboundPaymentsIdReturnRequest,
    PostTestHelpersTreasuryOutboundPaymentsIdReturnResponse
  >;

export function postTestHelpersTreasuryOutboundPaymentsIdReturn(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTreasuryOutboundPaymentsIdReturnRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTreasuryOutboundPaymentsIdReturnRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersTreasuryOutboundPaymentsIdReturnEndpointSchema,
      payload
    ),
    config
  );
}

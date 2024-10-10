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

export const postTestHelpersTreasuryInboundTransfersIdFailEndpointSchema = {
  path: '/v1/test_helpers/treasury/inbound_transfers/{id}/fail',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        failure_details: z
          .object({
            code: z
              .enum([
                'account_closed',
                'account_frozen',
                'bank_account_restricted',
                'bank_ownership_changed',
                'debit_not_authorized',
                'incorrect_account_holder_address',
                'incorrect_account_holder_name',
                'incorrect_account_holder_tax_id',
                'insufficient_funds',
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

export type PostTestHelpersTreasuryInboundTransfersIdFailRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      failure_details?: {
        code?:
          | 'account_closed'
          | 'account_frozen'
          | 'bank_account_restricted'
          | 'bank_ownership_changed'
          | 'debit_not_authorized'
          | 'incorrect_account_holder_address'
          | 'incorrect_account_holder_name'
          | 'incorrect_account_holder_tax_id'
          | 'insufficient_funds'
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

export type PostTestHelpersTreasuryInboundTransfersIdFailResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Inbound_transfer>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTreasuryInboundTransfersIdFailRequestResult =
  RequestResult<
    PostTestHelpersTreasuryInboundTransfersIdFailRequest,
    PostTestHelpersTreasuryInboundTransfersIdFailResponse
  >;

export function postTestHelpersTreasuryInboundTransfersIdFail(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTreasuryInboundTransfersIdFailRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTreasuryInboundTransfersIdFailRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersTreasuryInboundTransfersIdFailEndpointSchema,
      payload
    ),
    config
  );
}

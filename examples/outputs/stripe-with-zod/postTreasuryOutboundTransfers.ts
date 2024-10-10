import {
  z_Treasury_Outbound_transfer,
  Treasury_Outbound_transfer,
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

export const postTreasuryOutboundTransfersEndpointSchema = {
  path: '/v1/treasury/outbound_transfers',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite(),
        currency: z.string(),
        description: z.string().optional(),
        destination_payment_method: z.string().optional(),
        destination_payment_method_options: z
          .object({
            us_bank_account: z
              .union([
                z.object({
                  network: z.enum(['ach', 'us_domestic_wire']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
          })
          .optional(),
        expand: z.array(z.string()).optional(),
        financial_account: z.string(),
        metadata: z.record(z.string()).optional(),
        statement_descriptor: z.string().optional(),
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

export type PostTreasuryOutboundTransfersRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount: number; // int
      currency: string;
      description?: string;
      destination_payment_method?: string;
      destination_payment_method_options?: {
        us_bank_account?: (
          | {
              network?: 'ach' | 'us_domestic_wire';
            }
          | ''
        ) &
          Partial<{
            network?: 'ach' | 'us_domestic_wire';
          }>;
      };
      expand?: string[];
      financial_account: string;
      metadata?: {
        [key: string]: string;
      };
      statement_descriptor?: string;
    }
  >
>;

export type PostTreasuryOutboundTransfersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Outbound_transfer>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTreasuryOutboundTransfersRequestResult = RequestResult<
  PostTreasuryOutboundTransfersRequest,
  PostTreasuryOutboundTransfersResponse
>;

export function postTreasuryOutboundTransfers(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTreasuryOutboundTransfersRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTreasuryOutboundTransfersRequestResult> {
  return requestHandler.execute(
    createRequest(postTreasuryOutboundTransfersEndpointSchema, payload),
    config
  );
}

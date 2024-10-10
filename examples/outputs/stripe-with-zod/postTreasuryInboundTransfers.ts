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

export const postTreasuryInboundTransfersEndpointSchema = {
  path: '/v1/treasury/inbound_transfers',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite(),
        currency: z.string(),
        description: z.string().optional(),
        expand: z.array(z.string()).optional(),
        financial_account: z.string(),
        metadata: z.record(z.string()).optional(),
        origin_payment_method: z.string(),
        statement_descriptor: z.string().optional(),
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

export type PostTreasuryInboundTransfersRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount: number; // int
      currency: string;
      description?: string;
      expand?: string[];
      financial_account: string;
      metadata?: {
        [key: string]: string;
      };
      origin_payment_method: string;
      statement_descriptor?: string;
    }
  >
>;

export type PostTreasuryInboundTransfersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Inbound_transfer>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTreasuryInboundTransfersRequestResult = RequestResult<
  PostTreasuryInboundTransfersRequest,
  PostTreasuryInboundTransfersResponse
>;

export function postTreasuryInboundTransfers(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTreasuryInboundTransfersRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTreasuryInboundTransfersRequestResult> {
  return requestHandler.execute(
    createRequest(postTreasuryInboundTransfersEndpointSchema, payload),
    config
  );
}

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

export const getTreasuryOutboundTransfersEndpointSchema = {
  path: '/v1/treasury/outbound_transfers',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    financial_account: z.string(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
    status: z
      .enum(['canceled', 'failed', 'posted', 'processing', 'returned'])
      .optional(),
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
          zodSchema: z.object({
            data: z.array(z_Treasury_Outbound_transfer),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string(),
          }),
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

export type GetTreasuryOutboundTransfersRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    financial_account: string;
    limit?: number; // int
    starting_after?: string;
    status?: 'canceled' | 'failed' | 'posted' | 'processing' | 'returned';
  }
>;

export type GetTreasuryOutboundTransfersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Treasury_Outbound_transfer[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryOutboundTransfersRequestResult = RequestResult<
  GetTreasuryOutboundTransfersRequest,
  GetTreasuryOutboundTransfersResponse
>;

export function getTreasuryOutboundTransfers(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryOutboundTransfersRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryOutboundTransfersRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryOutboundTransfersEndpointSchema, payload),
    config
  );
}

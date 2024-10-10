import {z_Treasury_Received_debit, Treasury_Received_debit} from './treasury';
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

export const getTreasuryReceivedDebitsEndpointSchema = {
  path: '/v1/treasury/received_debits',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    financial_account: z.string(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
    status: z.enum(['failed', 'succeeded']).optional(),
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
            data: z.array(z_Treasury_Received_debit),
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

export type GetTreasuryReceivedDebitsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    financial_account: string;
    limit?: number; // int
    starting_after?: string;
    status?: 'failed' | 'succeeded';
  }
>;

export type GetTreasuryReceivedDebitsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Treasury_Received_debit[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryReceivedDebitsRequestResult = RequestResult<
  GetTreasuryReceivedDebitsRequest,
  GetTreasuryReceivedDebitsResponse
>;

export function getTreasuryReceivedDebits(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryReceivedDebitsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryReceivedDebitsRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryReceivedDebitsEndpointSchema, payload),
    config
  );
}

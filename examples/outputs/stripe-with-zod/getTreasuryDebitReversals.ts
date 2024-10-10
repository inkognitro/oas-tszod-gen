import {z_Treasury_Debit_reversal, Treasury_Debit_reversal} from './treasury';
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

export const getTreasuryDebitReversalsEndpointSchema = {
  path: '/v1/treasury/debit_reversals',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    financial_account: z.string(),
    limit: z.number().int().safe().finite().optional(),
    received_debit: z.string().optional(),
    resolution: z.enum(['lost', 'won']).optional(),
    starting_after: z.string().optional(),
    status: z.enum(['canceled', 'completed', 'processing']).optional(),
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
            data: z.array(z_Treasury_Debit_reversal),
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

export type GetTreasuryDebitReversalsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    financial_account: string;
    limit?: number; // int
    received_debit?: string;
    resolution?: 'lost' | 'won';
    starting_after?: string;
    status?: 'canceled' | 'completed' | 'processing';
  }
>;

export type GetTreasuryDebitReversalsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Treasury_Debit_reversal[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryDebitReversalsRequestResult = RequestResult<
  GetTreasuryDebitReversalsRequest,
  GetTreasuryDebitReversalsResponse
>;

export function getTreasuryDebitReversals(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryDebitReversalsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryDebitReversalsRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryDebitReversalsEndpointSchema, payload),
    config
  );
}

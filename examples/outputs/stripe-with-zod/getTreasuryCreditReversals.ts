import {z_Treasury_Credit_reversal, Treasury_Credit_reversal} from './treasury';
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

export const getTreasuryCreditReversalsEndpointSchema = {
  path: '/v1/treasury/credit_reversals',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    financial_account: z.string(),
    limit: z.number().int().safe().finite().optional(),
    received_credit: z.string().optional(),
    starting_after: z.string().optional(),
    status: z.enum(['canceled', 'posted', 'processing']).optional(),
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
            data: z.array(z_Treasury_Credit_reversal),
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

export type GetTreasuryCreditReversalsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    financial_account: string;
    limit?: number; // int
    received_credit?: string;
    starting_after?: string;
    status?: 'canceled' | 'posted' | 'processing';
  }
>;

export type GetTreasuryCreditReversalsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Treasury_Credit_reversal[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryCreditReversalsRequestResult = RequestResult<
  GetTreasuryCreditReversalsRequest,
  GetTreasuryCreditReversalsResponse
>;

export function getTreasuryCreditReversals(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryCreditReversalsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryCreditReversalsRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryCreditReversalsEndpointSchema, payload),
    config
  );
}

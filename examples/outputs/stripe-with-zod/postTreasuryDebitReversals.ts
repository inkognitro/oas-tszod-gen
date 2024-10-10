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

export const postTreasuryDebitReversalsEndpointSchema = {
  path: '/v1/treasury/debit_reversals',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        metadata: z.record(z.string()).optional(),
        received_debit: z.string(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Treasury_Debit_reversal,
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

export type PostTreasuryDebitReversalsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      received_debit: string;
    }
  >
>;

export type PostTreasuryDebitReversalsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Debit_reversal>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTreasuryDebitReversalsRequestResult = RequestResult<
  PostTreasuryDebitReversalsRequest,
  PostTreasuryDebitReversalsResponse
>;

export function postTreasuryDebitReversals(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTreasuryDebitReversalsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTreasuryDebitReversalsRequestResult> {
  return requestHandler.execute(
    createRequest(postTreasuryDebitReversalsEndpointSchema, payload),
    config
  );
}

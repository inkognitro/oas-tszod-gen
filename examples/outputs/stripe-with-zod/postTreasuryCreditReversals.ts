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

export const postTreasuryCreditReversalsEndpointSchema = {
  path: '/v1/treasury/credit_reversals',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        metadata: z.record(z.string()).optional(),
        received_credit: z.string(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Treasury_Credit_reversal,
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

export type PostTreasuryCreditReversalsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      received_credit: string;
    }
  >
>;

export type PostTreasuryCreditReversalsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Credit_reversal>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTreasuryCreditReversalsRequestResult = RequestResult<
  PostTreasuryCreditReversalsRequest,
  PostTreasuryCreditReversalsResponse
>;

export function postTreasuryCreditReversals(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTreasuryCreditReversalsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTreasuryCreditReversalsRequestResult> {
  return requestHandler.execute(
    createRequest(postTreasuryCreditReversalsEndpointSchema, payload),
    config
  );
}

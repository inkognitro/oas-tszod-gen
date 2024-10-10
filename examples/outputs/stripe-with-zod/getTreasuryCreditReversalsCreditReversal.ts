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

export const getTreasuryCreditReversalsCreditReversalEndpointSchema = {
  path: '/v1/treasury/credit_reversals/{credit_reversal}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    credit_reversal: z.string(),
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

export type GetTreasuryCreditReversalsCreditReversalRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    credit_reversal: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTreasuryCreditReversalsCreditReversalResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Credit_reversal>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryCreditReversalsCreditReversalRequestResult =
  RequestResult<
    GetTreasuryCreditReversalsCreditReversalRequest,
    GetTreasuryCreditReversalsCreditReversalResponse
  >;

export function getTreasuryCreditReversalsCreditReversal(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryCreditReversalsCreditReversalRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryCreditReversalsCreditReversalRequestResult> {
  return requestHandler.execute(
    createRequest(
      getTreasuryCreditReversalsCreditReversalEndpointSchema,
      payload
    ),
    config
  );
}

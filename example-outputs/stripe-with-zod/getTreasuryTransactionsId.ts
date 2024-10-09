import {
  z_Treasury_Transaction,
  z_Error,
  Treasury_Transaction,
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

export const getTreasuryTransactionsIdEndpointSchema = {
  path: '/v1/treasury/transactions/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    id: z.string(),
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
          zodSchema: z_Treasury_Transaction,
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

export type GetTreasuryTransactionsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTreasuryTransactionsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryTransactionsIdRequestResult = RequestResult<
  GetTreasuryTransactionsIdRequest,
  GetTreasuryTransactionsIdResponse
>;

export function getTreasuryTransactionsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryTransactionsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryTransactionsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryTransactionsIdEndpointSchema, payload),
    config
  );
}

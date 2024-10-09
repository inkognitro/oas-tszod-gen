import {
  z_Treasury_Transaction_entry,
  z_Error,
  Treasury_Transaction_entry,
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

export const getTreasuryTransactionEntriesIdEndpointSchema = {
  path: '/v1/treasury/transaction_entries/{id}',
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
          zodSchema: z_Treasury_Transaction_entry,
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

export type GetTreasuryTransactionEntriesIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTreasuryTransactionEntriesIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Transaction_entry>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryTransactionEntriesIdRequestResult = RequestResult<
  GetTreasuryTransactionEntriesIdRequest,
  GetTreasuryTransactionEntriesIdResponse
>;

export function getTreasuryTransactionEntriesId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryTransactionEntriesIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryTransactionEntriesIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryTransactionEntriesIdEndpointSchema, payload),
    config
  );
}

import {
  z_Treasury_Received_debit,
  z_Error,
  Treasury_Received_debit,
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

export const getTreasuryReceivedDebitsIdEndpointSchema = {
  path: '/v1/treasury/received_debits/{id}',
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
          zodSchema: z_Treasury_Received_debit,
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

export type GetTreasuryReceivedDebitsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTreasuryReceivedDebitsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Received_debit>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryReceivedDebitsIdRequestResult = RequestResult<
  GetTreasuryReceivedDebitsIdRequest,
  GetTreasuryReceivedDebitsIdResponse
>;

export function getTreasuryReceivedDebitsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryReceivedDebitsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryReceivedDebitsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryReceivedDebitsIdEndpointSchema, payload),
    config
  );
}

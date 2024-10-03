import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1LendingAutoInvestPlanEditStatusEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/plan/edit-status',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    planId: z.number().int().safe().finite(),
    status: z.enum(['ONGOING', 'PAUSED', 'REMOVED']),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            planId: z.number().int().safe().finite(),
            nextExecutionDateTime: z.number().int().safe().finite(),
            status: z.string(),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type PostSapiV1LendingAutoInvestPlanEditStatusRequest = RequestUnion<
  any,
  any,
  {
    planId: number; // int
    status: 'ONGOING' | 'PAUSED' | 'REMOVED';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1LendingAutoInvestPlanEditStatusResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          planId: number; // int
          nextExecutionDateTime: number; // int
          status: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LendingAutoInvestPlanEditStatusRequestResult =
  RequestResult<
    PostSapiV1LendingAutoInvestPlanEditStatusRequest,
    PostSapiV1LendingAutoInvestPlanEditStatusResponse
  >;

export function postSapiV1LendingAutoInvestPlanEditStatus(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1LendingAutoInvestPlanEditStatusRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LendingAutoInvestPlanEditStatusRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSapiV1LendingAutoInvestPlanEditStatusEndpointSchema,
      payload
    ),
    config
  );
}

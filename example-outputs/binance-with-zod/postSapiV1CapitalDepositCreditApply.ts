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

export const postSapiV1CapitalDepositCreditApplyEndpointSchema = {
  path: '/sapi/v1/capital/deposit/credit-apply',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    depositId: z.number().int().safe().finite().optional(),
    txId: z.string().optional(),
    subAccountId: z.number().int().safe().finite().optional(),
    subUserId: z.number().int().safe().finite().optional(),
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
            code: z.string(),
            message: z.string(),
            data: z.boolean(),
            success: z.boolean(),
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

export type PostSapiV1CapitalDepositCreditApplyRequest = RequestUnion<
  any,
  any,
  {
    depositId?: number; // int
    txId?: string;
    subAccountId?: number; // int
    subUserId?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1CapitalDepositCreditApplyResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: boolean;
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1CapitalDepositCreditApplyRequestResult = RequestResult<
  PostSapiV1CapitalDepositCreditApplyRequest,
  PostSapiV1CapitalDepositCreditApplyResponse
>;

export function postSapiV1CapitalDepositCreditApply(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1CapitalDepositCreditApplyRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1CapitalDepositCreditApplyRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1CapitalDepositCreditApplyEndpointSchema, payload),
    config
  );
}

import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1CapitalDepositCreditApplyEndpointSchema = {
  path: '/sapi/v1/capital/deposit/credit-apply',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type PostSapiV1CapitalDepositCreditApplyPayload = {
  queryParams: {
    depositId?: number; // int
    txId?: string;
    subAccountId?: number; // int
    subUserId?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1CapitalDepositCreditApplyResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1CapitalDepositCreditApplyRequestResult = RequestResult<
  Request,
  PostSapiV1CapitalDepositCreditApplyResponse
>;

export function postSapiV1CapitalDepositCreditApply(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1CapitalDepositCreditApplyPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1CapitalDepositCreditApplyRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1CapitalDepositCreditApplyEndpointSchema,
    }),
    config
  );
}

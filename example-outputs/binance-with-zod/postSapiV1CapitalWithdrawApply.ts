import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1CapitalWithdrawApplyEndpointSchema = {
  path: '/sapi/v1/capital/withdraw/apply',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    coin: z.string(),
    withdrawOrderId: z.string().optional(),
    network: z.string().optional(),
    address: z.string(),
    addressTag: z.string().optional(),
    amount: z.number().safe().finite(),
    transactionFeeFlag: z.boolean().optional(),
    name: z.string().optional(),
    walletType: z.number().int().safe().finite().optional(),
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
            id: z.string(),
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

export type PostSapiV1CapitalWithdrawApplyPayload = {
  queryParams: {
    coin: string;
    withdrawOrderId?: string;
    network?: string;
    address: string;
    addressTag?: string;
    amount: number;
    transactionFeeFlag?: boolean;
    name?: string;
    walletType?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1CapitalWithdrawApplyResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          id: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1CapitalWithdrawApplyRequestResult = RequestResult<
  Request,
  PostSapiV1CapitalWithdrawApplyResponse
>;

export function postSapiV1CapitalWithdrawApply(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1CapitalWithdrawApplyPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1CapitalWithdrawApplyRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1CapitalWithdrawApplyEndpointSchema,
    }),
    config
  );
}

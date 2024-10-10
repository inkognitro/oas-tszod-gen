import {z_Error, Error} from '../../../../';
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
} from '../../../../core';

export const postApplyEndpointSchema = {
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
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type PostApplyRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type PostApplyResponse =
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

export type PostApplyRequestResult = RequestResult<
  PostApplyRequest,
  PostApplyResponse
>;

export function postApply(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostApplyRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostApplyRequestResult> {
  return requestHandler.execute(
    createRequest(postApplyEndpointSchema, payload),
    config
  );
}

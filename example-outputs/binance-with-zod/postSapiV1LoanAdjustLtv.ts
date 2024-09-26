import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1LoanAdjustLtvEndpointSchema = {
  path: '/sapi/v1/loan/adjust/ltv',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    orderId: z.number().int().safe().finite(),
    amount: z.number().safe().finite(),
    direction: z.enum(['ADDITIONAL', 'REDUCED']),
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
            loanCoin: z.string(),
            collateralCoin: z.string(),
            direction: z.string(),
            amount: z.string(),
            currentLTV: z.string(),
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

export type PostSapiV1LoanAdjustLtvPayload = {
  queryParams: {
    orderId: number; // int
    amount: number;
    direction: 'ADDITIONAL' | 'REDUCED';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1LoanAdjustLtvResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            loanCoin: string;
            collateralCoin: string;
            direction: string;
            amount: string;
            currentLTV: string;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1LoanAdjustLtvRequestResult = RequestResult<
  Request,
  PostSapiV1LoanAdjustLtvResponse
>;

export function postSapiV1LoanAdjustLtv(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LoanAdjustLtvPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanAdjustLtvRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LoanAdjustLtvEndpointSchema,
    }),
    config
  );
}

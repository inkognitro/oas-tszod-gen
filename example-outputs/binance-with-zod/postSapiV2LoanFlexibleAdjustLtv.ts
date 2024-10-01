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

export const postSapiV2LoanFlexibleAdjustLtvEndpointSchema = {
  path: '/sapi/v2/loan/flexible/adjust/ltv',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    loanCoin: z.string().optional(),
    collateralCoin: z.string().optional(),
    adjustmentAmount: z.number().safe().finite(),
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
            adjustmentAmount: z.string(),
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

export type PostSapiV2LoanFlexibleAdjustLtvPayload = {
  queryParams: {
    loanCoin?: string;
    collateralCoin?: string;
    adjustmentAmount: number;
    direction: 'ADDITIONAL' | 'REDUCED';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV2LoanFlexibleAdjustLtvResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          loanCoin: string;
          collateralCoin: string;
          direction: string;
          adjustmentAmount: string;
          currentLTV: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV2LoanFlexibleAdjustLtvRequestResult = RequestResult<
  Request,
  PostSapiV2LoanFlexibleAdjustLtvResponse
>;

export function postSapiV2LoanFlexibleAdjustLtv(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV2LoanFlexibleAdjustLtvPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV2LoanFlexibleAdjustLtvRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV2LoanFlexibleAdjustLtvEndpointSchema,
    }),
    config
  );
}

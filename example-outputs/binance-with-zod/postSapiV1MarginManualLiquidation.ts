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

export const postSapiV1MarginManualLiquidationEndpointSchema = {
  path: '/sapi/v1/margin/manual-liquidation',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    type: z.enum(['MARGIN', 'ISOLATED']),
    symbol: z.string().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              asset: z.string(),
              interest: z.string(),
              principal: z.string(),
              liabilityAsset: z.string(),
              liabilityQty: z.number().safe().finite(),
            })
          ),
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

export type PostSapiV1MarginManualLiquidationPayload = {
  queryParams: {
    type: 'MARGIN' | 'ISOLATED';
    symbol?: string;
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1MarginManualLiquidationResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          interest: string;
          principal: string;
          liabilityAsset: string;
          liabilityQty: number;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1MarginManualLiquidationRequestResult = RequestResult<
  Request,
  PostSapiV1MarginManualLiquidationResponse
>;

export function postSapiV1MarginManualLiquidation(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1MarginManualLiquidationPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MarginManualLiquidationRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1MarginManualLiquidationEndpointSchema,
    }),
    config
  );
}

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

export const postSapiV1DciProductSubscribeEndpointSchema = {
  path: '/sapi/v1/dci/product/subscribe',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    id: z.string(),
    orderId: z.string(),
    depositAmount: z.number().safe().finite(),
    autoCompoundPlan: z.enum(['NONE', 'STANDARD', 'ADVANCE']),
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
            positionId: z.number().int().safe().finite(),
            investCoin: z.string(),
            exercisedCoin: z.string(),
            subscriptionAmount: z.string(),
            duration: z.number().int().safe().finite(),
            autoCompoundPlan: z.string(),
            strikePrice: z.string(),
            settleDate: z.number().int().safe().finite(),
            purchaseStatus: z.string(),
            apr: z.string(),
            orderId: z.number().int().safe().finite(),
            purchaseTime: z.number().int().safe().finite(),
            'optionType"': z.string().optional(),
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

export type PostSapiV1DciProductSubscribeRequest = RequestUnion<
  any,
  any,
  {
    id: string;
    orderId: string;
    depositAmount: number;
    autoCompoundPlan: 'NONE' | 'STANDARD' | 'ADVANCE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1DciProductSubscribeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          positionId: number; // int
          investCoin: string;
          exercisedCoin: string;
          subscriptionAmount: string;
          duration: number; // int
          autoCompoundPlan: string;
          strikePrice: string;
          settleDate: number; // int
          purchaseStatus: string;
          apr: string;
          orderId: number; // int
          purchaseTime: number; // int
          'optionType"'?: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1DciProductSubscribeRequestResult = RequestResult<
  PostSapiV1DciProductSubscribeRequest,
  PostSapiV1DciProductSubscribeResponse
>;

export function postSapiV1DciProductSubscribe(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1DciProductSubscribeRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1DciProductSubscribeRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1DciProductSubscribeEndpointSchema, payload),
    config
  );
}

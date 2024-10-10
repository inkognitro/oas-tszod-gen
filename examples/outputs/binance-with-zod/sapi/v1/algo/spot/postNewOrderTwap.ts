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

export const postNewOrderTwapEndpointSchema = {
  path: '/sapi/v1/algo/spot/newOrderTwap',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    side: z.enum(['SELL', 'BUY']),
    quantity: z.number().safe().finite(),
    duration: z.number().int().safe().finite(),
    clientAlgoId: z.string().optional(),
    limitPrice: z.number().safe().finite().optional(),
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
            clientAlgoId: z.string(),
            success: z.boolean(),
            code: z.number().int().safe().finite(),
            msg: z.string(),
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

export type PostNewOrderTwapRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    side: 'SELL' | 'BUY';
    quantity: number;
    duration: number; // int
    clientAlgoId?: string;
    limitPrice?: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostNewOrderTwapResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          clientAlgoId: string;
          success: boolean;
          code: number; // int
          msg: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostNewOrderTwapRequestResult = RequestResult<
  PostNewOrderTwapRequest,
  PostNewOrderTwapResponse
>;

export function postNewOrderTwap(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostNewOrderTwapRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostNewOrderTwapRequestResult> {
  return requestHandler.execute(
    createRequest(postNewOrderTwapEndpointSchema, payload),
    config
  );
}

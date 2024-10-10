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

export const postNewOrderVpEndpointSchema = {
  path: '/sapi/v1/algo/futures/newOrderVp',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    side: z.enum(['SELL', 'BUY']),
    positionSide: z.enum(['BOTH', 'LONG', 'SHORT']).optional(),
    quantity: z.number().safe().finite(),
    urgency: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    clientAlgoId: z.string().optional(),
    reduceOnly: z.boolean().optional(),
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

export type PostNewOrderVpRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    side: 'SELL' | 'BUY';
    positionSide?: 'BOTH' | 'LONG' | 'SHORT';
    quantity: number;
    urgency: 'LOW' | 'MEDIUM' | 'HIGH';
    clientAlgoId?: string;
    reduceOnly?: boolean;
    limitPrice?: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostNewOrderVpResponse =
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

export type PostNewOrderVpRequestResult = RequestResult<
  PostNewOrderVpRequest,
  PostNewOrderVpResponse
>;

export function postNewOrderVp(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostNewOrderVpRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostNewOrderVpRequestResult> {
  return requestHandler.execute(
    createRequest(postNewOrderVpEndpointSchema, payload),
    config
  );
}

import {z_Error, Error} from '@example-outputs/binance-with-zod';
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

export const getSapiV1MarginTradecoeffEndpointSchema = {
  path: '/sapi/v1/margin/tradeCoeff',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
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
            normalBar: z.string().optional(),
            marginCallBar: z.string().optional(),
            forceLiquidationBar: z.string().optional(),
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

export type GetSapiV1MarginTradecoeffRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginTradecoeffResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          normalBar?: string;
          marginCallBar?: string;
          forceLiquidationBar?: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginTradecoeffRequestResult = RequestResult<
  GetSapiV1MarginTradecoeffRequest,
  GetSapiV1MarginTradecoeffResponse
>;

export function getSapiV1MarginTradecoeff(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginTradecoeffRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginTradecoeffRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginTradecoeffEndpointSchema, payload),
    config
  );
}

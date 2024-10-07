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

export const getSapiV1AccountApitradingstatusEndpointSchema = {
  path: '/sapi/v1/account/apiTradingStatus',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
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
            data: z.object({
              isLocked: z.boolean(),
              plannedRecoverTime: z.number().int().safe().finite(),
              triggerCondition: z.object({
                GCR: z.number().int().safe().finite(),
                IFER: z.number().int().safe().finite(),
                UFR: z.number().int().safe().finite(),
              }),
              indicators: z.object({
                BTCUSDT: z.array(
                  z.object({
                    i: z.string(),
                    c: z.number().int().safe().finite(),
                    v: z.number().safe().finite(),
                    t: z.number().safe().finite(),
                  })
                ),
              }),
              updateTime: z.number().int().safe().finite(),
            }),
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

export type GetSapiV1AccountApitradingstatusRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1AccountApitradingstatusResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: {
            isLocked: boolean;
            plannedRecoverTime: number; // int
            triggerCondition: {
              GCR: number; // int
              IFER: number; // int
              UFR: number; // int
            };
            indicators: {
              BTCUSDT: {
                i: string;
                c: number; // int
                v: number;
                t: number;
              }[];
            };
            updateTime: number; // int
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AccountApitradingstatusRequestResult = RequestResult<
  GetSapiV1AccountApitradingstatusRequest,
  GetSapiV1AccountApitradingstatusResponse
>;

export function getSapiV1AccountApitradingstatus(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1AccountApitradingstatusRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AccountApitradingstatusRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1AccountApitradingstatusEndpointSchema, payload),
    config
  );
}

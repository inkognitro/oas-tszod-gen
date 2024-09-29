import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
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

export type GetSapiV1AccountApitradingstatusPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AccountApitradingstatusResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AccountApitradingstatusRequestResult = RequestResult<
  Request,
  GetSapiV1AccountApitradingstatusResponse
>;

export function getSapiV1AccountApitradingstatus(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AccountApitradingstatusPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AccountApitradingstatusRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AccountApitradingstatusEndpointSchema,
    }),
    config
  );
}

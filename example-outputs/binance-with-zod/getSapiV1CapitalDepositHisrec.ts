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

export const getSapiV1CapitalDepositHisrecEndpointSchema = {
  path: '/sapi/v1/capital/deposit/hisrec',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    coin: z.string().optional(),
    status: z.number().int().safe().finite().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    offset: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
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
              amount: z.string(),
              coin: z.string(),
              network: z.string(),
              status: z.number().int().safe().finite(),
              address: z.string(),
              addressTag: z.string(),
              txId: z.string(),
              insertTime: z.number().int().safe().finite(),
              transferType: z.number().int().safe().finite(),
              unlockConfirm: z.string(),
              confirmTimes: z.string(),
            })
          ),
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

export type GetSapiV1CapitalDepositHisrecRequest = RequestUnion<
  any,
  any,
  {
    coin?: string;
    status?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    offset?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1CapitalDepositHisrecResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          amount: string;
          coin: string;
          network: string;
          status: number; // int
          address: string;
          addressTag: string;
          txId: string;
          insertTime: number; // int
          transferType: number; // int
          unlockConfirm: string;
          confirmTimes: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalDepositHisrecRequestResult = RequestResult<
  GetSapiV1CapitalDepositHisrecRequest,
  GetSapiV1CapitalDepositHisrecResponse
>;

export function getSapiV1CapitalDepositHisrec(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1CapitalDepositHisrecRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalDepositHisrecRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1CapitalDepositHisrecEndpointSchema, payload),
    config
  );
}

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

export const getSapiV1CapitalDepositSubhisrecEndpointSchema = {
  path: '/sapi/v1/capital/deposit/subHisrec',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
    coin: z.string().optional(),
    status: z.number().int().safe().finite().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
    offset: z.number().int().safe().finite().optional(),
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
              confirmTimes: z.string(),
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

export type GetSapiV1CapitalDepositSubhisrecPayload = {
  queryParams: {
    email: string;
    coin?: string;
    status?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    offset?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1CapitalDepositSubhisrecResponse =
  | Response<
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
          confirmTimes: string;
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalDepositSubhisrecRequestResult = RequestResult<
  Request,
  GetSapiV1CapitalDepositSubhisrecResponse
>;

export function getSapiV1CapitalDepositSubhisrec(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1CapitalDepositSubhisrecPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalDepositSubhisrecRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1CapitalDepositSubhisrecEndpointSchema,
    }),
    config
  );
}

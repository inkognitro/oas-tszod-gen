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

export const getSapiV1CapitalDepositSubaddressEndpointSchema = {
  path: '/sapi/v1/capital/deposit/subAddress',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
    coin: z.string(),
    network: z.string().optional(),
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
            address: z.string(),
            coin: z.string(),
            tag: z.string(),
            url: z.string(),
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

export type GetSapiV1CapitalDepositSubaddressPayload = {
  queryParams: {
    email: string;
    coin: string;
    network?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1CapitalDepositSubaddressResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          address: string;
          coin: string;
          tag: string;
          url: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalDepositSubaddressRequestResult = RequestResult<
  Request,
  GetSapiV1CapitalDepositSubaddressResponse
>;

export function getSapiV1CapitalDepositSubaddress(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1CapitalDepositSubaddressPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalDepositSubaddressRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1CapitalDepositSubaddressEndpointSchema,
    }),
    config
  );
}

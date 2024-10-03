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

export const getSapiV1CapitalDepositAddressEndpointSchema = {
  path: '/sapi/v1/capital/deposit/address',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
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

export type GetSapiV1CapitalDepositAddressRequest = RequestUnion<
  any,
  any,
  {
    coin: string;
    network?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1CapitalDepositAddressResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalDepositAddressRequestResult = RequestResult<
  GetSapiV1CapitalDepositAddressRequest,
  GetSapiV1CapitalDepositAddressResponse
>;

export function getSapiV1CapitalDepositAddress(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1CapitalDepositAddressRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalDepositAddressRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1CapitalDepositAddressEndpointSchema, payload),
    config
  );
}

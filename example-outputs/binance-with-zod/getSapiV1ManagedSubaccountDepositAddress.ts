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

export const getSapiV1ManagedSubaccountDepositAddressEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/deposit/address',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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
            coin: z.string(),
            address: z.string(),
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

export type GetSapiV1ManagedSubaccountDepositAddressRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    coin: string;
    network?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1ManagedSubaccountDepositAddressResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          coin: string;
          address: string;
          tag: string;
          url: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ManagedSubaccountDepositAddressRequestResult =
  RequestResult<
    GetSapiV1ManagedSubaccountDepositAddressRequest,
    GetSapiV1ManagedSubaccountDepositAddressResponse
  >;

export function getSapiV1ManagedSubaccountDepositAddress(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1ManagedSubaccountDepositAddressRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountDepositAddressRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1ManagedSubaccountDepositAddressEndpointSchema,
      payload
    ),
    config
  );
}

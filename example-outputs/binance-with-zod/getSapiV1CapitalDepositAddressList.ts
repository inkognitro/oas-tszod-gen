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

export const getSapiV1CapitalDepositAddressListEndpointSchema = {
  path: '/sapi/v1/capital/deposit/address/list',
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
          zodSchema: z.array(
            z.object({
              coin: z.string(),
              address: z.string(),
              isDefault: z.number().int().safe().finite(),
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

export type GetSapiV1CapitalDepositAddressListPayload = {
  queryParams: {
    coin: string;
    network?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1CapitalDepositAddressListResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          coin: string;
          address: string;
          isDefault: number; // int
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalDepositAddressListRequestResult = RequestResult<
  Request,
  GetSapiV1CapitalDepositAddressListResponse
>;

export function getSapiV1CapitalDepositAddressList(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1CapitalDepositAddressListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalDepositAddressListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1CapitalDepositAddressListEndpointSchema,
    }),
    config
  );
}

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

export const getSapiV1DciProductAccountsEndpointSchema = {
  path: '/sapi/v1/dci/product/accounts',
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
            totalAmountInBTC: z.string(),
            totalAmountInUSDT: z.string(),
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

export type GetSapiV1DciProductAccountsPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1DciProductAccountsResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          totalAmountInBTC: string;
          totalAmountInUSDT: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1DciProductAccountsRequestResult = RequestResult<
  Request,
  GetSapiV1DciProductAccountsResponse
>;

export function getSapiV1DciProductAccounts(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1DciProductAccountsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1DciProductAccountsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1DciProductAccountsEndpointSchema,
    }),
    config
  );
}

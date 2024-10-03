import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1CapitalWithdrawAddressListEndpointSchema = {
  path: '/sapi/v1/capital/withdraw/address/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              address: z.string(),
              addressTag: z.string(),
              coin: z.string(),
              name: z.string(),
              network: z.string(),
              origin: z.string(),
              originType: z.string(),
              whiteStatus: z.boolean(),
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

export type GetSapiV1CapitalWithdrawAddressListRequest = Request;

export type GetSapiV1CapitalWithdrawAddressListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          address: string;
          addressTag: string;
          coin: string;
          name: string;
          network: string;
          origin: string;
          originType: string;
          whiteStatus: boolean;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalWithdrawAddressListRequestResult = RequestResult<
  GetSapiV1CapitalWithdrawAddressListRequest,
  GetSapiV1CapitalWithdrawAddressListResponse
>;

export function getSapiV1CapitalWithdrawAddressList(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalWithdrawAddressListRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1CapitalWithdrawAddressListEndpointSchema),
    config
  );
}

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

export const getSapiV1MarginExchangeSmallLiabilityEndpointSchema = {
  path: '/sapi/v1/margin/exchange-small-liability',
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
          zodSchema: z.array(
            z.object({
              asset: z.string(),
              interest: z.string(),
              principal: z.string(),
              liabilityAsset: z.string(),
              liabilityQty: z.number().safe().finite(),
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

export type GetSapiV1MarginExchangeSmallLiabilityPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginExchangeSmallLiabilityResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          interest: string;
          principal: string;
          liabilityAsset: string;
          liabilityQty: number;
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginExchangeSmallLiabilityRequestResult = RequestResult<
  Request,
  GetSapiV1MarginExchangeSmallLiabilityResponse
>;

export function getSapiV1MarginExchangeSmallLiability(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginExchangeSmallLiabilityPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginExchangeSmallLiabilityRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginExchangeSmallLiabilityEndpointSchema,
    }),
    config
  );
}

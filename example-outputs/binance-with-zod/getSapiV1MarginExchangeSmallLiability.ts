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

export type GetSapiV1MarginExchangeSmallLiabilityRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginExchangeSmallLiabilityResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginExchangeSmallLiabilityRequestResult = RequestResult<
  GetSapiV1MarginExchangeSmallLiabilityRequest,
  GetSapiV1MarginExchangeSmallLiabilityResponse
>;

export function getSapiV1MarginExchangeSmallLiability(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginExchangeSmallLiabilityRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginExchangeSmallLiabilityRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginExchangeSmallLiabilityEndpointSchema, payload),
    config
  );
}

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

export const getSapiV1MiningPubCoinlistEndpointSchema = {
  path: '/sapi/v1/mining/pub/coinList',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            code: z.number().int().safe().finite(),
            msg: z.string(),
            data: z.array(
              z.object({
                coinName: z.string(),
                coinId: z.number().int().safe().finite(),
                poolIndex: z.number().int().safe().finite(),
                algoId: z.number().int().safe().finite(),
                algoName: z.string(),
              })
            ),
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
  },
};

export type GetSapiV1MiningPubCoinlistRequest = Request;

export type GetSapiV1MiningPubCoinlistResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            coinName: string;
            coinId: number; // int
            poolIndex: number; // int
            algoId: number; // int
            algoName: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningPubCoinlistRequestResult = RequestResult<
  GetSapiV1MiningPubCoinlistRequest,
  GetSapiV1MiningPubCoinlistResponse
>;

export function getSapiV1MiningPubCoinlist(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningPubCoinlistRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MiningPubCoinlistEndpointSchema),
    config
  );
}

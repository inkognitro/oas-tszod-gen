import {z_Error, Error} from '@example-outputs/binance-with-zod';
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

export const getSapiV1MiningPubAlgolistEndpointSchema = {
  path: '/sapi/v1/mining/pub/algoList',
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
                algoName: z.string(),
                algoId: z.number().int().safe().finite(),
                poolIndex: z.number().int().safe().finite(),
                unit: z.string(),
              })
            ),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetSapiV1MiningPubAlgolistRequest = Request;

export type GetSapiV1MiningPubAlgolistResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            algoName: string;
            algoId: number; // int
            poolIndex: number; // int
            unit: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningPubAlgolistRequestResult = RequestResult<
  GetSapiV1MiningPubAlgolistRequest,
  GetSapiV1MiningPubAlgolistResponse
>;

export function getSapiV1MiningPubAlgolist(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningPubAlgolistRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MiningPubAlgolistEndpointSchema),
    config
  );
}

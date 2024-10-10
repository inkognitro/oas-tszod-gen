import {z_Error, Error} from '../../../../';
import {z} from 'zod';
import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '../../../../core';

export const getCoinListEndpointSchema = {
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
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetCoinListRequest = Request;

export type GetCoinListResponse =
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

export type GetCoinListRequestResult = RequestResult<
  GetCoinListRequest,
  GetCoinListResponse
>;

export function getCoinList(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetCoinListRequestResult> {
  return requestHandler.execute(
    createRequest(getCoinListEndpointSchema),
    config
  );
}

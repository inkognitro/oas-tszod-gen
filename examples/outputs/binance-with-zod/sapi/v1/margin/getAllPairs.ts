import {z_Error, Error} from '../../../';
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
} from '../../../core';

export const getAllPairsEndpointSchema = {
  path: '/sapi/v1/margin/allPairs',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              base: z.string(),
              id: z.number().int().safe().finite(),
              isBuyAllowed: z.boolean(),
              isMarginTrade: z.boolean(),
              isSellAllowed: z.boolean(),
              quote: z.string(),
              symbol: z.string(),
            })
          ),
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

export type GetAllPairsRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
  }
>;

export type GetAllPairsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          base: string;
          id: number; // int
          isBuyAllowed: boolean;
          isMarginTrade: boolean;
          isSellAllowed: boolean;
          quote: string;
          symbol: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetAllPairsRequestResult = RequestResult<
  GetAllPairsRequest,
  GetAllPairsResponse
>;

export function getAllPairs(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAllPairsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAllPairsRequestResult> {
  return requestHandler.execute(
    createRequest(getAllPairsEndpointSchema, payload),
    config
  );
}

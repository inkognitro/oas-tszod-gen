import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../core';
import {Error} from '../../../../';

export const getAllPairsEndpointSchema = {
  path: '/sapi/v1/margin/isolated/allPairs',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetAllPairsRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAllPairsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          symbol: string;
          base: string;
          quote: string;
          isMarginTrade: boolean;
          isBuyAllowed: boolean;
          isSellAllowed: boolean;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

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

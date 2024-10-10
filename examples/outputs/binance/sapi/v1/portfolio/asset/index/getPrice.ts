import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../../core';
import {Error} from '../../../../../';

export const getPriceEndpointSchema = {
  path: '/sapi/v1/portfolio/asset-index-price',
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
  },
};

export type GetPriceRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
  }
>;

export type GetPriceResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          assetIndexPrice: string;
          time: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetPriceRequestResult = RequestResult<
  GetPriceRequest,
  GetPriceResponse
>;

export function getPrice(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetPriceRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetPriceRequestResult> {
  return requestHandler.execute(
    createRequest(getPriceEndpointSchema, payload),
    config
  );
}

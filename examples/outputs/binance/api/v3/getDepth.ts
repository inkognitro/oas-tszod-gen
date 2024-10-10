import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../core';
import {Error} from '../../';

export const getDepthEndpointSchema = {
  path: '/api/v3/depth',
  method: 'get',
  supportedSecuritySchemas: [],
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

export type GetDepthRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    limit?: number; // int
  }
>;

export type GetDepthResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          lastUpdateId: number; // int
          bids: string[][];
          asks: string[][];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetDepthRequestResult = RequestResult<
  GetDepthRequest,
  GetDepthResponse
>;

export function getDepth(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetDepthRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetDepthRequestResult> {
  return requestHandler.execute(
    createRequest(getDepthEndpointSchema, payload),
    config
  );
}

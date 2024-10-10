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
import {Error} from '../../../';

export const getHistDataLinkEndpointSchema = {
  path: '/sapi/v1/futures/histDataLink',
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

export type GetHistDataLinkRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    dataType: 'T_DEPTH' | 'S_DEPTH';
    startTime?: number; // int
    endTime?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetHistDataLinkResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: {
            day: string;
            url: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetHistDataLinkRequestResult = RequestResult<
  GetHistDataLinkRequest,
  GetHistDataLinkResponse
>;

export function getHistDataLink(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetHistDataLinkRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetHistDataLinkRequestResult> {
  return requestHandler.execute(
    createRequest(getHistDataLinkEndpointSchema, payload),
    config
  );
}

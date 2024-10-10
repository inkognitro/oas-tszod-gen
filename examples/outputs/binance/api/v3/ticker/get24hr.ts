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
import {Ticker, TickerList, Error} from '../../../';

export const get24hrEndpointSchema = {
  path: '/api/v3/ticker/24hr',
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

export type Get24hrRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    symbols?: string;
    type?: 'FULL' | 'MINI';
  }
>;

export type Get24hrResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Ticker | TickerList>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type Get24hrRequestResult = RequestResult<
  Get24hrRequest,
  Get24hrResponse
>;

export function get24hr(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<Get24hrRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<Get24hrRequestResult> {
  return requestHandler.execute(
    createRequest(get24hrEndpointSchema, payload),
    config
  );
}

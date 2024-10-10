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
import {Trade, Error} from '../../';

export const getTradesEndpointSchema = {
  path: '/api/v3/trades',
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

export type GetTradesRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    limit?: number; // int
  }
>;

export type GetTradesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Trade[]>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetTradesRequestResult = RequestResult<
  GetTradesRequest,
  GetTradesResponse
>;

export function getTrades(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetTradesRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetTradesRequestResult> {
  return requestHandler.execute(
    createRequest(getTradesEndpointSchema, payload),
    config
  );
}

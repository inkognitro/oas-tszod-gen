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

export const getStatusEndpointSchema = {
  path: '/sapi/v1/mining/statistics/user/status',
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

export type GetStatusRequest = RequestUnion<
  any,
  any,
  {
    algo: string;
    userName: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetStatusResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            fifteenMinHashRate: string;
            dayHashRate: string;
            validNum: number; // int
            invalidNum: number; // int
            profitToday: {
              BTC: string;
              BSV: string;
              BCH: string;
            };
            profitYesterday: {
              BTC: string;
              BSV: string;
              BCH: string;
            };
            userName: string;
            unit: string;
            algo: string;
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetStatusRequestResult = RequestResult<
  GetStatusRequest,
  GetStatusResponse
>;

export function getStatus(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetStatusRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetStatusRequestResult> {
  return requestHandler.execute(
    createRequest(getStatusEndpointSchema, payload),
    config
  );
}

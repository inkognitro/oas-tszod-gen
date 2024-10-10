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

export const getSubHisrecEndpointSchema = {
  path: '/sapi/v1/capital/deposit/subHisrec',
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

export type GetSubHisrecRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    coin?: string;
    status?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    offset?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSubHisrecResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          amount: string;
          coin: string;
          network: string;
          status: number; // int
          address: string;
          addressTag: string;
          txId: string;
          insertTime: number; // int
          transferType: number; // int
          confirmTimes: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSubHisrecRequestResult = RequestResult<
  GetSubHisrecRequest,
  GetSubHisrecResponse
>;

export function getSubHisrec(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSubHisrecRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSubHisrecRequestResult> {
  return requestHandler.execute(
    createRequest(getSubHisrecEndpointSchema, payload),
    config
  );
}

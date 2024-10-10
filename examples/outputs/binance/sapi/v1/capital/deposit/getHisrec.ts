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

export const getHisrecEndpointSchema = {
  path: '/sapi/v1/capital/deposit/hisrec',
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

export type GetHisrecRequest = RequestUnion<
  any,
  any,
  {
    coin?: string;
    status?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    offset?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetHisrecResponse =
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
          unlockConfirm: string;
          confirmTimes: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetHisrecRequestResult = RequestResult<
  GetHisrecRequest,
  GetHisrecResponse
>;

export function getHisrec(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetHisrecRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetHisrecRequestResult> {
  return requestHandler.execute(
    createRequest(getHisrecEndpointSchema, payload),
    config
  );
}

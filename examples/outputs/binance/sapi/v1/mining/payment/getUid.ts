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

export const getUidEndpointSchema = {
  path: '/sapi/v1/mining/payment/uid',
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

export type GetUidRequest = RequestUnion<
  any,
  any,
  {
    algo: string;
    startDate?: string;
    endDate?: string;
    pageIndex?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetUidResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            accountProfits: {
              time: number; // int
              coinName: string;
              type: number; // int
              puid: number; // int
              subName: string;
              amount: number;
            }[];
            totalNum: number; // int
            pageSize: number; // int
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetUidRequestResult = RequestResult<GetUidRequest, GetUidResponse>;

export function getUid(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetUidRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetUidRequestResult> {
  return requestHandler.execute(
    createRequest(getUidEndpointSchema, payload),
    config
  );
}

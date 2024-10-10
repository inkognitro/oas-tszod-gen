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

export const getDetailEndpointSchema = {
  path: '/sapi/v1/mining/worker/detail',
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

export type GetDetailRequest = RequestUnion<
  any,
  any,
  {
    algo: string;
    userName: string;
    workerName: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetDetailResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            workerName: string;
            type: string;
            hashrateDatas: {
              time: number; // int
              hashrate: string;
              reject: number; // int
            }[];
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetDetailRequestResult = RequestResult<
  GetDetailRequest,
  GetDetailResponse
>;

export function getDetail(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetDetailRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetDetailRequestResult> {
  return requestHandler.execute(
    createRequest(getDetailEndpointSchema, payload),
    config
  );
}

import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../../../core';
import {Error} from '../../../../../../';

export const getDetailsEndpointSchema = {
  path: '/sapi/v1/mining/hash-transfer/profit/details',
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

export type GetDetailsRequest = RequestUnion<
  any,
  any,
  {
    configId: string;
    userName: string;
    pageIndex?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetDetailsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            profitTransferDetails: {
              poolUsername: string;
              toPoolUsername: string;
              algoName: string;
              hashRate: number; // int
              day: number; // int
              amount: number;
              coinName: string;
            }[];
            totalNum: number; // int
            pageSize: number; // int
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetDetailsRequestResult = RequestResult<
  GetDetailsRequest,
  GetDetailsResponse
>;

export function getDetails(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetDetailsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetDetailsRequestResult> {
  return requestHandler.execute(
    createRequest(getDetailsEndpointSchema, payload),
    config
  );
}

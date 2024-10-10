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

export const getHistoryEndpointSchema = {
  path: '/sapi/v1/portfolio/interest-history',
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

export type GetHistoryRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
    startTime?: number; // int
    endTime?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          interest: string;
          interestAccruedTime: number; // int
          interestRate: string;
          principal: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetHistoryRequestResult = RequestResult<
  GetHistoryRequest,
  GetHistoryResponse
>;

export function getHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetHistoryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getHistoryEndpointSchema, payload),
    config
  );
}

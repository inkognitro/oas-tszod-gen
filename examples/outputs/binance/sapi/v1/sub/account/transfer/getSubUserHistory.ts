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

export const getSubUserHistoryEndpointSchema = {
  path: '/sapi/v1/sub-account/transfer/subUserHistory',
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

export type GetSubUserHistoryRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    type?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSubUserHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          counterParty: string;
          email: string;
          type: number; // int
          asset: string;
          qty: string;
          fromAccountType: string;
          toAccountType: string;
          status: string;
          tranId: number; // int
          time: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSubUserHistoryRequestResult = RequestResult<
  GetSubUserHistoryRequest,
  GetSubUserHistoryResponse
>;

export function getSubUserHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSubUserHistoryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSubUserHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getSubUserHistoryEndpointSchema, payload),
    config
  );
}

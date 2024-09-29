import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1MarginInteresthistoryEndpointSchema = {
  path: '/sapi/v1/margin/interestHistory',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1MarginInteresthistoryPayload = {
  queryParams: {
    asset?: string;
    isolatedSymbol?: string;
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    archived?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginInteresthistoryResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            isolatedSymbol: string;
            asset: string;
            interest: string;
            interestAccuredTime: number; // int
            interestRate: string;
            principal: string;
            type: string;
          }[];
          total: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginInteresthistoryRequestResult = RequestResult<
  Request,
  GetSapiV1MarginInteresthistoryResponse
>;

export function getSapiV1MarginInteresthistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginInteresthistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginInteresthistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginInteresthistoryEndpointSchema,
    }),
    config
  );
}

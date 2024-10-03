import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getSapiV1MarginInteresthistoryEndpointSchema = {
  path: '/sapi/v1/margin/interestHistory',
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

export type GetSapiV1MarginInteresthistoryRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type GetSapiV1MarginInteresthistoryResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginInteresthistoryRequestResult = RequestResult<
  GetSapiV1MarginInteresthistoryRequest,
  GetSapiV1MarginInteresthistoryResponse
>;

export function getSapiV1MarginInteresthistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginInteresthistoryRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginInteresthistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginInteresthistoryEndpointSchema, payload),
    config
  );
}

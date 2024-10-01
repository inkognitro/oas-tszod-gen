import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1RebateTaxqueryEndpointSchema = {
  path: '/sapi/v1/rebate/taxQuery',
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

export type GetSapiV1RebateTaxqueryPayload = {
  queryParams: {
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1RebateTaxqueryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          status: string;
          type: string;
          code: string;
          data: {
            page: number; // int
            totalRecords: number; // int
            totalPageNum: number; // int
            data: {
              asset: string;
              type: number; // int
              amount: string;
              updateTime: number; // int
            }[];
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1RebateTaxqueryRequestResult = RequestResult<
  Request,
  GetSapiV1RebateTaxqueryResponse
>;

export function getSapiV1RebateTaxquery(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1RebateTaxqueryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1RebateTaxqueryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1RebateTaxqueryEndpointSchema,
    }),
    config
  );
}

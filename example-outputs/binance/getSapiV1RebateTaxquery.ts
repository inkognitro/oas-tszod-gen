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

export type GetSapiV1RebateTaxqueryRequest = RequestUnion<
  any,
  any,
  {
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

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
  GetSapiV1RebateTaxqueryRequest,
  GetSapiV1RebateTaxqueryResponse
>;

export function getSapiV1RebateTaxquery(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1RebateTaxqueryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1RebateTaxqueryRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1RebateTaxqueryEndpointSchema, payload),
    config
  );
}

import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../core';
import {Error} from '../../../';

export const getTaxQueryEndpointSchema = {
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

export type GetTaxQueryRequest = RequestUnion<
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

export type GetTaxQueryResponse =
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

export type GetTaxQueryRequestResult = RequestResult<
  GetTaxQueryRequest,
  GetTaxQueryResponse
>;

export function getTaxQuery(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetTaxQueryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxQueryRequestResult> {
  return requestHandler.execute(
    createRequest(getTaxQueryEndpointSchema, payload),
    config
  );
}

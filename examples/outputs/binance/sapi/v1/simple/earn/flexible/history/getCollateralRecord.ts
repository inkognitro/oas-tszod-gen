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

export const getCollateralRecordEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/history/collateralRecord',
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

export type GetCollateralRecordRequest = RequestUnion<
  any,
  any,
  {
    productId?: string;
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetCollateralRecordResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            amount: string;
            productId: string;
            asset: string;
            createTime: number; // int
            type: string;
            productName: string;
            orderId: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetCollateralRecordRequestResult = RequestResult<
  GetCollateralRecordRequest,
  GetCollateralRecordResponse
>;

export function getCollateralRecord(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetCollateralRecordRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetCollateralRecordRequestResult> {
  return requestHandler.execute(
    createRequest(getCollateralRecordEndpointSchema, payload),
    config
  );
}

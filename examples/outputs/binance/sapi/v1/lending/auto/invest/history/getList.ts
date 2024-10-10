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

export const getListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/history/list',
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

export type GetListRequest = RequestUnion<
  any,
  any,
  {
    planId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    targetAsset?: number;
    planType?: 'SINGLE' | 'PORTFOLIO' | 'INDEX' | 'ALL';
    size?: number; // int
    current?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          id: number; // int
          targetAsset: string;
          planType: string;
          planName: string;
          planId: number; // int
          transactionDateTime: number; // int
          transactionStatus: string;
          failedType: string;
          sourceAsset: string;
          sourceAssetAmount: string;
          targetAssetAmount: string;
          sourceWallet: string;
          flexibleUsed: string;
          transactionFee: string;
          transactionFeeUnit: string;
          executionPrice: string;
          executionType: string;
          subscriptionCycle: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetListRequestResult = RequestResult<
  GetListRequest,
  GetListResponse
>;

export function getList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetListRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetListRequestResult> {
  return requestHandler.execute(
    createRequest(getListEndpointSchema, payload),
    config
  );
}

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

export const getApiV3MyallocationsEndpointSchema = {
  path: '/api/v3/myAllocations',
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

export type GetApiV3MyallocationsRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    startTime?: number; // int
    endTime?: number; // int
    fromAllocationId?: number; // int
    limit?: number; // int
    orderId?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetApiV3MyallocationsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          symbol: string;
          allocationId: number; // int
          allocationType: string;
          orderId: number; // int
          orderListId: number; // int
          price: string;
          qty: string;
          quoteQty: string;
          commission: string;
          commissionAsset: string;
          time: number; // int
          isBuyer: boolean;
          isMaker: boolean;
          isAllocator: boolean;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3MyallocationsRequestResult = RequestResult<
  GetApiV3MyallocationsRequest,
  GetApiV3MyallocationsResponse
>;

export function getApiV3Myallocations(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3MyallocationsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3MyallocationsRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3MyallocationsEndpointSchema, payload),
    config
  );
}

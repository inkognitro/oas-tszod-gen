import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getApiV3MyallocationsEndpointSchema = {
  path: '/api/v3/myAllocations',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    fromAllocationId: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
    orderId: z.number().int().safe().finite().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              symbol: z.string(),
              allocationId: z.number().int().safe().finite(),
              allocationType: z.string(),
              orderId: z.number().int().safe().finite(),
              orderListId: z.number().int().safe().finite(),
              price: z.string(),
              qty: z.string(),
              quoteQty: z.string(),
              commission: z.string(),
              commissionAsset: z.string(),
              time: z.number().int().safe().finite(),
              isBuyer: z.boolean(),
              isMaker: z.boolean(),
              isAllocator: z.boolean(),
            })
          ),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type GetApiV3MyallocationsPayload = {
  queryParams: {
    symbol: string;
    startTime?: number; // int
    endTime?: number; // int
    fromAllocationId?: number; // int
    limit?: number; // int
    orderId?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetApiV3MyallocationsResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3MyallocationsRequestResult = RequestResult<
  Request,
  GetApiV3MyallocationsResponse
>;

export function getApiV3Myallocations(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3MyallocationsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3MyallocationsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3MyallocationsEndpointSchema,
    }),
    config
  );
}

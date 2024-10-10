import {z_Error, Error} from '../../../';
import {z} from 'zod';
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

export const getTradeFlowEndpointSchema = {
  path: '/sapi/v1/convert/tradeFlow',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    startTime: z.number().int().safe().finite(),
    endTime: z.number().int().safe().finite(),
    limit: z.number().int().safe().finite().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            list: z.array(
              z.object({
                quoteId: z.string(),
                orderId: z.number().int().safe().finite(),
                orderStatus: z.string(),
                fromAsset: z.string(),
                fromAmount: z.string(),
                toAsset: z.string(),
                toAmount: z.string(),
                ratio: z.string(),
                inverseRatio: z.string(),
                createTime: z.number().int().safe().finite(),
              })
            ),
            startTime: z.number().int().safe().finite(),
            endTime: z.number().int().safe().finite(),
            limit: z.number().int().safe().finite(),
            moreData: z.boolean(),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetTradeFlowRequest = RequestUnion<
  any,
  any,
  {
    startTime: number; // int
    endTime: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetTradeFlowResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          list: {
            quoteId: string;
            orderId: number; // int
            orderStatus: string;
            fromAsset: string;
            fromAmount: string;
            toAsset: string;
            toAmount: string;
            ratio: string;
            inverseRatio: string;
            createTime: number; // int
          }[];
          startTime: number; // int
          endTime: number; // int
          limit: number; // int
          moreData: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetTradeFlowRequestResult = RequestResult<
  GetTradeFlowRequest,
  GetTradeFlowResponse
>;

export function getTradeFlow(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetTradeFlowRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetTradeFlowRequestResult> {
  return requestHandler.execute(
    createRequest(getTradeFlowEndpointSchema, payload),
    config
  );
}

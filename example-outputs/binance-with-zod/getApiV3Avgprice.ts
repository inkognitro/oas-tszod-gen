import {z_Error, Error} from '@example-outputs/binance-with-zod';
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
} from '@example-outputs/binance-with-zod/core';

export const getApiV3AvgpriceEndpointSchema = {
  path: '/api/v3/avgPrice',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            mins: z.number().int().safe().finite(),
            price: z.string(),
            closeTime: z.number().int().safe().finite(),
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
  },
};

export type GetApiV3AvgpriceRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
  }
>;

export type GetApiV3AvgpriceResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          mins: number; // int
          price: string;
          closeTime: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3AvgpriceRequestResult = RequestResult<
  GetApiV3AvgpriceRequest,
  GetApiV3AvgpriceResponse
>;

export function getApiV3Avgprice(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3AvgpriceRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3AvgpriceRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3AvgpriceEndpointSchema, payload),
    config
  );
}

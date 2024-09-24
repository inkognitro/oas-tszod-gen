import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
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
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type GetApiV3AvgpricePayload = {
  queryParams: {
    symbol: string;
  };
};

export type GetApiV3AvgpriceResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            mins: number; // int
            price: string;
            closeTime: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3AvgpriceRequestResult = RequestResult<
  Request,
  GetApiV3AvgpriceResponse
>;

export function getApiV3Avgprice(
  requestHandler: RequestHandler,
  payload: GetApiV3AvgpricePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3AvgpriceRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getApiV3AvgpriceEndpointSchema}),
    config
  );
}

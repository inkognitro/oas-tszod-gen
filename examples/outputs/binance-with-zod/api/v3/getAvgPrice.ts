import {z_Error, Error} from '../../';
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
} from '../../core';

export const getAvgPriceEndpointSchema = {
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

export type GetAvgPriceRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
  }
>;

export type GetAvgPriceResponse =
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

export type GetAvgPriceRequestResult = RequestResult<
  GetAvgPriceRequest,
  GetAvgPriceResponse
>;

export function getAvgPrice(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAvgPriceRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAvgPriceRequestResult> {
  return requestHandler.execute(
    createRequest(getAvgPriceEndpointSchema, payload),
    config
  );
}

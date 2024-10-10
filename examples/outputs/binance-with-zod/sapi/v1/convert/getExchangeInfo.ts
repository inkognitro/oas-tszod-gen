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

export const getExchangeInfoEndpointSchema = {
  path: '/sapi/v1/convert/exchangeInfo',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    fromAsset: z.string().optional(),
    toAsset: z.string().optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              fromAsset: z.string(),
              toAsset: z.string(),
              fromAssetMinAmount: z.string(),
              fromAssetMaxAmount: z.string(),
              toAssetMinAmount: z.string(),
              toAssetMaxAmount: z.string(),
            })
          ),
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

export type GetExchangeInfoRequest = RequestUnion<
  any,
  any,
  {
    fromAsset?: string;
    toAsset?: string;
  }
>;

export type GetExchangeInfoResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          fromAsset: string;
          toAsset: string;
          fromAssetMinAmount: string;
          fromAssetMaxAmount: string;
          toAssetMinAmount: string;
          toAssetMaxAmount: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetExchangeInfoRequestResult = RequestResult<
  GetExchangeInfoRequest,
  GetExchangeInfoResponse
>;

export function getExchangeInfo(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetExchangeInfoRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetExchangeInfoRequestResult> {
  return requestHandler.execute(
    createRequest(getExchangeInfoEndpointSchema, payload),
    config
  );
}

import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const postSapiV1PortfolioRepayEndpointSchema = {
  path: '/sapi/v1/portfolio/repay',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    from: z.string().optional(),
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
            tranId: z.number().int().safe().finite(),
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
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type PostSapiV1PortfolioRepayRequest = RequestUnion<
  any,
  any,
  {
    from?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1PortfolioRepayResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1PortfolioRepayRequestResult = RequestResult<
  PostSapiV1PortfolioRepayRequest,
  PostSapiV1PortfolioRepayResponse
>;

export function postSapiV1PortfolioRepay(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1PortfolioRepayRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1PortfolioRepayRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1PortfolioRepayEndpointSchema, payload),
    config
  );
}

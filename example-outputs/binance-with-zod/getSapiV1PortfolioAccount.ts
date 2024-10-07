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

export const getSapiV1PortfolioAccountEndpointSchema = {
  path: '/sapi/v1/portfolio/account',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
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
            uniMMR: z.string(),
            accountEquity: z.string(),
            actualEquity: z.string(),
            accountMaintMargin: z.string(),
            accountStatus: z.string(),
            accountType: z.string(),
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

export type GetSapiV1PortfolioAccountRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1PortfolioAccountResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          uniMMR: string;
          accountEquity: string;
          actualEquity: string;
          accountMaintMargin: string;
          accountStatus: string;
          accountType: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1PortfolioAccountRequestResult = RequestResult<
  GetSapiV1PortfolioAccountRequest,
  GetSapiV1PortfolioAccountResponse
>;

export function getSapiV1PortfolioAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1PortfolioAccountRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PortfolioAccountRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1PortfolioAccountEndpointSchema, payload),
    config
  );
}

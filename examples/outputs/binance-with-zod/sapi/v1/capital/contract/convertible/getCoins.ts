import {z_Error, Error} from '../../../../../';
import {z} from 'zod';
import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '../../../../../core';

export const getCoinsEndpointSchema = {
  path: '/sapi/v1/capital/contract/convertible-coins',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            convertEnabled: z.boolean(),
            coins: z.array(z.string()),
            exchangeRates: z.object({
              USDC: z.string(),
              TUSD: z.string(),
              USDP: z.string(),
            }),
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

export type GetCoinsRequest = Request;

export type GetCoinsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          convertEnabled: boolean;
          coins: string[];
          exchangeRates: {
            USDC: string;
            TUSD: string;
            USDP: string;
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetCoinsRequestResult = RequestResult<
  GetCoinsRequest,
  GetCoinsResponse
>;

export function getCoins(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetCoinsRequestResult> {
  return requestHandler.execute(createRequest(getCoinsEndpointSchema), config);
}

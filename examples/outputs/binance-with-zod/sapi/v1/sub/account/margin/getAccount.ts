import {z_Error, Error} from '../../../../../';
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
} from '../../../../../core';

export const getAccountEndpointSchema = {
  path: '/sapi/v1/sub-account/margin/account',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
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
            email: z.string(),
            marginLevel: z.string(),
            totalAssetOfBtc: z.string(),
            totalLiabilityOfBtc: z.string(),
            totalNetAssetOfBtc: z.string(),
            marginTradeCoeffVo: z.object({
              forceLiquidationBar: z.string(),
              marginCallBar: z.string(),
              normalBar: z.string(),
            }),
            marginUserAssetVoList: z.array(
              z.object({
                asset: z.string(),
                borrowed: z.string(),
                free: z.string(),
                interest: z.string(),
                locked: z.string(),
                netAsset: z.string(),
              })
            ),
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

export type GetAccountRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAccountResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          email: string;
          marginLevel: string;
          totalAssetOfBtc: string;
          totalLiabilityOfBtc: string;
          totalNetAssetOfBtc: string;
          marginTradeCoeffVo: {
            forceLiquidationBar: string;
            marginCallBar: string;
            normalBar: string;
          };
          marginUserAssetVoList: {
            asset: string;
            borrowed: string;
            free: string;
            interest: string;
            locked: string;
            netAsset: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetAccountRequestResult = RequestResult<
  GetAccountRequest,
  GetAccountResponse
>;

export function getAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAccountRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountEndpointSchema, payload),
    config
  );
}

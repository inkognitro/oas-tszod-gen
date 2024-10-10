import {z_Error, Error} from '../../../../';
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
} from '../../../../core';

export const getWithdrawEndpointSchema = {
  path: '/sapi/v1/nft/history/withdraw',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
    page: z.number().int().safe().finite().optional(),
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
            total: z.number().int().safe().finite(),
            list: z.array(
              z.object({
                network: z.string(),
                txID: z.string(),
                contractAdrress: z.string(),
                tokenId: z.string(),
                timestamp: z.number().int().safe().finite(),
                fee: z.number().safe().finite(),
                feeAsset: z.string(),
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

export type GetWithdrawRequest = RequestUnion<
  any,
  any,
  {
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    page?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetWithdrawResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          list: {
            network: string;
            txID: string;
            contractAdrress: string;
            tokenId: string;
            timestamp: number; // int
            fee: number;
            feeAsset: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetWithdrawRequestResult = RequestResult<
  GetWithdrawRequest,
  GetWithdrawResponse
>;

export function getWithdraw(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetWithdrawRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetWithdrawRequestResult> {
  return requestHandler.execute(
    createRequest(getWithdrawEndpointSchema, payload),
    config
  );
}

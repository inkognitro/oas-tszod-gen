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

export const postDustEndpointSchema = {
  path: '/sapi/v1/asset/dust',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.array(z.string()),
    accountType: z.enum(['SPOT', 'MARGIN']).optional(),
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
            totalServiceCharge: z.string(),
            totalTransfered: z.string(),
            transferResult: z.array(
              z.object({
                amount: z.string(),
                fromAsset: z.string(),
                operateTime: z.number().int().safe().finite(),
                serviceChargeAmount: z.string(),
                tranId: z.number().int().safe().finite(),
                transferedAmount: z.string(),
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

export type PostDustRequest = RequestUnion<
  any,
  any,
  {
    asset: string[];
    accountType?: 'SPOT' | 'MARGIN';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostDustResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          totalServiceCharge: string;
          totalTransfered: string;
          transferResult: {
            amount: string;
            fromAsset: string;
            operateTime: number; // int
            serviceChargeAmount: string;
            tranId: number; // int
            transferedAmount: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostDustRequestResult = RequestResult<
  PostDustRequest,
  PostDustResponse
>;

export function postDust(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostDustRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostDustRequestResult> {
  return requestHandler.execute(
    createRequest(postDustEndpointSchema, payload),
    config
  );
}

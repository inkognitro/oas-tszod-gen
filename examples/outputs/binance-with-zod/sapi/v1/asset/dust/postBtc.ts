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

export const postBtcEndpointSchema = {
  path: '/sapi/v1/asset/dust-btc',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
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
            details: z.array(
              z.object({
                asset: z.string(),
                assetFullName: z.string(),
                amountFree: z.string(),
                toBTC: z.string(),
                toBNB: z.string(),
                toBNBOffExchange: z.string(),
                exchange: z.string(),
              })
            ),
            totalTransferBtc: z.string(),
            totalTransferBNB: z.string(),
            dribbletPercentage: z.string(),
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

export type PostBtcRequest = RequestUnion<
  any,
  any,
  {
    accountType?: 'SPOT' | 'MARGIN';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostBtcResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          details: {
            asset: string;
            assetFullName: string;
            amountFree: string;
            toBTC: string;
            toBNB: string;
            toBNBOffExchange: string;
            exchange: string;
          }[];
          totalTransferBtc: string;
          totalTransferBNB: string;
          dribbletPercentage: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostBtcRequestResult = RequestResult<
  PostBtcRequest,
  PostBtcResponse
>;

export function postBtc(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostBtcRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostBtcRequestResult> {
  return requestHandler.execute(
    createRequest(postBtcEndpointSchema, payload),
    config
  );
}

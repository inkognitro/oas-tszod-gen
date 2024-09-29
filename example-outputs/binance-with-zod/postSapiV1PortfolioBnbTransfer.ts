import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1PortfolioBnbTransferEndpointSchema = {
  path: '/sapi/v1/portfolio/bnb-transfer',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    transferSide: z.enum(['TO_UM', 'FROM_UM']),
    amount: z.number().safe().finite(),
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

export type PostSapiV1PortfolioBnbTransferPayload = {
  queryParams: {
    transferSide: 'TO_UM' | 'FROM_UM';
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1PortfolioBnbTransferResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1PortfolioBnbTransferRequestResult = RequestResult<
  Request,
  PostSapiV1PortfolioBnbTransferResponse
>;

export function postSapiV1PortfolioBnbTransfer(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1PortfolioBnbTransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1PortfolioBnbTransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1PortfolioBnbTransferEndpointSchema,
    }),
    config
  );
}

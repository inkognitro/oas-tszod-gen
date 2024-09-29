import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1PortfolioBnbTransferEndpointSchema = {
  path: '/sapi/v1/portfolio/bnb-transfer',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {},
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

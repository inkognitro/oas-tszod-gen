import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postSapiV1PortfolioBnbTransferEndpointSchema = {
  path: '/sapi/v1/portfolio/bnb-transfer',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type PostSapiV1PortfolioBnbTransferRequest = RequestUnion<
  any,
  any,
  {
    transferSide: 'TO_UM' | 'FROM_UM';
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1PortfolioBnbTransferResponse =
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

export type PostSapiV1PortfolioBnbTransferRequestResult = RequestResult<
  PostSapiV1PortfolioBnbTransferRequest,
  PostSapiV1PortfolioBnbTransferResponse
>;

export function postSapiV1PortfolioBnbTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1PortfolioBnbTransferRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1PortfolioBnbTransferRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1PortfolioBnbTransferEndpointSchema, payload),
    config
  );
}

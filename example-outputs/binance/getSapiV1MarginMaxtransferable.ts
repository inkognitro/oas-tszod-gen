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

export const getSapiV1MarginMaxtransferableEndpointSchema = {
  path: '/sapi/v1/margin/maxTransferable',
  method: 'get',
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

export type GetSapiV1MarginMaxtransferablePayload = {
  queryParams: {
    asset: string;
    isolatedSymbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginMaxtransferableResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          amount: string;
          borrowLimit: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginMaxtransferableRequestResult = RequestResult<
  Request,
  GetSapiV1MarginMaxtransferableResponse
>;

export function getSapiV1MarginMaxtransferable(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginMaxtransferablePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginMaxtransferableRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginMaxtransferableEndpointSchema,
    }),
    config
  );
}

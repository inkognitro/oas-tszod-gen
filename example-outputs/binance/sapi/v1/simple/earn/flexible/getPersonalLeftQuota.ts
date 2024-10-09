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

export const getPersonalLeftQuotaEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/personalLeftQuota',
  method: 'get',
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

export type GetPersonalLeftQuotaRequest = RequestUnion<
  any,
  any,
  {
    productId: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetPersonalLeftQuotaResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          leftPersonalQuota: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetPersonalLeftQuotaRequestResult = RequestResult<
  GetPersonalLeftQuotaRequest,
  GetPersonalLeftQuotaResponse
>;

export function getPersonalLeftQuota(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetPersonalLeftQuotaRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetPersonalLeftQuotaRequestResult> {
  return requestHandler.execute(
    createRequest(getPersonalLeftQuotaEndpointSchema, payload),
    config
  );
}

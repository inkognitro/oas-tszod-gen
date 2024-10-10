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
import {Error} from '../../../../../';

export const getLimitEndpointSchema = {
  path: '/sapi/v1/giftcard/buyCode/token-limit',
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

export type GetLimitRequest = RequestUnion<
  any,
  any,
  {
    baseToken: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetLimitResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: {
            coin?: string;
            fromMin?: string;
            fromMax?: string;
          };
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetLimitRequestResult = RequestResult<
  GetLimitRequest,
  GetLimitResponse
>;

export function getLimit(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetLimitRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetLimitRequestResult> {
  return requestHandler.execute(
    createRequest(getLimitEndpointSchema, payload),
    config
  );
}

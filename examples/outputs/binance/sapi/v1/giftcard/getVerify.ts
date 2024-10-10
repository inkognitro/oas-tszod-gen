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
import {Error} from '../../../';

export const getVerifyEndpointSchema = {
  path: '/sapi/v1/giftcard/verify',
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

export type GetVerifyRequest = RequestUnion<
  any,
  any,
  {
    referenceNo: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetVerifyResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: {
            valid: boolean;
            token: string;
            amount: string;
          };
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetVerifyRequestResult = RequestResult<
  GetVerifyRequest,
  GetVerifyResponse
>;

export function getVerify(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetVerifyRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetVerifyRequestResult> {
  return requestHandler.execute(
    createRequest(getVerifyEndpointSchema, payload),
    config
  );
}

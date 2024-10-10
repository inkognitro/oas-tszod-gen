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

export const postSubToMasterEndpointSchema = {
  path: '/sapi/v1/sub-account/transfer/subToMaster',
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

export type PostSubToMasterRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSubToMasterResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          txnId: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSubToMasterRequestResult = RequestResult<
  PostSubToMasterRequest,
  PostSubToMasterResponse
>;

export function postSubToMaster(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSubToMasterRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSubToMasterRequestResult> {
  return requestHandler.execute(
    createRequest(postSubToMasterEndpointSchema, payload),
    config
  );
}

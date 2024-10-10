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
import {Error} from '../../../../';

export const postPurchaseEndpointSchema = {
  path: '/sapi/v1/lending/customizedFixed/purchase',
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

export type PostPurchaseRequest = RequestUnion<
  any,
  any,
  {
    projectId: string;
    lot: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostPurchaseResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          purchaseId: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostPurchaseRequestResult = RequestResult<
  PostPurchaseRequest,
  PostPurchaseResponse
>;

export function postPurchase(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostPurchaseRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostPurchaseRequestResult> {
  return requestHandler.execute(
    createRequest(postPurchaseEndpointSchema, payload),
    config
  );
}

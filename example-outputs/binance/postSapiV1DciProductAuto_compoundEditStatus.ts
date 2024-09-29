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

export const postSapiV1DciProductAuto_compoundEditStatusEndpointSchema = {
  path: '/sapi/v1/dci/product/auto_compound/edit-status',
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

export type PostSapiV1DciProductAuto_compoundEditStatusPayload = {
  queryParams: {
    positionId: number; // int
    autoCompoundPlan: 'NONE' | 'STANDARD' | 'ADVANCE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1DciProductAuto_compoundEditStatusResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          positionId: string;
          autoCompoundPlan: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1DciProductAuto_compoundEditStatusRequestResult =
  RequestResult<Request, PostSapiV1DciProductAuto_compoundEditStatusResponse>;

export function postSapiV1DciProductAuto_compoundEditStatus(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1DciProductAuto_compoundEditStatusPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1DciProductAuto_compoundEditStatusRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1DciProductAuto_compoundEditStatusEndpointSchema,
    }),
    config
  );
}

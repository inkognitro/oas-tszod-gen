import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const putSapiV1UserdatastreamEndpointSchema = {
  path: '/sapi/v1/userDataStream',
  method: 'put',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    listenKey: z.string().optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({}),
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
  },
};

export type PutSapiV1UserdatastreamPayload = {
  queryParams: {
    listenKey?: string;
  };
};

export type PutSapiV1UserdatastreamResponse =
  | Response<200, ResponseData<ResponseBodyData<'application/json', {}>>>
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PutSapiV1UserdatastreamRequestResult = RequestResult<
  Request,
  PutSapiV1UserdatastreamResponse
>;

export function putSapiV1Userdatastream(
  requestHandler: SimpleRequestHandler,
  payload: PutSapiV1UserdatastreamPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PutSapiV1UserdatastreamRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: putSapiV1UserdatastreamEndpointSchema,
    }),
    config
  );
}

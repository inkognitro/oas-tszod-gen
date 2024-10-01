import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const deleteSapiV1UserdatastreamEndpointSchema = {
  path: '/sapi/v1/userDataStream',
  method: 'delete',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type DeleteSapiV1UserdatastreamPayload = {
  queryParams: {
    listenKey?: string;
  };
};

export type DeleteSapiV1UserdatastreamResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type DeleteSapiV1UserdatastreamRequestResult = RequestResult<
  Request,
  DeleteSapiV1UserdatastreamResponse
>;

export function deleteSapiV1Userdatastream(
  requestHandler: SimpleRequestHandler,
  payload: DeleteSapiV1UserdatastreamPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1UserdatastreamRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteSapiV1UserdatastreamEndpointSchema,
    }),
    config
  );
}

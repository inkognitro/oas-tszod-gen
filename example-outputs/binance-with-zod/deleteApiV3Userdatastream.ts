import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const deleteApiV3UserdatastreamEndpointSchema = {
  path: '/api/v3/userDataStream',
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

export type DeleteApiV3UserdatastreamPayload = {
  queryParams: {
    listenKey?: string;
  };
};

export type DeleteApiV3UserdatastreamResponse =
  | Response<200, ResponseBodyData<'application/json', {}>>
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type DeleteApiV3UserdatastreamRequestResult = RequestResult<
  Request,
  DeleteApiV3UserdatastreamResponse
>;

export function deleteApiV3Userdatastream(
  requestHandler: SimpleRequestHandler,
  payload: DeleteApiV3UserdatastreamPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteApiV3UserdatastreamRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteApiV3UserdatastreamEndpointSchema,
    }),
    config
  );
}

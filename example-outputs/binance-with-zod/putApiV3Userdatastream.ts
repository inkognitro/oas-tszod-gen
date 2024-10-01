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

export const putApiV3UserdatastreamEndpointSchema = {
  path: '/api/v3/userDataStream',
  method: 'put',
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

export type PutApiV3UserdatastreamPayload = {
  queryParams: {
    listenKey?: string;
  };
};

export type PutApiV3UserdatastreamResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type PutApiV3UserdatastreamRequestResult = RequestResult<
  Request,
  PutApiV3UserdatastreamResponse
>;

export function putApiV3Userdatastream(
  requestHandler: SimpleRequestHandler,
  payload: PutApiV3UserdatastreamPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PutApiV3UserdatastreamRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: putApiV3UserdatastreamEndpointSchema,
    }),
    config
  );
}

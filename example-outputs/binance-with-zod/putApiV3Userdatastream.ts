import {z_Error, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
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
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type PutApiV3UserdatastreamRequest = RequestUnion<
  any,
  any,
  {
    listenKey?: string;
  }
>;

export type PutApiV3UserdatastreamResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type PutApiV3UserdatastreamRequestResult = RequestResult<
  PutApiV3UserdatastreamRequest,
  PutApiV3UserdatastreamResponse
>;

export function putApiV3Userdatastream(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PutApiV3UserdatastreamRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PutApiV3UserdatastreamRequestResult> {
  return requestHandler.execute(
    createRequest(putApiV3UserdatastreamEndpointSchema, payload),
    config
  );
}

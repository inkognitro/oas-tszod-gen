import {z_Balance, z_Error, Balance, Error} from './schemas';
import {z} from 'zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from './core';

export const getBalanceEndpointSchema = {
  path: '/v1/balance',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Balance,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetBalanceRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    expand?: string[];
  }
>;

export type GetBalanceResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Balance>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetBalanceRequestResult = RequestResult<
  GetBalanceRequest,
  GetBalanceResponse
>;

export function getBalance(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBalanceRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBalanceRequestResult> {
  return requestHandler.execute(
    createRequest(getBalanceEndpointSchema, payload),
    config
  );
}

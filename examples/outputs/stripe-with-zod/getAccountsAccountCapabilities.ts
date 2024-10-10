import {z_Capability, z_Error, Capability, Error} from './schemas';
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

export const getAccountsAccountCapabilitiesEndpointSchema = {
  path: '/v1/accounts/{account}/capabilities',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    account: z.string(),
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
          zodSchema: z.object({
            data: z.array(z_Capability),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string(),
          }),
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

export type GetAccountsAccountCapabilitiesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
  },
  {
    expand?: string[];
  }
>;

export type GetAccountsAccountCapabilitiesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Capability[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAccountsAccountCapabilitiesRequestResult = RequestResult<
  GetAccountsAccountCapabilitiesRequest,
  GetAccountsAccountCapabilitiesResponse
>;

export function getAccountsAccountCapabilities(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAccountsAccountCapabilitiesRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountsAccountCapabilitiesRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountsAccountCapabilitiesEndpointSchema, payload),
    config
  );
}

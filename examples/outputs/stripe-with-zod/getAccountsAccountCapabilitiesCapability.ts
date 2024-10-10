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

export const getAccountsAccountCapabilitiesCapabilityEndpointSchema = {
  path: '/v1/accounts/{account}/capabilities/{capability}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    account: z.string(),
    capability: z.string(),
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
          zodSchema: z_Capability,
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

export type GetAccountsAccountCapabilitiesCapabilityRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
    capability: string;
  },
  {
    expand?: string[];
  }
>;

export type GetAccountsAccountCapabilitiesCapabilityResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Capability>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAccountsAccountCapabilitiesCapabilityRequestResult =
  RequestResult<
    GetAccountsAccountCapabilitiesCapabilityRequest,
    GetAccountsAccountCapabilitiesCapabilityResponse
  >;

export function getAccountsAccountCapabilitiesCapability(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAccountsAccountCapabilitiesCapabilityRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountsAccountCapabilitiesCapabilityRequestResult> {
  return requestHandler.execute(
    createRequest(
      getAccountsAccountCapabilitiesCapabilityEndpointSchema,
      payload
    ),
    config
  );
}

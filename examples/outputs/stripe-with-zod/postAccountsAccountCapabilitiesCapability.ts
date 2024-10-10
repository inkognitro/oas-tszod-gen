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

export const postAccountsAccountCapabilitiesCapabilityEndpointSchema = {
  path: '/v1/accounts/{account}/capabilities/{capability}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    account: z.string(),
    capability: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        requested: z.boolean().optional(),
      }),
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

export type PostAccountsAccountCapabilitiesCapabilityRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      requested?: boolean;
    }
  >,
  {
    account: string;
    capability: string;
  }
>;

export type PostAccountsAccountCapabilitiesCapabilityResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Capability>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostAccountsAccountCapabilitiesCapabilityRequestResult =
  RequestResult<
    PostAccountsAccountCapabilitiesCapabilityRequest,
    PostAccountsAccountCapabilitiesCapabilityResponse
  >;

export function postAccountsAccountCapabilitiesCapability(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostAccountsAccountCapabilitiesCapabilityRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostAccountsAccountCapabilitiesCapabilityRequestResult> {
  return requestHandler.execute(
    createRequest(
      postAccountsAccountCapabilitiesCapabilityEndpointSchema,
      payload
    ),
    config
  );
}
